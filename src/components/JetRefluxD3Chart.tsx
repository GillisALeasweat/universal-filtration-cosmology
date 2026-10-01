import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { JET_REFLUX_OBJECTS } from '../data/evaluationData';
import { JetRefluxPoint } from '../types/cosmology';
import { Info, Sparkles, Filter, ShieldAlert, Crosshair } from 'lucide-react';

interface JetRefluxD3ChartProps {
  refluxRate: number; // e.g. 0.012 default
  bhActivityIndex: number; // e.g. 1.2
  currentTimeGyr: number; // 0 to 50 Gyr
}

export const JetRefluxD3Chart: React.FC<JetRefluxD3ChartProps> = ({
  refluxRate,
  bhActivityIndex,
  currentTimeGyr,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredPoint, setHoveredPoint] = useState<JetRefluxPoint | null>(null);

  // Filtered objects
  const filteredObjects = useMemo(() => {
    if (selectedCategory === 'all') return JET_REFLUX_OBJECTS;
    return JET_REFLUX_OBJECTS.filter((obj) => obj.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (!svgRef.current) return;

    // Dimensions
    const width = 760;
    const height = 380;
    const margin = { top: 40, right: 30, bottom: 55, left: 65 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    // Scales
    // X axis: log10(M / M_sun) from 0 to 12
    const xScale = d3.scaleLinear()
      .domain([0.5, 11.5])
      .range([0, innerWidth]);

    // Y axis: Effective Reflux Mass Ratio (%) from 0.001% to 0.20%
    const yScale = d3.scaleLinear()
      .domain([0, 0.18])
      .range([innerHeight, 0]);

    // Color Scale: Redshift z from 0 to 11
    const colorScale = d3.scaleSequential(d3.interpolateCool)
      .domain([0, 11]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // 1. Background Grid Lines
    const xGrid = d3.axisBottom(xScale).ticks(8).tickSize(-innerHeight).tickFormat(() => '');
    const yGrid = d3.axisLeft(yScale).ticks(6).tickSize(-innerWidth).tickFormat(() => '');

    g.append('g')
      .attr('class', 'grid x-grid opacity-15')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xGrid)
      .selectAll('line')
      .attr('stroke', '#64748b')
      .attr('stroke-dasharray', '2 2');

    g.append('g')
      .attr('class', 'grid y-grid opacity-15')
      .call(yGrid)
      .selectAll('line')
      .attr('stroke', '#64748b')
      .attr('stroke-dasharray', '2 2');

    // 2. Shaded Dynamic Equilibrium Corridor (Zone of Stability)
    // Between 0.01% and 0.06% reflux ratio
    g.append('rect')
      .attr('x', 0)
      .attr('y', yScale(0.065))
      .attr('width', innerWidth)
      .attr('height', yScale(0.015) - yScale(0.065))
      .attr('fill', '#06b6d4')
      .attr('opacity', 0.07);

    g.append('text')
      .attr('x', innerWidth - 10)
      .attr('y', yScale(0.065) + 14)
      .attr('text-anchor', 'end')
      .attr('fill', '#22d3ee')
      .attr('font-size', '10px')
      .attr('font-family', 'monospace')
      .attr('opacity', 0.75)
      .text('動的平衡許容回廊 (Dynamic Equilibrium Corridor)');

    // 3. Observational Upper Bound (Fermi & EHT Limit line)
    g.append('line')
      .attr('x1', 0)
      .attr('y1', yScale(0.12))
      .attr('x2', innerWidth)
      .attr('y2', yScale(0.12))
      .attr('stroke', '#f43f5e')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4 3')
      .attr('opacity', 0.6);

    g.append('text')
      .attr('x', 10)
      .attr('y', yScale(0.12) - 6)
      .attr('fill', '#fb7185')
      .attr('font-size', '9px')
      .attr('font-family', 'monospace')
      .text('EHT / Fermi 観測的上限ライン (α_max ≲ 0.12%)');

    // 4. Axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(8)
      .tickFormat((d) => `10^${d}`);

    const yAxis = d3.axisLeft(yScale)
      .ticks(6)
      .tickFormat((d) => `${d}%`);

    const xAxisG = g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);

    xAxisG.selectAll('text')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .attr('font-family', 'monospace');
    xAxisG.select('.domain').attr('stroke', '#334155');

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('text')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .attr('font-family', 'monospace');
    yAxisG.select('.domain').attr('stroke', '#334155');

    // Axis Labels
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 42)
      .attr('text-anchor', 'middle')
      .attr('fill', '#cbd5e1')
      .attr('font-size', '11px')
      .text('ブラックホール質量 log₁₀(M_BH / M_☉)');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -48)
      .attr('text-anchor', 'middle')
      .attr('fill', '#cbd5e1')
      .attr('font-size', '11px')
      .text('特異点ジェット高次元還流質量比率 α(M, z) [%]');

    // 5. Compute Dynamic Value for each point based on slider inputs
    // Factor = (refluxRate / 0.012) * (1 + (z / 10) * 0.4) * (bhActivityIndex / 1.2)^0.3
    const dataWithCalculated = filteredObjects.map((d) => {
      const dynamicMultiplier = (refluxRate / 0.012) * (1 + (d.redshift / 10) * 0.35) * Math.pow(bhActivityIndex / 1.2, 0.4);
      const dynamicRefluxPct = d.baseRefluxPct * dynamicMultiplier;
      return {
        ...d,
        calculatedRefluxPct: Math.min(0.175, Math.max(0.001, dynamicRefluxPct)),
      };
    });

    // 6. Draw Scatter Points
    const pointsGroup = g.append('g').attr('class', 'scatter-points');

    // Add glowing halo under each circle
    pointsGroup.selectAll('.halo')
      .data(dataWithCalculated, (d: any) => d.id)
      .enter()
      .append('circle')
      .attr('class', 'halo pointer-events-none')
      .attr('cx', (d) => xScale(d.logMass))
      .attr('cy', (d) => yScale(d.calculatedRefluxPct))
      .attr('r', (d) => Math.max(7, d.jetPowerEddington * 12 + 4))
      .attr('fill', (d) => colorScale(d.redshift))
      .attr('opacity', 0.25)
      .attr('filter', 'blur(3px)');

    // Main Circles
    const circles = pointsGroup.selectAll('.point')
      .data(dataWithCalculated, (d: any) => d.id)
      .enter()
      .append('circle')
      .attr('class', 'point cursor-pointer transition-all duration-300')
      .attr('cx', (d) => xScale(d.logMass))
      .attr('cy', (d) => yScale(d.calculatedRefluxPct))
      .attr('r', (d) => Math.max(4.5, d.jetPowerEddington * 8 + 3))
      .attr('fill', (d) => colorScale(d.redshift))
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.2)
      .attr('opacity', 0.9);

    // Text labels for notable objects
    pointsGroup.selectAll('.point-label')
      .data(dataWithCalculated, (d: any) => d.id)
      .enter()
      .append('text')
      .attr('class', 'point-label pointer-events-none')
      .attr('x', (d) => xScale(d.logMass) + 8)
      .attr('y', (d) => yScale(d.calculatedRefluxPct) + 3)
      .attr('fill', '#e2e8f0')
      .attr('font-size', '9px')
      .attr('font-family', 'sans-serif')
      .attr('opacity', 0.85)
      .text((d) => d.name.split(' ')[0]);

    // Hover Events with Tooltip
    circles
      .on('mouseenter', function (event, d) {
        d3.select(this)
          .attr('stroke', '#38bdf8')
          .attr('stroke-width', 2.5)
          .attr('r', (d: any) => Math.max(7, d.jetPowerEddington * 8 + 6));
        setHoveredPoint(d);

        if (tooltipRef.current) {
          tooltipRef.current.style.display = 'block';
        }
      })
      .on('mousemove', (event) => {
        if (tooltipRef.current) {
          const [x, y] = d3.pointer(event, svgRef.current?.parentElement);
          tooltipRef.current.style.left = `${x + 15}px`;
          tooltipRef.current.style.top = `${y - 10}px`;
        }
      })
      .on('mouseleave', function () {
        d3.select(this)
          .attr('stroke', '#ffffff')
          .attr('stroke-width', 1.2)
          .attr('r', (d: any) => Math.max(4.5, d.jetPowerEddington * 8 + 3));
        setHoveredPoint(null);
        if (tooltipRef.current) {
          tooltipRef.current.style.display = 'none';
        }
      });

  }, [filteredObjects, refluxRate, bhActivityIndex, currentTimeGyr]);

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-semibold text-slate-100">
              D3.js 特異点ジェット還流質量比率 散布図 [α(M_BH, z)]
            </h4>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            実在天体（M87*, GN-z11, J0313等）の質量・赤方偏移と、シミュレーターパラメータ連動の動的還流比率
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px]">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2 py-1 rounded transition-colors ${
              selectedCategory === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            全天体 ({JET_REFLUX_OBJECTS.length})
          </button>
          <button
            onClick={() => setSelectedCategory('supermassive')}
            className={`px-2 py-1 rounded transition-colors ${
              selectedCategory === 'supermassive' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            超大質量AGN
          </button>
          <button
            onClick={() => setSelectedCategory('early_quasar')}
            className={`px-2 py-1 rounded transition-colors ${
              selectedCategory === 'early_quasar' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            初期クエーサー (z&gt;7)
          </button>
          <button
            onClick={() => setSelectedCategory('stellar')}
            className={`px-2 py-1 rounded transition-colors ${
              selectedCategory === 'stellar' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            恒星質量BH
          </button>
        </div>
      </div>

      {/* D3 Render Container */}
      <div className="relative overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox="0 0 760 380"
          className="w-full h-auto min-w-[620px] select-none"
        ></svg>

        {/* Dynamic HTML Tooltip */}
        <div
          ref={tooltipRef}
          style={{ display: 'none' }}
          className="absolute z-30 pointer-events-none bg-slate-900/95 border border-cyan-500/50 rounded-xl p-3 shadow-xl backdrop-blur-md text-xs text-slate-200 min-w-[210px]"
        >
          {hoveredPoint && (
            <div className="space-y-1.5 font-sans">
              <div className="font-bold text-cyan-300 border-b border-slate-800 pb-1 flex items-center justify-between">
                <span>{hoveredPoint.name}</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">{hoveredPoint.category}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 text-[11px]">
                <span className="text-slate-400">推定BH質量:</span>
                <span className="font-mono text-right text-slate-100">10^{hoveredPoint.logMass.toFixed(2)} M☉</span>
                <span className="text-slate-400">赤方偏移 (z):</span>
                <span className="font-mono text-right text-indigo-300">z = {hoveredPoint.redshift}</span>
                <span className="text-slate-400">実効還流率 (α):</span>
                <span className="font-mono text-right text-emerald-400 font-bold">
                  {(hoveredPoint.baseRefluxPct * (refluxRate / 0.012) * (1 + (hoveredPoint.redshift / 10) * 0.35) * Math.pow(bhActivityIndex / 1.2, 0.4)).toFixed(4)}%
                </span>
                <span className="text-slate-400">Eddington比:</span>
                <span className="font-mono text-right text-amber-300">{hoveredPoint.jetPowerEddington}x</span>
              </div>
              <div className="text-[10px] text-slate-400 border-t border-slate-800/80 pt-1 leading-tight">
                {hoveredPoint.notes}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend & Theoretical Interpretation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>現在 (z≈0)</span>
            <span className="text-slate-600">→</span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <span>初期宇宙 (z≈10)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border border-slate-400 flex items-center justify-center text-[8px]">●</span>
            <span>円の大きさ：ジェット出力（Eddington比）</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-cyan-300/90 font-mono">
          <Crosshair className="w-3.5 h-3.5" />
          <span>還流率 α ∝ M_BH^0.12 · (1+z)^0.35</span>
        </div>
      </div>
    </div>
  );
};
