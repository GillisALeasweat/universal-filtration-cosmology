import React, { useState } from 'react';
import { ACADEMIC_RESEARCH_MAPPINGS } from '../data/evaluationData';
import { ResearchMappingItem } from '../types/cosmology';
import { 
  Telescope, 
  Flame, 
  CheckCircle2, 
  AlertOctagon, 
  Binary, 
  ArrowRight, 
  Layers, 
  Microscope,
  FileCheck,
  TrendingUp
} from 'lucide-react';

export const ResearchMappingView: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(ACADEMIC_RESEARCH_MAPPINGS[0].id);
  const activeItem = ACADEMIC_RESEARCH_MAPPINGS.find(item => item.id === selectedId) || ACADEMIC_RESEARCH_MAPPINGS[0];

  const getViabilityBadge = (viability: ResearchMappingItem['breakthroughViability']) => {
    switch (viability) {
      case 'High':
        return <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full text-xs font-semibold">突破力：極めて有望 (High)</span>;
      case 'Medium-High':
        return <span className="text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-0.5 rounded-full text-xs font-semibold">突破力：有望 (Medium-High)</span>;
      case 'Moderate':
        return <span className="text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2.5 py-0.5 rounded-full text-xs font-semibold">突破力：中程度 (Moderate)</span>;
      default:
        return <span className="text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-0.5 rounded-full text-xs font-semibold">理論的障壁大</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Overview Intro Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
              <Microscope className="w-4 h-4" />
              <span>Academic Feasibility & Real-World Physics Mapping</span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mt-1">
              実研究における未解決アノマリーとの対照 ＆ 問題解決の足がかり判定
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              「ミルフィーユ代謝モデル」の各要素は空想にとどまらず、現在宇宙論・天体物理学が直面している**「4大膠着アノマリー」**に対して、数学的・幾何学的な脱出経路（足がかり）を提供します。
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800 self-start md:self-auto">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-300 font-mono">
              査読論文化ポテンシャル：<strong className="text-emerald-400 font-bold">有効な足がかり</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Real-World Problems Tab Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ACADEMIC_RESEARCH_MAPPINGS.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-500/80 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850/60'
              }`}
            >
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider truncate">
                {item.field}
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1 line-clamp-2">
                {item.realWorldProblem}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  適合度: <strong className="text-cyan-300">{item.viabilityScore}%</strong>
                </span>
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`}></span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Problem Deep Analysis Panel */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              研究領域: {activeItem.field}
            </div>
            <h3 className="text-2xl font-bold text-slate-100">
              {activeItem.realWorldProblem}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {getViabilityBadge(activeItem.breakthroughViability)}
            <div className="text-2xl font-black font-mono text-cyan-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              {activeItem.viabilityScore}<span className="text-xs text-slate-500 font-normal">/100</span>
            </div>
          </div>
        </div>

        {/* 2-Column: Current Academic Stalemate vs Framework Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Stalemate */}
          <div className="bg-rose-950/15 border border-rose-900/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold">
              <AlertOctagon className="w-4 h-4" />
              現実の学会・標準モデル（ΛCDM）が直面する膠着状態
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-lg border border-rose-900/20">
              {activeItem.currentStalemate}
            </p>
          </div>

          {/* Framework Solution */}
          <div className="bg-emerald-950/15 border border-emerald-900/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              ミルフィーユ代謝モデルによる具体的解決の足がかり
            </div>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/50 p-3.5 rounded-lg border border-emerald-900/20">
              {activeItem.frameworkSolution}
            </p>
          </div>
        </div>

        {/* Facilities & Physical Barriers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Hard Physical Barriers */}
          <div className="space-y-3 bg-slate-950/50 p-5 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              実研究として認められるために超えるべき「物理的障壁」
            </div>
            <ul className="space-y-2">
              {activeItem.hardPhysicalBarriers.map((barrier, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-400 font-mono font-bold mt-0.5">⚠️</span>
                  <span>{barrier}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Observational Facilities */}
          <div className="space-y-3 bg-slate-950/50 p-5 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Telescope className="w-4 h-4" />
              検証に使用可能な主要観測設備・実験施設
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {activeItem.keyObservationalFacilities.map((fac, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono bg-slate-900 text-cyan-300/90 px-3 py-1.5 rounded-lg border border-cyan-900/40"
                >
                  {fac}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 pt-2 leading-relaxed">
              これらの観測データ（JWSTの分光スペクトル、DESIのバリオン音響振動、次世代重力波LISA）によって、仮説の数値的上限・下限が直接テストされます。
            </p>
          </div>
        </div>

        {/* Mathematical Formalization Path for Peer-Reviewed Paper */}
        <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Binary className="w-4 h-4" />
            学術論文（PRD / JCAP / ApJ）化に向けた数理定式化の具体的手順
          </div>
          <p className="text-xs text-slate-200 font-mono bg-slate-950/80 p-3.5 rounded-lg border border-indigo-900/30 leading-relaxed">
            {activeItem.mathematicalFormalizationPath}
          </p>
        </div>
      </div>

      {/* 3-Step Scientific Roadmap Card */}
      <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <div className="text-xs font-mono uppercase text-cyan-400">Roadmap to Scientific Rigor</div>
          <h3 className="text-xl font-bold text-slate-100 mt-1">
            本フレームワークを「物理学の正式な研究論文」へと昇華させる3段階ロードマップ
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            形而上学的な「概念的アイデア」を、物理学会で検証可能な「理論物理モデル」へと落とし込む標準プロセス
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 space-y-3 relative">
            <div className="text-2xl font-black font-mono text-cyan-400/80">01</div>
            <div className="text-sm font-semibold text-slate-100">現象論的モデリング（Phenomenology）</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              ダークマターとバリオンの変換レート Q(z) = -Γ_BH(z) * ρ_DM を定義し、既存の宇宙論計算ツール（CLASS / CAMB）で宇宙膨張率 H(z) とCMBパワースペクトルを計算。ハッブル・テンションを緩和する許容パラメータ空間（κ, α）を同定する。
            </p>
            <div className="text-[11px] font-mono text-cyan-400 pt-1">
              成果物：JCAP / PRD 向け宇宙論パラメータ解析論文
            </div>
          </div>

          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 space-y-3 relative">
            <div className="text-2xl font-black font-mono text-indigo-400/80">02</div>
            <div className="text-sm font-semibold text-slate-100">JWST初期銀河成長シミュレーション</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              宇宙論的N体＋流体シミュレーション（GADGET-4 / AREPO）に、高赤方偏移での局所BH誘発相転移を実装。z &gt; 10 での超過質量銀河の数密度と質量関数（Mass Function）を再現できるか検証する。
            </p>
            <div className="text-[11px] font-mono text-indigo-400 pt-1">
              成果物：MNRAS / ApJ 向け天体物理シミュレーション論文
            </div>
          </div>

          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 space-y-3 relative">
            <div className="text-2xl font-black font-mono text-purple-400/80">03</div>
            <div className="text-sm font-semibold text-slate-100">ブレーン重力作用（Action Principle）の定式化</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              5次元AdSバルクと4次元膜の間の結合ラグランジアンを定式化。ブラックホール特異点における高次元漏洩境界条件（Israel接合条件）を解き、熱力学的エントロピーがバルク側でどのように保存されるかを証明する。
            </p>
            <div className="text-[11px] font-mono text-purple-400 pt-1">
              成果物：JHEP / PRD 向け高エネルギー物理・重力理論論文
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
