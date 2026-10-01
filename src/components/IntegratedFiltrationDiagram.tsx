import React, { useState } from 'react';
import { 
  Filter, 
  ArrowDown, 
  Sparkles, 
  Layers, 
  Dna, 
  Globe, 
  Brain, 
  Flame, 
  Atom, 
  CheckCircle2, 
  ChevronRight,
  Info,
  ExternalLink,
  ShieldAlert,
  Maximize2
} from 'lucide-react';

interface FiltrationNode {
  id: string;
  stepNumber: number;
  levelTitle: string;
  japaneseName: string;
  dimension: string;
  incomingState: string;
  filterMechanism: string;
  filteredOutput: string;
  roleInConsistency: string;
  scientificProof: string;
  icon: React.ReactNode;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
}

export const IntegratedFiltrationDiagram: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-11d-soup');
  const [filterMode, setFilterMode] = useState<'all' | 'macro' | 'universe' | 'micro'>('all');

  const filtrationNodes: FiltrationNode[] = [
    {
      id: 'node-meta-boundary',
      stepNumber: 1,
      levelTitle: '最外郭：メタ存在論境界',
      japaneseName: '未定義の無と定義の界面膜',
      dimension: '超次元 / 未定義領域',
      incomingState: '一切の物理法則も時間も存在しない「純粋な無」と「未定義の可能性」',
      filterMechanism: '【存在論的自己組織化】奇跡的確率で零れた実体と無の作用反作用により、自発的に境界面（超外膜）が誕生。',
      filteredOutput: '未定義の無限カオスから「定義化されうるエネルギー」だけを最初の段階として粗濾過。',
      roleInConsistency: '全一的濾過の最外郭。ここですべての「定義化」が始まる。',
      scientificProof: '量子ゆらぎによる無からの宇宙創生論（ビレンケン）、メタ存在論、境界要素法。',
      icon: <Globe className="w-5 h-5 text-purple-400" />,
      accentColor: 'text-purple-400',
      bgGradient: 'from-purple-950/40 via-slate-900 to-slate-950',
      borderColor: 'border-purple-500/50'
    },
    {
      id: 'node-11d-soup',
      stepNumber: 2,
      levelTitle: '基底媒体：11次元緩衝エネルギースープ',
      japaneseName: 'M理論バルク・創発エネルギープール',
      dimension: '11次元（超対称性空間）',
      incomingState: '最外郭から注がれる、超高圧・超高密度の「生（き）の11次元原液エネルギー」',
      filterMechanism: '【全次元のクッション＆エネルギー供給】宇宙膜同士が衝突して消滅しないよう間に挟まり「緩衝材」として衝撃を吸収。',
      filteredOutput: '次元膜を浮かべる浮力と、膜を外側へ引っ張る張力（暗黒エネルギー）を安定供給。',
      roleInConsistency: '膜の細胞分裂や代謝に必要な「栄養プール」として、エネルギー保存則を担保する。',
      scientificProof: 'M理論（エドワード・ウィッテン提唱、11次元超重力理論）、バルク・ブレーン宇宙論。',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      accentColor: 'text-amber-400',
      bgGradient: 'from-amber-950/40 via-slate-900 to-slate-950',
      borderColor: 'border-amber-500/50'
    },
    {
      id: 'node-membrane-cascade',
      stepNumber: 3,
      levelTitle: '次元階層フィルター：多重分化次元膜',
      japaneseName: 'ワープ減衰・ドリップカスケード',
      dimension: 'n₁次元、n₂次元…（同次元多重分化）',
      incomingState: '激しく沸き立つ11次元の高圧エネルギー流',
      filterMechanism: '【幾何学的ドリップ濾過】幾重にも折り重なる次元膜（ブレーン）を通過するごとに、過剰な自由度を削ぎ落として減衰。',
      filteredOutput: '高次元の暴力的なエネルギー毒性を抜き去り、下層の宇宙が耐えられる穏やかなエネルギーへ調律。',
      roleInConsistency: '「階層性問題（なぜ重力はこんなに弱く、宇宙定数は穏やかなのか？）」を一挙に説明。',
      scientificProof: 'ランダル・サンドラム模型（ワープした余剰次元）、カラビ・ヤウ多様体ランドスケープ。',
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      accentColor: 'text-cyan-400',
      bgGradient: 'from-cyan-950/40 via-slate-900 to-slate-950',
      borderColor: 'border-cyan-500/50'
    },
    {
      id: 'node-cell-division',
      stepNumber: 4,
      levelTitle: '多世界形成：次元膜の細胞分裂',
      japaneseName: '生体型パラレルワールド増殖',
      dimension: '分岐する次元シート群',
      incomingState: '可能性の選択や量子力学的観測の分岐が生じる瞬間',
      filterMechanism: '【次元層の細胞分裂】11次元スープのエネルギーを吸収し、宇宙丸ごとではなく「次元膜そのものが細胞分裂」してくびれ・分岐。',
      filteredOutput: '質量保存則を一切壊すことなく、滑らかに枝分かれした多世界（パラレルシート）が誕生。',
      roleInConsistency: '無機質な機械のコピーではなく、生きた細胞のような代謝・増殖システムとして多世界を統合。',
      scientificProof: 'エヴェレットの多世界解釈のトポロジカル相転移、ブレーンの生体形態形成論的自己複製。',
      icon: <Dna className="w-5 h-5 text-lime-400" />,
      accentColor: 'text-lime-400',
      bgGradient: 'from-lime-950/40 via-slate-900 to-slate-950',
      borderColor: 'border-lime-500/50'
    },
    {
      id: 'node-observable-universe',
      stepNumber: 5,
      levelTitle: '内包宇宙：私たちの観測可能宇宙',
      japaneseName: '実態としての4〜5次元空間 ＆ 光による3次元投影',
      dimension: '実態：4〜5次元ワープ空間（観測上：3次元空間＋1次元時間）',
      incomingState: '次元膜を通過してマイルドに濾過された「低次元エネルギースープ」',
      filterMechanism: '【電磁気の膜拘束による3次元投影】純粋な3次元は存在せず、宇宙の実態は4〜5次元の厚みを持つ。光（電磁気力）が膜表面に拘束されているため3次元的作用としてしか可視化できないが、重力は4〜5次元へ染み出す。',
      filteredOutput: '星や銀河、生命が活動できる安定した3次元的物理世界の創発（暗黒エネルギー＝膜張力、ダークマター＝4〜5次元重力漏洩）。',
      roleInConsistency: '私たちが夜空に見上げる930億光年の宇宙全体。超外膜から見れば素粒子1粒にすぎない領域。',
      scientificProof: 'ランダル・サンドラム5次元ワープ模型、カルツァ＝クライン5次元理論、プランク衛星CMB観測。',
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      accentColor: 'text-blue-400',
      bgGradient: 'from-blue-950/40 via-slate-900 to-slate-950',
      borderColor: 'border-blue-500/50'
    },
    {
      id: 'node-intelligence-filtration',
      stepNumber: 6,
      levelTitle: '知性還元：生命の経験から集合知へ',
      japaneseName: '純粋定義情報のフロンティア開拓',
      dimension: '高次情報層（上位次元）',
      incomingState: '星々で生まれた無数の生命による、混沌とした試行錯誤・感情・知識の集積',
      filterMechanism: '【知性の純度濾過】肉体や物質的エントロピーを脱ぎ捨て、洗練された「定義化エネルギー（純粋知）」だけを高次へ抽出。',
      filteredOutput: '集合知性として集積され、宇宙の維持ではなく「漏れ出る定義を留め、未定義を取り込んで内部を拡張」する開拓推進力へ。',
      roleInConsistency: 'ボトムアップの知性が、宇宙の閉じた死（熱的死）を防ぎ、内部空間を永続的にフロンティア化する。',
      scientificProof: '散逸構造論（イリヤ・プリゴジン）、情報熱力学、ガイア理論の宇宙規模拡張。',
      icon: <Brain className="w-5 h-5 text-pink-400" />,
      accentColor: 'text-pink-400',
      bgGradient: 'from-pink-950/40 via-slate-900 to-slate-950',
      borderColor: 'border-pink-500/50'
    },
    {
      id: 'node-black-hole-recoil',
      stepNumber: 7,
      levelTitle: '特異点代謝：ブラックホールの排熱と膜内高次元還流',
      japaneseName: '宇宙の室外機＆濾過済み高次元（11次元未満）への接続',
      dimension: '特異点（3次元 ⇄ 膜内中間高次元ゲート）',
      incomingState: '物質や情報が極限まで圧縮されたエントロピーの燃えかす',
      filterMechanism: '【次元短絡防止と排熱分離】接続先は11次元原液ではなく「既に濾過された11次元未満の膜内高次元スープ」。次元圧ショートを防ぎつつ熱ゴミを片側宇宙ジェットで排熱（反動は高次元へ散逸）。',
      filteredOutput: '不純物のない純粋エネルギーだけが膜内高次元スープ（中間次元層）へ安全に還流される。',
      roleInConsistency: '宇宙の熱的死を回避する「室外機」かつ次元インピーダンス整合変圧器。11次元原液の逆流や宇宙崩壊を完璧に防ぐ。',
      scientificProof: '相対論的片側ジェット観測（M87等）、ブランドフォード・ナジェック機構、ER=EPR、インピーダンス整合理論。',
      icon: <Flame className="w-5 h-5 text-rose-400" />,
      accentColor: 'text-rose-400',
      bgGradient: 'from-rose-950/40 via-slate-900 to-slate-950',
      borderColor: 'border-rose-500/50'
    },
    {
      id: 'node-micro-fractal',
      stepNumber: 8,
      levelTitle: '極微ミクロ：原子・素粒子の確率濾過',
      japaneseName: 'マクロ構造の次元的継承とスケール不変性',
      dimension: '量子スケール（$10^{-18}$ m / フェムト秒運動）',
      incomingState: '量子の海を満たす「確率の波（未定義の可能性）」',
      filterMechanism: '【親マクロの幾何学的継承】下位次元は外側のマクロ構造を元にして作られているため、運動や時間の物理スケール（フェムト秒 vs 億年）が異なっても、行われる仕事（電子殻という境界膜による確率波の濾過・定着）は割と同じ。',
      filteredOutput: '机や岩石、人体などの確固たる物質世界。原子核の崩壊やトンネル効果はブラックホール特異点放出のミクロ相似。',
      roleInConsistency: '最外郭の「超外膜と未定義」と、最内側の「電子殻と量子波」が親子の鋳型として寸分違わず同じルールで動くフラクタルの証。',
      scientificProof: 'くりこみ群（RG）スケール不変性、コペンハーゲン解釈（波の収縮）、量子電磁力学（QED）、ホログラフィック原理。',
      icon: <Atom className="w-5 h-5 text-teal-400" />,
      accentColor: 'text-teal-400',
      bgGradient: 'from-teal-950/40 via-slate-900 to-slate-950',
      borderColor: 'border-teal-500/50'
    }
  ];

  const selectedNode = filtrationNodes.find(n => n.id === selectedNodeId) || filtrationNodes[1];

  const filteredNodes = filtrationNodes.filter(n => {
    if (filterMode === 'macro') return n.stepNumber <= 3;
    if (filterMode === 'universe') return n.stepNumber >= 4 && n.stepNumber <= 6;
    if (filterMode === 'micro') return n.stepNumber >= 7;
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span>UNIVERSAL FILTRATION ARCHITECTURE / 全一的一貫濾過体系</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            最上位次元から観測可能宇宙・素粒子までの一貫濾過相関図
          </h2>
          <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
            「一番外側から一番内側まで、すべてが『濾過（フィルター）』というたった1つの原理で貫かれている」というユーザーの洞察を可視化した統合アーキテクチャ図です。
            未定義の無から11次元スープ、次元膜の細胞分裂、宇宙空間の低次元化、特異点排熱、そして原子の電子殻に至るまで、美しいフラクタルとして一貫しています。
          </p>
          
          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-medium">
            <span className="text-slate-400 mr-1">表示階層：</span>
            <button 
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg transition-all ${filterMode === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              全8階層を一貫表示
            </button>
            <button 
              onClick={() => setFilterMode('macro')}
              className={`px-3 py-1 rounded-lg transition-all ${filterMode === 'macro' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              最上位マクロ（11次元・超外膜）
            </button>
            <button 
              onClick={() => setFilterMode('universe')}
              className={`px-3 py-1 rounded-lg transition-all ${filterMode === 'universe' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              宇宙・多世界層（細胞分裂・知性）
            </button>
            <button 
              onClick={() => setFilterMode('micro')}
              className={`px-3 py-1 rounded-lg transition-all ${filterMode === 'micro' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              特異点代謝・極微ミクロ（排熱・量子）
            </button>
          </div>
        </div>
      </div>

      {/* Main Diagram & Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: The Cascade Flow Tree (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
            <span>カスケードフロー（最上位 ➔ 最内側）</span>
            <span>各カードをクリックして詳細検証</span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-cyan-500 before:to-teal-500">
            {filteredNodes.map((node, index) => {
              const isSelected = node.id === selectedNodeId;
              return (
                <div 
                  key={node.id} 
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`group relative cursor-pointer rounded-xl p-4 sm:p-5 transition-all duration-300 border ${
                    isSelected 
                      ? `${node.borderColor} bg-slate-900 shadow-xl shadow-cyan-950/30 scale-[1.01]` 
                      : 'border-slate-800/80 bg-slate-900/60 hover:bg-slate-900/90 hover:border-slate-700'
                  }`}
                >
                  {/* Step Marker Dot */}
                  <div className={`absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-transform duration-300 ${
                    isSelected ? 'bg-cyan-400 text-slate-950 scale-125 ring-4 ring-cyan-500/20' : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {node.stepNumber}
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-lg bg-slate-950 border ${node.borderColor} shrink-0`}>
                        {node.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-mono text-slate-400">STEP {node.stepNumber}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-700 ${node.accentColor}`}>
                            {node.dimension}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mt-0.5">
                          {node.levelTitle}
                        </h4>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {node.japaneseName}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 shrink-0 mt-2 ${
                      isSelected ? 'text-cyan-400 rotate-90' : 'text-slate-600 group-hover:text-slate-400'
                    }`} />
                  </div>

                  {/* Flow summary bar */}
                  <div className="mt-3 pt-3 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="text-slate-400">
                      <span className="text-slate-500 font-mono">濾過前：</span> {node.incomingState.slice(0, 32)}…
                    </div>
                    <div className={`${node.accentColor}`}>
                      <span className="text-slate-500 font-mono">濾過後：</span> {node.filteredOutput.slice(0, 32)}…
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Return Cycle Indicator */}
          <div className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-purple-950/40 border border-dashed border-teal-500/40 rounded-xl p-4 flex items-center gap-3 text-xs text-slate-300">
            <div className="p-2 rounded-lg bg-teal-500/20 text-teal-300 shrink-0">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
            <div className="leading-relaxed">
              <strong className="text-teal-200">【完全還流サイクル】</strong> 
              ステップ8（極微ミクロの観測）およびステップ7（特異点の排熱濾過）で還元された純粋エネルギーと知性は、再びステップ2の「11次元スープ」へとフィードバックされ、永久に循環する自律型代謝ループを形成します。
            </div>
          </div>
        </div>

        {/* Right: Selected Node Detailed Inspection Panel (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-5">
          <div className={`rounded-2xl border ${selectedNode.borderColor} bg-slate-900/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden`}>
            {/* Ambient Corner Glow */}
            <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-bl ${selectedNode.bgGradient}`}></div>

            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">STEP {selectedNode.stepNumber} 詳細検証</span>
                <span className={`text-xs font-mono px-2.5 py-1 rounded-md bg-slate-950 border ${selectedNode.borderColor} ${selectedNode.accentColor}`}>
                  {selectedNode.dimension}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                {selectedNode.icon}
                <span>{selectedNode.levelTitle}</span>
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {selectedNode.japaneseName}
              </p>
            </div>

            {/* In-depth 3-Stage Filtration Pipeline */}
            <div className="space-y-4">
              {/* 1. Incoming */}
              <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  <span>① 濾過前（流入するエネルギー / 状態）</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedNode.incomingState}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center -my-2">
                <ArrowDown className={`w-4 h-4 ${selectedNode.accentColor} animate-bounce`} />
              </div>

              {/* 2. Filter Action */}
              <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-cyan-400" />
                  <span>② 濾過メカニズム（フィルターの作用）</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {selectedNode.filterMechanism}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center -my-2">
                <ArrowDown className={`w-4 h-4 ${selectedNode.accentColor} animate-bounce`} />
              </div>

              {/* 3. Output */}
              <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>③ 濾過後（生成されたマイルドな秩序）</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                  {selectedNode.filteredOutput}
                </p>
              </div>
            </div>

            {/* Why it is consistent */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 space-y-1.5">
              <div className="text-[11px] font-mono text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>「一貫性」における決定的な役割</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedNode.roleInConsistency}
              </p>
            </div>

            {/* Scientific Analog */}
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <span className="font-mono text-slate-500">対応する現代物理・数学理論：</span>
              <p className="text-slate-300 italic">
                {selectedNode.scientificProof}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
