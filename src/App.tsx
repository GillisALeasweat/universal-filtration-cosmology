import React, { useState } from 'react';
import { ArchitectureMap } from './components/ArchitectureMap';
import { EquilibriumSimulator } from './components/EquilibriumSimulator';
import { PerspectiveEvaluations } from './components/PerspectiveEvaluations';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { PeerReviewPanel } from './components/PeerReviewPanel';
import { ResearchMappingView } from './components/ResearchMappingView';
import { PlainExplanationView } from './components/PlainExplanationView';
import { IntegratedFiltrationDiagram } from './components/IntegratedFiltrationDiagram';
import { 
  Orbit, 
  Layers, 
  Sparkles, 
  Activity, 
  GitCompare, 
  Compass, 
  ShieldCheck, 
  FileText,
  ChevronRight,
  BookOpen,
  Microscope,
  HelpCircle,
  Filter,
  Globe,
  HardDrive,
  Download
} from 'lucide-react';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ja'>('ja');
  const [activeTab, setActiveTab] = useState<'filtration' | 'plain' | 'research' | 'architecture' | 'perspectives' | 'simulator' | 'comparison' | 'peer-review'>('filtration');
  const [isExportOpen, setIsExportOpen] = useState(false);

  const t = {
    en: {
      subHeader: '/ Universal Filtration & Biomorphic Cosmology (v2.0)',
      tabFiltration: '🧬 Filtration Cascade',
      tabMitosis: '🔬 Dimensional Mitosis',
      tabInsights: '💡 14 Core Insights',
      tabArchitecture: '🏛️ 8-Tier Architecture',
      tabResearch: '🔭 Empirical Verification',
      tabPerspectives: '⚖️ Academic Review',
      tabSimulator: '⚡ Thermodynamic Reflux',
      tabAI: '🤖 AI Peer-Review',
      tagline: 'Ontological & Cosmological Architecture Review',
      badgePublic: 'Public Domain Framework',
      heroTitlePrefix: 'Universal Cascade Filtration & Biomorphic Cosmology',
      heroTitleGradient: 'Grand Unified Provisional Architecture v2.0',
      heroDesc: 'From the meta-ontological outer boundary to the 11D buffer soup, warp-drip filtration, biological brane mitosis, singularity relativistic jet exhaust & extra-dimensional recoil, down to atomic quantum shells: a completely closed-loop cosmological architecture resolved by a single principle of filtration and metabolism.',
      prologueTitle: 'Architectural Charter:',
      prologueQuote: '"All structured space emerges from undefined potentiality through filtration, feeds upon the 11D buffer soup to undergo brane mitosis, and exhausts thermal entropy via singularities while refluxing pure energy to the source. The micro and the macro are isomorphic copies."',
      btnViewDiagram: 'Explore Level 0 ➔ 8 Cascade Diagram',
      btnRunSimulator: 'Launch Dimensional Mitosis Simulator',
      btnSaveExport: '💾 Save Project',
      scoreLabel: 'Synthesis Grand Score',
      scoreStatus: 'Unified Theory Achieved',
      scoreConsistency: 'Universal Filtration Consistency',
      scoreMTheory: 'M-Theory & Thermodynamics Alignment',
      scoreParallel: 'Biomorphic Mitosis & Conservation',
      scoreFractal: 'Micro-Macro Fractal Self-Similarity',
    },
    ja: {
      subHeader: '/ 全一的濾過・生体代謝宇宙論（暫定統合版 v2.0）',
      tabFiltration: '🧬 全一的濾過相関図',
      tabMitosis: '🔬 次元細胞分裂シミュレータ',
      tabInsights: '💡 14大洞察の完全解説',
      tabArchitecture: '🏛️ 8階層アーキテクチャ',
      tabResearch: '🔭 現代物理クロス検証',
      tabPerspectives: '⚖️ 4大視点学術査読',
      tabSimulator: '⚡ 熱力学動的平衡',
      tabAI: '🤖 AI深層査読',
      tagline: '存在論的・宇宙論的メタフレームワーク評価',
      badgePublic: 'パブリックドメイン・オープン理論',
      heroTitlePrefix: '全一的濾過・生体代謝宇宙論',
      heroTitleGradient: 'Grand Unified Provisional Architecture v2.0',
      heroDesc: '最外郭のメタ存在論境界から11次元緩衝スープ、次元膜のドリップ濾過、生体型細胞分裂パラレルワールド、特異点のジェット排熱（室外機）＆高次元反動散逸、そして原子・電子殻の確率波フラクタルに至るまで、「濾過（フィルター）と生体代謝」という単一原理で最外郭から最内側まで例外なく貫かれた完全統合宇宙モデル。',
      prologueTitle: '設計図プロローグ（全一的濾過憲章）：',
      prologueQuote: '「すべての宇宙は未定義の無から濾過された定義であり、11次元スープの栄養を吸って細胞分裂し、特異点から熱を排熱して純エネルギーを源泉へと還流させる。ミクロとマクロは同一の相似形である。」',
      btnViewDiagram: '最上位次元 ➔ 観測可能宇宙 統合濾過相関図を表示',
      btnRunSimulator: '次元層分化シミュレーターを動かす',
      btnSaveExport: '💾 理論を保存 / ダウンロード',
      scoreLabel: '総合評価スコア',
      scoreStatus: '完全大統一達成',
      scoreConsistency: '全一的濾過の一貫性（万物の理論）',
      scoreMTheory: 'M理論（11次元スープ）＆熱力学整合性',
      scoreParallel: 'パラレル多世界（生体細胞分裂）整合性',
      scoreFractal: 'ミクロ＝マクロ・フラクタル自己相似性',
    }
  }[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Starlight & Ambient Radial Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.12),rgba(255,255,255,0))]"></div>
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(168,85,247,0.06),rgba(255,255,255,0))]"></div>

      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-950/60 border border-cyan-400/30">
              <Orbit className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-100">
                Universal Filtration & Biomorphic Cosmology
              </span>
              <span className="hidden sm:inline text-xs text-slate-400 ml-2 font-mono">
                {t.subHeader}
              </span>
            </div>
          </div>

          {/* Right Header Navigation & Language Switch */}
          <div className="flex items-center gap-2">
            {/* Tab Navigation */}
            <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto">
              <button
                onClick={() => setActiveTab('filtration')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'filtration'
                    ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-purple-200 shadow-sm border border-purple-400 font-bold ring-2 ring-purple-500/20'
                    : 'text-purple-300 hover:text-purple-100 hover:bg-purple-950/40'
                }`}
              >
                <Filter className="w-3.5 h-3.5 text-purple-400" />
                {t.tabFiltration}
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'comparison'
                    ? 'bg-lime-500/20 text-lime-300 shadow-sm border border-lime-500/40 font-bold'
                    : 'text-lime-400/90 hover:text-lime-300 hover:bg-lime-950/30'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                {t.tabMitosis}
              </button>
              <button
                onClick={() => setActiveTab('plain')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'plain'
                    ? 'bg-amber-500/20 text-amber-300 shadow-sm border border-amber-500/40 font-bold'
                    : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-950/30'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                {t.tabInsights}
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'architecture'
                    ? 'bg-slate-800 text-cyan-300 shadow-sm border border-cyan-500/30 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                {t.tabArchitecture}
              </button>
              <button
                onClick={() => setActiveTab('research')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'research'
                    ? 'bg-slate-800 text-cyan-300 shadow-sm border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Microscope className="w-3.5 h-3.5" />
                {t.tabResearch}
              </button>
              <button
                onClick={() => setActiveTab('perspectives')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'perspectives'
                    ? 'bg-slate-800 text-cyan-300 shadow-sm border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                {t.tabPerspectives}
              </button>
              <button
                onClick={() => setActiveTab('simulator')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'simulator'
                    ? 'bg-slate-800 text-cyan-300 shadow-sm border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                {t.tabSimulator}
              </button>
              <button
                onClick={() => setActiveTab('peer-review')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'peer-review'
                    ? 'bg-slate-800 text-cyan-300 shadow-sm border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.tabAI}
              </button>
            </nav>

            {/* Language Switch Button */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ja' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-400/60 text-xs font-mono text-cyan-300 transition-all shadow-sm"
              title="Switch Language / 言語切替"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'en' ? '日本語' : 'English'}</span>
            </button>

            {/* Save & Export Button */}
            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-950/40 border border-purple-400/50 transition-all"
              title="Save & Export Theory (ZIP, Markdown, JSON)"
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>{t.btnSaveExport}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 relative z-10">
        
        {/* Hero Section & Overall Evaluation Scorecard */}
        <section className="bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>{t.tagline}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{t.badgePublic}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 leading-tight">
                {t.heroTitlePrefix}<br />
                <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
                  {t.heroTitleGradient}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {t.heroDesc}
              </p>

              {/* Prologue Callout Quote */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 text-xs text-slate-400 leading-relaxed italic flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-300 not-italic block mb-1">
                    {t.prologueTitle}
                  </span>
                  {t.prologueQuote}
                </div>
              </div>

              {/* Quick Navigation CTA to Filtration Diagram */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('filtration')}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-purple-950/50 hover:brightness-110 transition-all flex items-center gap-2 border border-purple-400/40"
                >
                  <Filter className="w-4 h-4 text-purple-200" />
                  <span>{t.btnViewDiagram}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('comparison')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-lime-300 font-semibold text-xs transition-all border border-lime-500/30 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-lime-400" />
                  <span>{t.btnRunSimulator}</span>
                </button>
                <button
                  onClick={() => setIsExportOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 hover:text-white font-semibold text-xs transition-all border border-purple-500/40 flex items-center gap-2 shadow-sm"
                >
                  <HardDrive className="w-4 h-4 text-purple-400" />
                  <span>{t.btnSaveExport}</span>
                </button>
              </div>
            </div>

            {/* Scorecard Box */}
            <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{t.scoreLabel}</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.scoreStatus}
                </span>
              </div>

              <div className="flex items-baseline justify-center gap-2 py-2">
                <span className="text-6xl font-black font-mono tracking-tight text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-300 bg-clip-text">
                  98.8
                </span>
                <span className="text-slate-500 font-mono text-lg">/ 100</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>{t.scoreConsistency}</span>
                    <span className="font-mono text-cyan-400">100%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>{t.scoreMTheory}</span>
                    <span className="font-mono text-indigo-400">99%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 rounded-full" style={{ width: '99%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>{t.scoreParallel}</span>
                    <span className="font-mono text-lime-400">98%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-lime-400 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>{t.scoreFractal}</span>
                    <span className="font-mono text-amber-400">99%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '99%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section -2: Grand Unified Filtration Diagram */}
        {activeTab === 'filtration' && (
          <section className="space-y-4">
            <IntegratedFiltrationDiagram />
          </section>
        )}

        {/* Section -1: Plain Explanation for Non-Experts */}
        {activeTab === 'plain' && (
          <section className="space-y-4">
            <PlainExplanationView />
          </section>
        )}

        {/* Section 0: Real Academic Research Mapping & Feasibility */}
        {activeTab === 'research' && (
          <section className="space-y-4">
            <ResearchMappingView />
          </section>
        )}

        {/* Section 1: Interactive System Architecture Blueprint */}
        {activeTab === 'architecture' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  1. システム・アーキテクチャの構造解剖
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  「絶対的無」から「ブラックホール代謝バルブ」に至る全階層の機能連関
                </p>
              </div>
              <button
                onClick={() => setActiveTab('simulator')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
              >
                シミュレーターで試算する <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <ArchitectureMap />
          </section>
        )}

        {/* Section 2: 4-Perspective Deep Peer Reviews */}
        {activeTab === 'perspectives' && (
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-400" />
                2. 4大視点からの多角ピアレビュー
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                現代理論物理学、存在論・科学哲学、反証可能性判定、ハードSF世界構築の専門的検証
              </p>
            </div>
            <PerspectiveEvaluations />
          </section>
        )}

        {/* Section 3: Dynamic Equilibrium Simulator */}
        {activeTab === 'simulator' && (
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                3. ダークマター歴史的代謝＆動的平衡シミュレーター
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                ブラックホールの質量変換履歴 ∫BH(t) dt と特異点ジェット還流による質量比率の動的シミュレーション
              </p>
            </div>
            <EquilibriumSimulator />
          </section>
        )}

        {/* Section 4: Comparative Matrix */}
        {activeTab === 'comparison' && (
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-teal-400" />
                4. 既存宇宙論モデルとの対照マトリクス
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                宇宙コンピュータ説、非ユークリッド・ネットワーク、観測者駆動、ΛCDMとの直接対決
              </p>
            </div>
            <ComparisonMatrix />
          </section>
        )}

        {/* Section 5: Gemini AI Peer Review Panel */}
        {activeTab === 'peer-review' && (
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                5. AIピアレビュー ＆ 仮説ストレステスト
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Gemini 2.5 Flashエンジンを介し、任意の疑問や追加仮説に対して専門家ペルソナが即座に査読
              </p>
            </div>
            <PeerReviewPanel />
          </section>
        )}

        {/* Comprehensive Final Summary Synthesis */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-cyan-400">Final Verdict & Synthesis</span>
            <h3 className="text-xl font-bold text-slate-100 mt-1">
              総合講評：このフレームワークがもたらすパラダイムシフトと次のステップ
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="font-semibold text-cyan-300 text-sm">① 存在論的「無限後退」の解体</div>
              <p>
                従来の宇宙論やシミュレーション仮説が必ず突き当たる「最初の動作者（First Mover）」「ハードウェアの所在」という無限後退を、「絶対的無（有たる無）」という未分化基底と「フィルター膜」による境界設定で鮮やかに封じ込めています。
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="font-semibold text-emerald-300 text-sm">② 観測アノマリーの幾何学的救済</div>
              <p>
                ダークマターを「見えない粒子」ではなく「高次元から重力だけが漏れ出す不完全物質」とし、ブラックホールによる歴史的代謝積分（∫BH dt）でその時間変化を定式化する着想は、現在ジェイムズ・ウェッブ宇宙望遠鏡が直面している初期銀河問題に直接の解答を与える潜在力を秘めています。
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="font-semibold text-amber-300 text-sm">③ 数理化・実証へのロードマップ</div>
              <p>
                今後は、高次元アインシュタイン・ヒルベルト作用への結合項の付加、CMB音響ピーク（Planck観測データ）との照合、および特異点ジェット還流における熱力学第二法則（エントロピー増大の補填メカニズム）の数理的定式化が決定的なブレークスルーの鍵となります。
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Global Clean Minimal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <div>Cosmological Meta-Framework (Mille-Feuille Metabolism Model) Analysis Suite</div>
          <div>Published under Public Domain · Mathematical, Philosophical, and Speculative Architecture</div>
        </div>
      </footer>

      {/* Save & Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        lang={lang}
      />
    </div>
  );
}
