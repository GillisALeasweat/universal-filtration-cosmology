import React, { useState, useMemo } from 'react';
import { Sliders, Activity, Flame, ShieldAlert, Sparkles, RefreshCw, HelpCircle } from 'lucide-react';
import { SimulationResultPoint } from '../types/cosmology';
import { JetRefluxD3Chart } from './JetRefluxD3Chart';

export const EquilibriumSimulator: React.FC = () => {
  // Simulator parameters
  const [initialDMPct, setInitialDMPct] = useState<number>(85); // 85% at early universe
  const [conversionRate, setConversionRate] = useState<number>(0.025); // BH DM->LM conversion factor
  const [refluxRate, setRefluxRate] = useState<number>(0.012); // Singularity jet reflux factor
  const [currentTimeGyr, setCurrentTimeGyr] = useState<number>(13.8); // 13.8 Gyr (present day)
  const [bhActivityIndex, setBhActivityIndex] = useState<number>(1.2); // SMBH density & activity

  // Compute curve from 0 to 50 Gyr (sampled every 1 Gyr)
  const simulationPoints: SimulationResultPoint[] = useMemo(() => {
    const points: SimulationResultPoint[] = [];
    let currentDM = initialDMPct;
    let currentLM = 100 - initialDMPct;
    let currentHighDim = 0;

    for (let t = 0; t <= 50; t += 1) {
      // BH population peaks around z ~ 2-3 (approx 2 to 4 Gyr after Big Bang)
      // Gaussian-like peak for active BH growth, then steady state
      const bhActivityFactor = bhActivityIndex * Math.exp(-Math.pow(t - 3.5, 2) / 12) + 0.3;
      
      const dmConverted = currentDM * conversionRate * bhActivityFactor;
      const jetReflux = (currentHighDim + 5) * refluxRate * (bhActivityFactor * 0.8);

      currentDM = Math.max(5, currentDM - dmConverted + (jetReflux * 0.4));
      currentLM = Math.max(5, currentLM + (dmConverted * 0.6));
      currentHighDim += (dmConverted * 0.4) - (jetReflux * 0.4);

      // Equilibrium delta (macro consumption vs micro inflow balance)
      const balanceDelta = Math.abs(dmConverted - jetReflux);
      const entropy = 1.0 - Math.exp(-t * 0.04);

      points.push({
        timeGyr: t,
        darkMatter: Math.round(currentDM * 10) / 10,
        lightMatter: Math.round(currentLM * 10) / 10,
        highDimEnergy: Math.round(Math.max(0, currentHighDim) * 10) / 10,
        equilibriumDelta: Math.round(balanceDelta * 100) / 100,
        entropyState: Math.round(entropy * 100) / 100,
      });
    }

    return points;
  }, [initialDMPct, conversionRate, refluxRate, bhActivityIndex]);

  // Current slice values at currentTimeGyr
  const currentSnapshot = useMemo(() => {
    const idx = Math.min(Math.round(currentTimeGyr), simulationPoints.length - 1);
    return simulationPoints[idx] || simulationPoints[0];
  }, [currentTimeGyr, simulationPoints]);

  // Equilibrium stability status
  const equilibriumStatus = useMemo(() => {
    const delta = currentSnapshot.equilibriumDelta;
    if (delta < 0.25) {
      return { label: '完全動的平衡（ゼロ・ウェスト達成）', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800' };
    }
    if (delta < 0.6) {
      return { label: '準平衡状態（許容観測誤差内）', color: 'text-cyan-400', bg: 'bg-cyan-950/40 border-cyan-800' };
    }
    return { label: '平衡不整合（過剰散逸または枯渇）', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800' };
  }, [currentSnapshot]);

  // SVG dimensions for chart
  const svgWidth = 600;
  const svgHeight = 220;
  const padding = 30;

  const pointsToPath = (key: 'darkMatter' | 'lightMatter' | 'highDimEnergy') => {
    return simulationPoints
      .map((p, idx) => {
        const x = padding + (p.timeGyr / 50) * (svgWidth - padding * 2);
        const y = svgHeight - padding - (p[key] / 100) * (svgHeight - padding * 2);
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const currentTimeX = padding + (currentTimeGyr / 50) * (svgWidth - padding * 2);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-semibold text-slate-100">
              ダークマター代謝＆動的平衡シミュレーター
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            歴史的ブラックホール積分 ∫BH(t) dt によるダークマター消費と特異点ジェット還流の相互作用をリアルタイム計算
          </p>
        </div>

        <div className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 ${equilibriumStatus.bg}`}>
          <span className={`w-2 h-2 rounded-full ${equilibriumStatus.color.replace('text-', 'bg-')}`}></span>
          <span className={equilibriumStatus.color}>{equilibriumStatus.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Sliders Control Panel */}
        <div className="lg:col-span-5 space-y-5 bg-slate-950/50 p-5 rounded-xl border border-slate-800/80">
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
              <span>宇宙時間タイムスケール (t)</span>
              <span className="font-mono text-cyan-400">{currentTimeGyr} Gyr {currentTimeGyr === 13.8 ? '(現在)' : ''}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="0.5"
              value={currentTimeGyr}
              onChange={(e) => setCurrentTimeGyr(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0 (ビッグバン)</span>
              <span>13.8 (現在)</span>
              <span>50 Gyr (遠未来)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
              <span>初期高次元ダークマター比率 (DM₀)</span>
              <span className="font-mono text-purple-400">{initialDMPct}%</span>
            </div>
            <input
              type="range"
              min="60"
              max="95"
              step="1"
              value={initialDMPct}
              onChange={(e) => setInitialDMPct(parseFloat(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
              <span>ブラックホール特異点代謝変換係数 (κ)</span>
              <span className="font-mono text-rose-400">{conversionRate.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min="0.005"
              max="0.060"
              step="0.002"
              value={conversionRate}
              onChange={(e) => setConversionRate(parseFloat(e.target.value))}
              className="w-full accent-rose-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
              <span>特異点ジェット高次元還流率 (α)</span>
              <span className="font-mono text-teal-400">{refluxRate.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min="0.002"
              max="0.035"
              step="0.001"
              value={refluxRate}
              onChange={(e) => setRefluxRate(parseFloat(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
              <span>超大質量ブラックホール（SMBH）活性度指数</span>
              <span className="font-mono text-amber-400">{bhActivityIndex.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={bhActivityIndex}
              onChange={(e) => setBhActivityIndex(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <button
            onClick={() => {
              setInitialDMPct(85);
              setConversionRate(0.025);
              setRefluxRate(0.012);
              setCurrentTimeGyr(13.8);
              setBhActivityIndex(1.2);
            }}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            標準観測値プリセットにリセット
          </button>
        </div>

        {/* Dynamic Visualization Graph */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                宇宙年代別 質量エネルギー分布曲線 (0 ~ 50 Gyr)
              </span>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-purple-400">
                  <span className="w-2.5 h-0.5 bg-purple-400"></span> ダークマター
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2.5 h-0.5 bg-emerald-400"></span> 3D物質 (LM)
                </span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="w-2.5 h-0.5 bg-cyan-400"></span> 高次元エネルギー
                </span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="relative w-full overflow-hidden">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((v) => {
                  const y = svgHeight - padding - (v / 100) * (svgHeight - padding * 2);
                  return (
                    <g key={v}>
                      <line x1={padding} y1={y} x2={svgWidth - padding} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                      <text x={padding - 6} y={y + 3} textAnchor="end" fill="#64748b" fontSize="9" fontFamily="monospace">
                        {v}%
                      </text>
                    </g>
                  );
                })}

                {/* Cosmic Time Guideline */}
                <line
                  x1={currentTimeX}
                  y1={padding}
                  x2={currentTimeX}
                  y2={svgHeight - padding}
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <circle cx={currentTimeX} cy={padding} r="3" fill="#38bdf8" />

                {/* Plot Paths */}
                <path d={pointsToPath('darkMatter')} fill="none" stroke="#c084fc" strokeWidth="2.5" />
                <path d={pointsToPath('lightMatter')} fill="none" stroke="#34d399" strokeWidth="2" />
                <path d={pointsToPath('highDimEnergy')} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
              </svg>
            </div>
          </div>

          {/* Current Snapshot Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">残存ダークマター</div>
              <div className="text-lg font-bold font-mono text-purple-400 mt-0.5">
                {currentSnapshot.darkMatter}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">現在観測値 ~84%</div>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">蓄積3次元物質</div>
              <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                {currentSnapshot.lightMatter}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">銀河・星間物質化</div>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">高次元バッファ</div>
              <div className="text-lg font-bold font-mono text-cyan-400 mt-0.5">
                {currentSnapshot.highDimEnergy}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">上次元化ストック</div>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">代謝インバランス</div>
              <div className="text-lg font-bold font-mono text-amber-400 mt-0.5">
                Δ{currentSnapshot.equilibriumDelta}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">&lt;0.5で許容動的平衡</div>
            </div>
          </div>
        </div>
      </div>

      {/* D3.js Singularity Jet Reflux Scatter Plot */}
      <div className="pt-6 border-t border-slate-800">
        <JetRefluxD3Chart
          refluxRate={refluxRate}
          bhActivityIndex={bhActivityIndex}
          currentTimeGyr={currentTimeGyr}
        />
      </div>
    </div>
  );
};
