import React, { useState } from 'react';
import { ARCHITECTURE_NODES } from '../data/evaluationData';
import { ArchitectureNode } from '../types/cosmology';
import { Layers, Shield, Sparkles, Orbit, Radio, ArrowDownCircle, RefreshCw, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

export const ArchitectureMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(ARCHITECTURE_NODES[0]);
  const [activeCycle, setActiveCycle] = useState<'all' | 'inflow' | 'outflow'>('all');

  const getNodeIcon = (category: string) => {
    switch (category) {
      case 'source': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'filter': return <Shield className="w-5 h-5 text-cyan-400" />;
      case 'medium': return <Orbit className="w-5 h-5 text-indigo-400" />;
      case 'membrane': return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'valve': return <RefreshCw className="w-5 h-5 text-rose-400" />;
      case 'matter': return <Radio className="w-5 h-5 text-purple-400" />;
      default: return <Info className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Visual Architectural Map Column */}
      <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              存在論的代謝アーキテクチャ・ダイアグラム
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              ノードを選択すると、詳細な物理的・哲学的メカニズムと課題を解析できます
            </p>
          </div>
          
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 self-start sm:self-auto">
            <button
              onClick={() => setActiveCycle('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeCycle === 'all' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              全階層循環
            </button>
            <button
              onClick={() => setActiveCycle('inflow')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeCycle === 'inflow' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              無からの流入
            </button>
            <button
              onClick={() => setActiveCycle('outflow')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeCycle === 'outflow' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              BH代謝＆還流
            </button>
          </div>
        </div>

        {/* Metabolic Diagram Flow */}
        <div className="py-6 space-y-4 relative">
          {/* Background Ambient SVG Connecting Lines */}
          <div className="absolute inset-0 pointer-events-none flex justify-center">
            <div className="w-0.5 h-full bg-gradient-to-b from-amber-500/40 via-cyan-500/30 to-rose-500/40 opacity-40"></div>
          </div>

          {/* Level 0: Absolute Nothingness */}
          <div 
            onClick={() => setSelectedNode(ARCHITECTURE_NODES[0])}
            className={`cursor-pointer transition-all duration-300 p-4 rounded-xl border relative z-10 ${
              selectedNode.id === ARCHITECTURE_NODES[0].id
                ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-950/50'
                : 'bg-slate-950/60 border-slate-800 hover:border-amber-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/30">
                  {getNodeIcon('source')}
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400">Level 0: 究極基底</div>
                  <h4 className="text-base font-semibold text-slate-100">{ARCHITECTURE_NODES[0].japaneseName}</h4>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">未分化の無限（有たる無）</span>
            </div>
          </div>

          {/* Downward Pulse Indicator */}
          <div className="flex justify-center text-slate-600">
            <ArrowDownCircle className="w-5 h-5 animate-bounce text-cyan-400/70" />
          </div>

          {/* Level 1: Filter Membrane */}
          <div 
            onClick={() => setSelectedNode(ARCHITECTURE_NODES[1])}
            className={`cursor-pointer transition-all duration-300 p-4 rounded-xl border relative z-10 ${
              selectedNode.id === ARCHITECTURE_NODES[1].id
                ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-950/50'
                : 'bg-slate-950/60 border-slate-800 hover:border-cyan-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                  {getNodeIcon('filter')}
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">Level 1: 動的ファイアウォール</div>
                  <h4 className="text-base font-semibold text-slate-100">{ARCHITECTURE_NODES[1].japaneseName}</h4>
                </div>
              </div>
              <span className="text-xs text-cyan-300/80 font-mono">ゼロ・ノイズ崩壊を遮断</span>
            </div>
          </div>

          {/* Level 2: Collective Intelligence */}
          <div 
            onClick={() => setSelectedNode(ARCHITECTURE_NODES[2])}
            className={`cursor-pointer transition-all duration-300 p-4 rounded-xl border relative z-10 ${
              selectedNode.id === ARCHITECTURE_NODES[2].id
                ? 'bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-950/50'
                : 'bg-slate-950/60 border-slate-800 hover:border-blue-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  {getNodeIcon('filter')}
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-blue-400">Level 2: エネルギー調整体</div>
                  <h4 className="text-base font-semibold text-slate-100">{ARCHITECTURE_NODES[2].japaneseName}</h4>
                </div>
              </div>
              <span className="text-xs text-blue-300/80 font-mono">精製＆物理パラメーター供給</span>
            </div>
          </div>

          {/* Level 3: Multiverse Soup */}
          <div 
            onClick={() => setSelectedNode(ARCHITECTURE_NODES[3])}
            className={`cursor-pointer transition-all duration-300 p-4 rounded-xl border relative z-10 ${
              selectedNode.id === ARCHITECTURE_NODES[3].id
                ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-950/50'
                : 'bg-slate-950/60 border-slate-800 hover:border-indigo-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/30">
                  {getNodeIcon('medium')}
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">Level 3: 高次元バルク</div>
                  <h4 className="text-base font-semibold text-slate-100">{ARCHITECTURE_NODES[3].japaneseName}</h4>
                </div>
              </div>
              <span className="text-xs text-indigo-300/80 font-mono">全包摂高次元データベース</span>
            </div>
          </div>

          {/* Level 4: Mille-Feuille Membrane Layers */}
          <div 
            onClick={() => setSelectedNode(ARCHITECTURE_NODES[4])}
            className={`cursor-pointer transition-all duration-300 p-4 rounded-xl border relative z-10 ${
              selectedNode.id === ARCHITECTURE_NODES[4].id
                ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950/60 border-slate-800 hover:border-emerald-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                  {getNodeIcon('membrane')}
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">Level 4: ネスト次元膜</div>
                  <h4 className="text-base font-semibold text-slate-100">{ARCHITECTURE_NODES[4].japaneseName}</h4>
                </div>
              </div>
              <span className="text-xs text-emerald-300/80 font-mono">観測により結晶化（コンパイル）</span>
            </div>
          </div>

          {/* Level 5: Tri-Partite Metabolic Loop (Black Hole, Dark Matter, Jet Reflux) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {/* Dark Matter */}
            <div 
              onClick={() => setSelectedNode(ARCHITECTURE_NODES[6])}
              className={`cursor-pointer transition-all duration-300 p-3 rounded-xl border ${
                selectedNode.id === ARCHITECTURE_NODES[6].id
                  ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-950/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-purple-500/50'
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-purple-400">高次元プロトタイプ</div>
              <div className="text-sm font-semibold text-slate-100 mt-1">ダークマター漏洩</div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">重力のみが3次元空間へ漏れ出す不完全物質</p>
            </div>

            {/* Black Hole Valve */}
            <div 
              onClick={() => setSelectedNode(ARCHITECTURE_NODES[5])}
              className={`cursor-pointer transition-all duration-300 p-3 rounded-xl border ${
                selectedNode.id === ARCHITECTURE_NODES[5].id
                  ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-950/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-rose-500/50'
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400">次元反転バルブ</div>
              <div className="text-sm font-semibold text-slate-100 mt-1">ブラックホール特異点</div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">3次元物質を高次元へ「上次元化」変換</p>
            </div>

            {/* Jet Reflux */}
            <div 
              onClick={() => setSelectedNode(ARCHITECTURE_NODES[7])}
              className={`cursor-pointer transition-all duration-300 p-3 rounded-xl border ${
                selectedNode.id === ARCHITECTURE_NODES[7].id
                  ? 'bg-teal-950/40 border-teal-500 shadow-lg shadow-teal-950/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-teal-500/50'
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-teal-400">動的還流機構</div>
              <div className="text-sm font-semibold text-slate-100 mt-1">特異点ジェット平衡</div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">微小高次元流入でゼロ・ウェストを担保</p>
            </div>
          </div>
        </div>

        {/* Footer Meta Notes */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>閉ループ代謝状態：自己充足的（Self-Sustaining）</span>
          </div>
          <span className="font-mono text-slate-500">∫ BH(t) dt 積分保存系</span>
        </div>
      </div>

      {/* Selected Node Detailed Inspector Column */}
      <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded-md border border-cyan-800/50">
              Level {selectedNode.level} Inspector
            </span>
            <div className="flex items-center gap-1.5 text-xs text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>突破力指数: {selectedNode.breakthroughScore}/100</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-100 mt-2">{selectedNode.japaneseName}</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedNode.name}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">構成要素の定義と概念</h4>
          <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            {selectedNode.description}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">システム内の代謝機能・役割</h4>
          <p className="text-sm text-cyan-200/90 leading-relaxed bg-cyan-950/20 p-3.5 rounded-xl border border-cyan-800/30">
            {selectedNode.role}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              現代物理・哲学における類似概念
            </div>
            <p className="text-xs text-slate-300 bg-emerald-950/20 p-3 rounded-lg border border-emerald-800/30 leading-normal">
              {selectedNode.scientificAnalog}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              未解決の理論的課題・アキレス腱
            </div>
            <p className="text-xs text-slate-300 bg-rose-950/20 p-3 rounded-lg border border-rose-800/30 leading-normal">
              {selectedNode.criticalChallenge}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
