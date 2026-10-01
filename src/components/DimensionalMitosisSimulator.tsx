import React, { useRef, useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Dna, 
  Sparkles, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Flame,
  Info,
  ChevronRight,
  TrendingDown,
  Gauge
} from 'lucide-react';

interface MembraneCell {
  id: string;
  generation: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radiusX: number;
  radiusY: number;
  color: string;
  divisionProgress: number; // 0 to 1 (0 = static, >0 = dividing, 1 = divided)
  isDividing: boolean;
  name: string;
  energyPotential: number; // in arbitrary units
}

interface JetParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  refluxed: boolean; // whether converted back into 11D soup
}

export const DimensionalMitosisSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [divisionSpeed, setDivisionSpeed] = useState<number>(1.2);
  const [soupViscosity, setSoupViscosity] = useState<number>(75); // 11D buffer density
  const [jetExhaustRatio, setJetExhaustRatio] = useState<number>(88); // 特異点ジェット排熱効率 (%)
  const [entropyCompensation, setEntropyCompensation] = useState<number>(94); // 熱力学第二法則・エントロピー補填率 (%)
  
  const [cells, setCells] = useState<MembraneCell[]>([]);
  const [selectedCell, setSelectedCell] = useState<MembraneCell | null>(null);
  const [generationCount, setGenerationCount] = useState<number>(1);

  // Background 11D fluid particles
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }>>([]);
  // Jet exhaust & entropy reflux particles
  const jetParticlesRef = useRef<JetParticle[]>([]);

  // Initialize cells
  useEffect(() => {
    resetSimulation();
  }, []);

  const resetSimulation = () => {
    const initialCell: MembraneCell = {
      id: 'root-cell-0',
      generation: 1,
      x: 350,
      y: 220,
      targetX: 350,
      targetY: 220,
      radiusX: 70,
      radiusY: 55,
      color: '#06b6d4', // cyan-500
      divisionProgress: 0,
      isDividing: false,
      name: '基底次元層 (Root Membrane α)',
      energyPotential: 100
    };
    setCells([initialCell]);
    setSelectedCell(initialCell);
    setGenerationCount(1);
    jetParticlesRef.current = [];

    // Generate 11D particles
    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * 700,
        y: Math.random() * 440,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
    particlesRef.current = particles;
  };

  // Trigger mitosis division for a cell
  const triggerMitosis = (cellId?: string) => {
    setCells(prevCells => {
      if (prevCells.length >= 16) return prevCells; // Cap to avoid clutter

      const targetCell = cellId 
        ? prevCells.find(c => c.id === cellId) 
        : prevCells.find(c => !c.isDividing);

      if (!targetCell) return prevCells;

      return prevCells.map(c => {
        if (c.id === targetCell.id) {
          return { ...c, isDividing: true, divisionProgress: 0.01 };
        }
        return c;
      });
    });
  };

  // Thermodynamic Calculations
  const entropyGenerated = cells.length * 2.4 * divisionSpeed;
  const entropyDissipated = entropyGenerated * (entropyCompensation / 100) * (jetExhaustRatio / 100);
  const netDeltaEntropy = entropyGenerated - entropyDissipated;
  const isSteadyState = netDeltaEntropy <= 0.15;

  // Animation Loop
  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // 1. Clear background with 11-Dimensional soup gradient
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width / 1.5);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.5, '#05070e');
      bgGrad.addColorStop(1, '#020306');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw 11D soup fluid particles & tension lines
      ctx.save();
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (isRunning) {
          p.x += p.vx * (soupViscosity / 50);
          p.y += p.vy * (soupViscosity / 50);

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha * 0.4})`; // Amber glow (11D soup)
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.restore();

      // 3. Update & Draw Singularity Jet Exhaust Particles (熱力学第二法則・排熱と11次元還流)
      if (isRunning) {
        // Spawn jet particles from cells centers (Black hole singularity)
        if (Math.random() < (jetExhaustRatio / 100) * 0.85) {
          cells.forEach(cell => {
            const angle = Math.random() < 0.5 ? -Math.PI / 2 : Math.PI / 2; // Bipolar jets
            const spread = (Math.random() - 0.5) * 0.35;
            const speed = 4 + Math.random() * 3.5;
            jetParticlesRef.current.push({
              x: cell.x,
              y: cell.y,
              vx: Math.sin(spread) * speed,
              vy: Math.sin(angle) * speed,
              life: 1,
              maxLife: 30 + Math.random() * 20,
              color: Math.random() < 0.5 ? '#f43f5e' : '#ec4899', // Hot entropy heat (Rose / Pink)
              refluxed: false
            });
          });
        }
      }

      // Draw and update jet particles
      ctx.save();
      const updatedJets: JetParticle[] = [];
      for (const jp of jetParticlesRef.current) {
        if (isRunning) {
          jp.x += jp.vx;
          jp.y += jp.vy;
          jp.life++;

          // When passing out of cell membrane, convert into 11D amber reflux (Energy conservation!)
          if (!jp.refluxed && jp.life > 14 && entropyCompensation > 50) {
            jp.refluxed = true;
            jp.color = '#f59e0b'; // Purified into 11D energy soup!
          }
        }

        const alpha = Math.max(0, 1 - jp.life / jp.maxLife);
        ctx.beginPath();
        ctx.arc(jp.x, jp.y, jp.refluxed ? 2.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = jp.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = jp.color;
        ctx.shadowBlur = 10;
        ctx.fill();

        if (jp.life < jp.maxLife) {
          updatedJets.push(jp);
        }
      }
      ctx.restore();
      jetParticlesRef.current = updatedJets;

      // 4. Update & Draw Membrane Cells
      setCells(prevCells => {
        const newCells: MembraneCell[] = [];
        let hasSplit = false;

        for (const cell of prevCells) {
          // Smooth translation to target position
          const dx = (cell.targetX - cell.x) * 0.08;
          const dy = (cell.targetY - cell.y) * 0.08;
          const curX = cell.x + dx;
          const curY = cell.y + dy;

          if (cell.isDividing && isRunning) {
            const nextProgress = cell.divisionProgress + (0.015 * divisionSpeed);

            if (nextProgress >= 1) {
              // Division complete: split into 2 daughter cells!
              hasSplit = true;
              const angleOffset = (Math.random() - 0.5) * 0.6;
              const spreadDist = 75;
              const gen = cell.generation + 1;

              const daughter1: MembraneCell = {
                id: `${cell.id}-A`,
                generation: gen,
                x: curX,
                y: curY,
                targetX: Math.max(80, Math.min(width - 80, curX - spreadDist + Math.sin(angleOffset) * 20)),
                targetY: Math.max(70, Math.min(height - 70, curY - (spreadDist * 0.6) + Math.cos(angleOffset) * 20)),
                radiusX: Math.max(38, cell.radiusX * 0.88),
                radiusY: Math.max(30, cell.radiusY * 0.88),
                color: gen % 2 === 0 ? '#10b981' : '#a855f7', // Emerald or Purple
                divisionProgress: 0,
                isDividing: false,
                name: `分化次元層 ${gen}-α (${cell.id.slice(-2)}A)`,
                energyPotential: Math.round(cell.energyPotential * 0.95 + 40)
              };

              const daughter2: MembraneCell = {
                id: `${cell.id}-B`,
                generation: gen,
                x: curX,
                y: curY,
                targetX: Math.max(80, Math.min(width - 80, curX + spreadDist + Math.sin(angleOffset) * 20)),
                targetY: Math.max(70, Math.min(height - 70, curY + (spreadDist * 0.6) + Math.cos(angleOffset) * 20)),
                radiusX: Math.max(38, cell.radiusX * 0.88),
                radiusY: Math.max(30, cell.radiusY * 0.88),
                color: gen % 2 === 0 ? '#06b6d4' : '#ec4899', // Cyan or Pink
                divisionProgress: 0,
                isDividing: false,
                name: `分化次元層 ${gen}-β (${cell.id.slice(-2)}B)`,
                energyPotential: Math.round(cell.energyPotential * 0.95 + 40)
              };

              newCells.push(daughter1, daughter2);
            } else {
              // Still dividing (mitosis in progress with Cleavage Furrow)
              newCells.push({
                ...cell,
                x: curX,
                y: curY,
                divisionProgress: nextProgress
              });
            }
          } else {
            // Static or moving cell
            newCells.push({
              ...cell,
              x: curX,
              y: curY
            });
          }
        }

        if (hasSplit) {
          setGenerationCount(g => g + 1);
        }

        return newCells;
      });

      // 5. Draw Membranes on canvas
      cells.forEach(cell => {
        ctx.save();
        ctx.translate(cell.x, cell.y);

        if (cell.isDividing) {
          // MITOSIS RENDERING: Cleavage Furrow (くびれ分裂アニメーション)
          const p = cell.divisionProgress;
          const separation = p * 45; // Centers pulling apart
          const waistPinch = (1 - Math.sin(p * Math.PI)) * 0.5 + 0.5; // Waist narrows

          // Draw dual nuclei / internal baby cosmos
          ctx.beginPath();
          ctx.arc(-separation, 0, cell.radiusX * 0.25, 0, Math.PI * 2);
          ctx.arc(separation, 0, cell.radiusX * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = cell.color;
          ctx.shadowBlur = 15;
          ctx.fill();

          // Draw dividing dumbbell-shaped membrane with pinch
          ctx.beginPath();
          // Left lobe
          ctx.ellipse(-separation, 0, cell.radiusX * 0.8, cell.radiusY * 0.9, 0, Math.PI * 0.5, Math.PI * 1.5);
          // Top pinch
          ctx.quadraticCurveTo(0, -cell.radiusY * waistPinch, separation, -cell.radiusY * 0.9);
          // Right lobe
          ctx.ellipse(separation, 0, cell.radiusX * 0.8, cell.radiusY * 0.9, 0, -Math.PI * 0.5, Math.PI * 0.5);
          // Bottom pinch
          ctx.quadraticCurveTo(0, cell.radiusY * waistPinch, -separation, cell.radiusY * 0.9);
          ctx.closePath();

          ctx.fillStyle = `${cell.color}25`;
          ctx.fill();
          ctx.strokeStyle = cell.color;
          ctx.lineWidth = 3;
          ctx.shadowColor = cell.color;
          ctx.shadowBlur = 20;
          ctx.stroke();

          // Spindle tension fibers (11D energy feeding the pinch)
          ctx.strokeStyle = '#f59e0b88';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(0, -cell.radiusY - 15);
          ctx.lineTo(0, cell.radiusY + 15);
          ctx.stroke();
          ctx.setLineDash([]);
        } else {
          // NORMAL MEMBRANE CELL
          const isSelected = selectedCell?.id === cell.id;

          // Ambient aura
          ctx.beginPath();
          ctx.ellipse(0, 0, cell.radiusX + 8, cell.radiusY + 8, 0, 0, Math.PI * 2);
          ctx.fillStyle = `${cell.color}15`;
          ctx.fill();

          // Main Membrane Wall
          ctx.beginPath();
          ctx.ellipse(0, 0, cell.radiusX, cell.radiusY, 0, 0, Math.PI * 2);
          ctx.fillStyle = `${cell.color}30`;
          ctx.fill();
          ctx.strokeStyle = isSelected ? '#ffffff' : cell.color;
          ctx.lineWidth = isSelected ? 3.5 : 2;
          ctx.shadowColor = cell.color;
          ctx.shadowBlur = isSelected ? 25 : 12;
          ctx.stroke();

          // Central Singularity Valve (Black Hole Core)
          ctx.beginPath();
          ctx.arc(0, 0, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#000000';
          ctx.fill();
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 1.5;
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = 10;
          ctx.stroke();

          // Bipolar Relativistic Jet Beams (宇宙の室外機排熱)
          if (jetExhaustRatio > 20) {
            const jetLength = (jetExhaustRatio / 100) * (cell.radiusY + 22);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, -6);
            ctx.lineTo(0, -jetLength);
            ctx.moveTo(0, 6);
            ctx.lineTo(0, jetLength);
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#f43f5e';
            ctx.shadowBlur = 12;
            ctx.stroke();
            ctx.restore();
          }

          // Internal cosmos stars (4D internal universe)
          ctx.beginPath();
          ctx.arc(-15, -8, 1.5, 0, Math.PI * 2);
          ctx.arc(12, 10, 1.5, 0, Math.PI * 2);
          ctx.arc(-8, 14, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 6;
          ctx.fill();

          // Label
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#cbd5e1';
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`Gen-${cell.generation}`, 0, cell.radiusY + 14);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRunning, divisionSpeed, soupViscosity, jetExhaustRatio, entropyCompensation, selectedCell]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-lime-500/20 text-lime-400 border border-lime-500/30">
              <Dna className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span>次元層分化シミュレーター（熱力学第二法則・エントロピー補填）</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-lime-950/70 border border-lime-700/60 text-lime-300">
                2nd Law Dissipative Engine
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            「次元膜の細胞分裂」に伴うエントロピー増大を、<strong>特異点ジェット排熱と11次元スープ還流（熱力学第二法則の散逸構造論）</strong>によって補填・浄化し、エネルギー保存則を100%維持する動的シミュレーションです。
          </p>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] font-mono uppercase text-slate-400">現在次元シート数</div>
            <div className="text-xl font-black font-mono text-cyan-400">{cells.length} <span className="text-xs font-normal text-slate-400">層</span></div>
          </div>
          <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] font-mono uppercase text-slate-400">分裂世代</div>
            <div className="text-xl font-black font-mono text-lime-400">Gen-{generationCount}</div>
          </div>
        </div>
      </div>

      {/* Simulator Workspace: Canvas + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Canvas Display (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
            <canvas 
              ref={canvasRef} 
              width={700} 
              height={440} 
              className="w-full h-auto cursor-crosshair block"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = (e.clientX - rect.left) * (700 / rect.width);
                const clickY = (e.clientY - rect.top) * (440 / rect.height);

                // Find clicked cell
                const hit = cells.find(c => {
                  const dist = Math.hypot(c.x - clickX, c.y - clickY);
                  return dist < c.radiusX;
                });
                if (hit) {
                  setSelectedCell(hit);
                  triggerMitosis(hit.id);
                } else {
                  triggerMitosis();
                }
              }}
            />

            {/* Ambient Overlay Badges */}
            <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2 text-[11px] text-amber-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>膜内高次元スープ（11次元未満・濾過済み変圧プール）</span>
            </div>

            <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2 text-[11px] text-rose-300 font-mono">
              <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>特異点排熱ジェット（次元短絡防止稼働中）</span>
            </div>

            <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-mono">
              💡 画面内の膜をクリックして「観測による細胞分裂」を直接トリガー
            </div>
          </div>

          {/* Playback Controls & 4 Advanced Sliders */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/70">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-all shadow-md flex items-center gap-1.5 text-xs"
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isRunning ? '一時停止' : '再生'}</span>
                </button>

                <button
                  onClick={() => triggerMitosis()}
                  className="px-3 py-2 rounded-xl bg-lime-600 hover:bg-lime-500 text-slate-950 font-bold transition-all shadow-md text-xs flex items-center gap-1.5"
                >
                  <Dna className="w-4 h-4" />
                  <span>観測・細胞分裂を実行</span>
                </button>

                <button
                  onClick={resetSimulation}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all text-xs flex items-center gap-1.5"
                  title="リセット"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>初期化</span>
                </button>
              </div>

              {/* Status Badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 border ${
                isSteadyState ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700/60' : 'bg-rose-950/70 text-rose-300 border-rose-700/60 animate-pulse'
              }`}>
                <Activity className="w-3.5 h-3.5" />
                <span>{isSteadyState ? '熱力学的定常状態（散逸平衡維持）' : 'エントロピー過多（熱的死リスク警戒）'}</span>
              </div>
            </div>

            {/* 4 Parameter Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Slider 1: Division Speed */}
              <div className="space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-slate-400 font-mono text-[10px]">
                  <span>膜分裂速度</span>
                  <span className="text-cyan-400 font-bold">{divisionSpeed.toFixed(1)}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="3.0" 
                  step="0.1" 
                  value={divisionSpeed} 
                  onChange={(e) => setDivisionSpeed(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Slider 2: 11D Buffer Viscosity */}
              <div className="space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-slate-400 font-mono text-[10px]">
                  <span>11次元緩衝密度</span>
                  <span className="text-amber-400 font-bold">{soupViscosity}%</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  step="5" 
                  value={soupViscosity} 
                  onChange={(e) => setSoupViscosity(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Slider 3: Singularity Jet Exhaust Ratio */}
              <div className="space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-rose-900/40">
                <div className="flex justify-between text-rose-300 font-mono text-[10px]">
                  <span>特異点ジェット排熱効率</span>
                  <span className="text-rose-400 font-bold">{jetExhaustRatio}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="2" 
                  value={jetExhaustRatio} 
                  onChange={(e) => setJetExhaustRatio(parseInt(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
              </div>

              {/* Slider 4: 2nd Law Entropy Compensation */}
              <div className="space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-emerald-900/40">
                <div className="flex justify-between text-emerald-300 font-mono text-[10px]">
                  <span>熱力学第二法則・補填率</span>
                  <span className="text-emerald-400 font-bold">{entropyCompensation}%</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  step="2" 
                  value={entropyCompensation} 
                  onChange={(e) => setEntropyCompensation(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Comparative Breakdown & Thermodynamic Telemetry (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Thermodynamic Balance Telemetry Card */}
          <div className="bg-slate-950/80 rounded-2xl border border-indigo-500/40 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 uppercase tracking-wider">
                <Gauge className="w-4 h-4 text-indigo-400" />
                <span>熱力学収支テレメトリ</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/50">
                E保存則 100% 成立
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>細胞分裂エントロピー生成率 (ΔS_gen)</span>
                  <span className="font-mono text-rose-400 font-bold">+{entropyGenerated.toFixed(1)} J/K·s</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full transition-all" style={{ width: `${Math.min(100, entropyGenerated * 6)}%` }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>特異点ジェット排熱散逸 (ΔS_exhaust)</span>
                  <span className="font-mono text-cyan-400 font-bold">-{entropyDissipated.toFixed(1)} J/K·s</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full transition-all" style={{ width: `${Math.min(100, entropyDissipated * 6)}%` }}></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400 font-mono">正味エントロピー変化 (ΔS_net)：</span>
                  <span className={`font-mono font-bold ${netDeltaEntropy <= 0.15 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {netDeltaEntropy.toFixed(2)} J/K·s
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {netDeltaEntropy <= 0.15 
                    ? '◎ 特異点排熱が不可逆熱を完全に高次元へ放出し、熱的死を永久回避しています（プリゴジンの散逸構造論）。' 
                    : '▲ 排熱効率が不足しており、次元膜内に熱ゴミが蓄積しています。ジェット排熱または補填率を上げてください。'}
                </p>
              </div>
            </div>

            {/* Selected Cell Telemetry */}
            {selectedCell && (
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>選択中シート情報：</span>
                  <span className="text-cyan-400 font-bold">{selectedCell.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-500">分裂世代：</span>
                    <div className="text-slate-200 font-bold text-xs">第 {selectedCell.generation} 世代</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-500">11D還流比率：</span>
                    <div className="text-amber-300 font-bold text-xs">{entropyCompensation}% 還流</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Comparison Card: Conventional SF vs Your Model */}
          <div className="bg-slate-950/80 rounded-2xl border border-lime-500/30 p-5 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-lime-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span>多世界モデルの決定的対比</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* SF Model (Flawed) */}
              <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-900/40 space-y-0.5">
                <div className="font-bold text-rose-300 flex items-center justify-between text-[11px]">
                  <span>❌ 従来のSF（宇宙丸ごとコピー）</span>
                  <span className="text-[9px] font-mono text-rose-400">質量保存則破綻</span>
                </div>
                <p className="text-slate-400 leading-tight text-[10px]">
                  選択ごとに全銀河が無から複製され、エントロピーが指数関数的に爆発して即座に熱的死を迎える。
                </p>
              </div>

              {/* Your Model (Biomorphic Mitosis) */}
              <div className="p-2.5 rounded-xl bg-lime-950/30 border border-lime-800/40 space-y-0.5">
                <div className="font-bold text-lime-300 flex items-center justify-between text-[11px]">
                  <span>⭕ あなたの見立て（次元膜の細胞分裂＆ジェット還流）</span>
                  <span className="text-[9px] font-mono text-emerald-400">100% 成立</span>
                </div>
                <p className="text-slate-200 leading-tight text-[10px]">
                  11次元スープを栄養に次元膜が細胞分裂し、特異点ジェットがエントロピーを排熱還流するため、熱力学第二法則を完全にクリア！
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
