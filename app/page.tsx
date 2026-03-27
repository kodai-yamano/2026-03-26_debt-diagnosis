"use client";

import { useState } from "react";

// ==============================================================
// 型定義
// ==============================================================
type Axis = "E" | "I" | "R" | "S" | "H" | "F" | "P" | "J";
type Scores = Record<Axis, number>;

interface TypeInfo {
  name: string;
  subtitle: string;
  description: string;
  plan1: string;
}

interface Question {
  question: string;
  axis: string;
  options: [string, Axis][];
}

// ==============================================================
// 16タイプ定義
// ==============================================================
const TYPES: Record<string, TypeInfo> = {
  ERHP: {
    name: "おもてなしリボ・ライダー",
    subtitle: "人のために使い、気づけば沼にはまったあなたへ",
    description:
      "あなたは人との繋がりを大切にする、温かい心の持ち主です。\n友人や仲間との時間を大切にするため、交際費が積み重なってしまいました。\n「リボ払いなら今月はなんとかなる」という楽観的な発想も、あなたの明るい性格の裏返し。\n自分を責める必要はまったくありません。",
    plan1:
      "**STEP 1: リボ払いの「総額と毎月の利息」だけ確認する**\n詳細は後でOK。総額と利息の数字だけ把握するところから始めましょう。\n\n**STEP 2: 交際費に「月上限」を決める**\n「今月の交際費は1.5万円まで」と先に決めるだけで支出が変わります。\n\n**STEP 3: おまとめローンを検討する**\n複数のリボ払いを低金利の1本にまとめることで、毎月の負担を軽減できます。",
  },
  ERHJ: {
    name: "段取り上手な見栄っ張りプランナー",
    subtitle: "計画は立てる、でも外せない付き合いがある",
    description:
      "計画的に管理したい気持ちはあるのに、人付き合いが多くて出費が読めない——\nそんなジレンマを抱えているあなた。几帳面な部分があるからこそ、\n理想と現実のギャップに悩んでいるのでしょう。\nその「管理したい」という意志は、解決への大きな武器になります。",
    plan1:
      "**STEP 1: 交際費を「固定費」として予算化する**\n月2万円を交際費枠として確保し、超えたら断る練習をしましょう。\n\n**STEP 2: リボ払い返済額を毎月少しずつ増やす**\n毎月の最低返済額＋5,000円を目標にしてみましょう。\n\n**STEP 3: 家計管理アプリで自動仕分け**\nZaim・マネーフォワードなどで交際費を可視化すると計画が立てやすくなります。",
  },
  ERFP: {
    name: "感情派・全力投球タイプ",
    subtitle: "直感で動いて、現実を直視しすぎて疲れているあなたへ",
    description:
      "感情豊かで、周りに全力を注ぐあなた。\n数字と向き合う力があるからこそ、現状の厳しさを感じてしまっているのかもしれません。\nでも、現実を見られることは解決への第一歩。\nあなたはすでに、多くの人より一歩先を行っています。",
    plan1:
      "**STEP 1: 現在の総債務額と利息を一覧化する**\n紙でもスプレッドシートでも。見える化だけで気持ちが楽になります。\n\n**STEP 2: 「雪だるま式返済法」を試す**\n残高の少ないカードから順番に完済していく方法です。達成感が続きます。\n\n**STEP 3: 固定費の見直し（通信費・サブスク）**\n月3,000〜10,000円の削減は多くの人に現実的な方法です。",
  },
  ERFJ: {
    name: "データ収集型・完璧主義プランナー",
    subtitle: "全部わかってる。だから怖い。そんなあなたへ",
    description:
      "細かく計算して、すべてを把握しているあなた。\nだからこそ、数字が示す現実の重さに押しつぶされそうになることもあるでしょう。\n「わかっているのに変えられない」という感覚は、意志の弱さではなく、\n構造的な問題である場合がほとんどです。",
    plan1:
      "**STEP 1: 毎月の可処分所得と返済額の比率を計算する**\n返済額が収入の20%以上なら、計画の見直しが必要なサインです。\n\n**STEP 2: 収入を増やす選択肢を検討する**\n副業・残業・資格取得など、収入側からアプローチする方法もあります。\n\n**STEP 3: 「利息だけ払っている状態」を数値で確認する**\n現状を数字で確認することで、次の一手を決めやすくなります。",
  },
  ESHP: {
    name: "見栄っ張り不安症・衝動買いタイプ",
    subtitle: "人に見せる自分と、実は不安な自分が同居しているあなたへ",
    description:
      "外見や評価を大切にしながら、内心では将来が心配でたまらない。\nそんな複雑な気持ちを抱えているのではないでしょうか。\n衝動的な買い物は「今の不安から目をそらすための行動」である場合もあります。\nあなたの感受性は、正しく活かせば大きな強みになります。",
    plan1:
      "**STEP 1: 「48時間ルール」を試す**\n欲しいものを見つけたら、48時間待ってから購入を判断する習慣をつけましょう。\n\n**STEP 2: 交際費と衝動買い費用に上限を設定する**\n「今月のお楽しみ費：1万円」のように、罪悪感なく使える枠を作りましょう。\n\n**STEP 3: 高金利のキャッシングから返済を優先する**\n金利の高い借金から順番に返すと利息の総支払いが減ります。",
  },
  ESHJ: {
    name: "心配性な見栄えキープ派",
    subtitle: "将来が不安だからこそ、今の自分を保ちたいあなたへ",
    description:
      "不安を感じながらも、見た目や評価を落とせないプレッシャーを感じているあなた。\n計画を立てたい気持ちはあるのに、現実が追いつかない苦しさがあるでしょう。\n「不安」を感じること自体は正常で、変化への準備ができているサインです。",
    plan1:
      "**STEP 1: 不安なことを紙に書き出す**\n「月末に〇万円足りない」など、数字で明示化すると対策が立てやすくなります。\n\n**STEP 2: 固定費削減（通信費・保険の見直し）**\n携帯会社を格安SIMに変えるだけで月3,000〜8,000円の節約になります。\n\n**STEP 3: 自動積立で先取り返済**\n給料日に自動で返済額を移す設定をすると、使いすぎを防げます。",
  },
  ESFP: {
    name: "パリピ直面型・今を生きるタイプ",
    subtitle: "遊びも返済も全力投球、でも疲れているあなたへ",
    description:
      "交際費や遊びにお金を使いながら、現実もしっかり見つめているあなた。\n衝動的に動くことが多くても、それだけエネルギッシュな証拠です。\n「楽しむこと」を大切にする姿勢は人生を豊かにする本質的な価値観。\nただ、その楽しみを長続きさせるために、少しだけ戦略が必要かもしれません。",
    plan1:
      "**STEP 1: 遊び費用を「先払い」に変える**\n前払いのプリペイドカードに予算を入れ、使い切ったら終わりにします。\n\n**STEP 2: 飲み会を週1→月3回にチャレンジ**\n小さな変化でも、月1〜2万円の削減が可能になります。\n\n**STEP 3: 高金利の借入を低金利に乗り換える**\n銀行カードローンやおまとめローンで金利を下げる選択肢があります。",
  },
  ESFJ: {
    name: "完璧計画・社交派プランナー",
    subtitle: "全部管理したい、でも付き合いも大事なあなたへ",
    description:
      "社交性と計画性を両立しようとする、バランス感覚のあるあなた。\n人付き合いにお金がかかるのは、あなたが信頼されている証拠でもあります。\n計画的に動きたい意志があるので、正しい情報さえ揃えば解決できる可能性が高いタイプです。",
    plan1:
      "**STEP 1: 月次の収支表を一度だけ作る**\n一度だけ1か月の収支を書き出してみましょう。問題点が見えてきます。\n\n**STEP 2: 交際費の「断り方」を準備しておく**\n「今月予算オーバーなんで次回で！」という断り文句を用意しておきましょう。\n\n**STEP 3: ボーナス月に一括返済を目標にする**\n年2回のボーナスを返済に充てる計画を立てるだけで気持ちが楽になります。",
  },
  IRHP: {
    name: "孤独な楽観・逃げ込みタイプ",
    subtitle: "誰にも言えないけど、なんとかなると思っていたあなたへ",
    description:
      "生活費のために借りた、でも誰にも相談できない——そんな孤独を抱えていませんか。\n「なんとかなる」という楽観は、厳しい現実の中で自分を守るための防衛反応です。\nあなたは一人で抱えすぎています。まず「知る」ことから始めましょう。",
    plan1:
      "**STEP 1: 借入先と残高を一覧化する**\n怖くても、一度だけ全部書き出してみましょう。知ることが解決の第一歩です。\n\n**STEP 2: 生活費の「削れる部分」を3つ探す**\nサブスク・外食・日用品の中から1つでも減らせるものを見つけます。\n\n**STEP 3: 信頼できる人に話す**\n一人で抱えるより、誰かに話すだけで精神的な余裕が生まれます。",
  },
  IRHJ: {
    name: "生活防衛型・楽観的管理者",
    subtitle: "計画したい、でも生活で精いっぱいなあなたへ",
    description:
      "家計を管理したいけど、毎月の生活費を補うだけで手いっぱい。\nそんな状況でも「なんとかしたい」と前を向いているあなたは、十分頑張っています。\n楽観的でいられることは、長期戦を乗り越えるための大切な力です。",
    plan1:
      "**STEP 1: 収入と支出の差額を毎月メモする**\n赤字の月・黒字の月を把握するだけでパターンが見えてきます。\n\n**STEP 2: 食費の節約から始める（目標：月5,000円削減）**\n週単位で食費を管理すると達成感が得やすいです。\n\n**STEP 3: 低所得者向け支援制度を調べる**\n自治体の生活支援や給付金制度を利用できる場合があります。",
  },
  IRFP: {
    name: "現実直視・楽観ギャップタイプ",
    subtitle: "わかってるけど動けない、そんなあなたへ",
    description:
      "現実を直視できる力があるのに、「まあいいか」という楽観が同時にある複雑なタイプ。\n行動に移れない理由は、意志の弱さではなく「どこから手をつければいいかわからない」\nからかもしれません。一つだけ、小さな一歩を踏み出してみましょう。",
    plan1:
      "**STEP 1: 今日、1社だけ残高を確認する**\n全部やろうとしなくていい。今日は1社だけという小さな行動を。\n\n**STEP 2: 「毎月いくら足りないか」だけをシンプルに計算する**\n複雑にしすぎず、まずそれだけ把握します。\n\n**STEP 3: 固定費の見直し（食費・通信費）**\n月5,000円削減できれば、年6万円の返済余力が生まれます。",
  },
  IRFJ: {
    name: "生活苦・分析型プランナー",
    subtitle: "全部計算してる。だから怖さもわかる。そんなあなたへ",
    description:
      "生活費のために借金し、利息の重さも利率も把握している。\nそれでも返済計画を立てようとするあなたの根気強さは本物です。\n自力での解決策を試しながら、より現実的な選択肢を知ることも重要です。",
    plan1:
      "**STEP 1: 現在の利息総額（1年分）を計算する**\n利息だけで年間いくら支払っているか計算してみましょう。\n\n**STEP 2: 社会保障制度を活用する**\n緊急小口資金・住居確保給付金など、使える制度がないか確認を。\n\n**STEP 3: 公的機関への相談を検討する**\n市区町村の「生活困窮者自立支援窓口」は無料で相談できます。",
  },
  ISHP: {
    name: "不安家・引きこもり衝動買いタイプ",
    subtitle: "不安を感じながら、ひとり抱え込んでいるあなたへ",
    description:
      "生活への不安を感じながら、現実から目を背けたくなることがある。\n衝動買いは「今の辛さを一瞬忘れるための行動」であることが多いです。\nあなたは弱いのではありません。ただ、孤独すぎるのです。\n誰かに話すだけで、世界が変わることがあります。",
    plan1:
      "**STEP 1: 「感情日記」で買い物の引き金を把握する**\n衝動買いの前にどんな気持ちだったかを記録すると、パターンが見えます。\n\n**STEP 2: ネットショッピングのアプリを一時削除する**\n目に見えなければ衝動も起きにくくなります。まず1週間だけ試してみましょう。\n\n**STEP 3: 信頼できる人または支援窓口に話す**\n「お金の相談」は恥ずかしいことではありません。無料の窓口が各地にあります。",
  },
  ISHJ: {
    name: "不安管理型・節約奮闘タイプ",
    subtitle: "毎月ドキドキしながら、なんとか乗り越えているあなたへ",
    description:
      "不安を感じながらも、節約や管理を頑張ろうとしているあなた。\nその真面目さと努力は、確実に前進しています。\nただ、頑張りすぎて疲弊しないよう、自分をいたわることも大切です。",
    plan1:
      "**STEP 1: 固定費を年1回だけ見直す**\n保険・通信費・サブスクを年に1回見直す習慣をつけましょう。\n\n**STEP 2: 「節約疲れ」を防ぐために小さなご褒美を設定する**\n月1回だけ「贅沢デー」を作ることで長期の節約が続きやすくなります。\n\n**STEP 3: 緊急時用の「予備費口座」を作る**\n月3,000円からでも別口座に移しておくと、急な出費での借入を防げます。",
  },
  ISFP: {
    name: "内向き爆発型・直感タイプ",
    subtitle: "普段は慎重なのに、気づいたら借金が増えていたあなたへ",
    description:
      "普段は慎重で不安を感じやすいのに、現実を直視した瞬間に衝動的な行動に出てしまう。\nそんなアンバランスさに自分でも戸惑っているかもしれません。\nそれは意志が弱いのではなく、プレッシャーが大きすぎるサインかもしれません。",
    plan1:
      "**STEP 1: 「大きな決断」を一人でしない**\n借入や乗り換えなど重要な決断は、信頼できる人か専門家に相談してから。\n\n**STEP 2: 日常の小さな節約を自動化する**\n貯蓄アプリや自動返済設定で「考えなくても動く」仕組みを作りましょう。\n\n**STEP 3: 生活費の内訳を「食費・光熱費・その他」の3つに絞る**\nシンプルな管理法の方が、敏感なあなたには向いています。",
  },
  ISFJ: {
    name: "慎重派・完全管理タイプ",
    subtitle: "全部管理して、全部不安。それでも前に進もうとしているあなたへ",
    description:
      "慎重に、丁寧に、あらゆることを管理しようとするあなた。\n不安と向き合いながらも計画的に動こうとするその姿勢は大きな強みです。\nあとは「完璧にしようとしすぎない」ことで、行動のスピードが上がるでしょう。",
    plan1:
      "**STEP 1: 返済完了の「ゴール日」を設定する**\n「2年後の〇月に完済する」という具体的なゴールを決めると動きやすくなります。\n\n**STEP 2: 借入先ごとの返済優先順位を決める**\n金利の高い順番に返済する「アバランチ方式」が総利息を最小化します。\n\n**STEP 3: 年1回、専門家（FP・弁護士）に無料相談する**\n客観的なアドバイスをもらうことで、計画がより確実になります。",
  },
};

// ==============================================================
// 質問定義
// ==============================================================
const QUESTIONS: Question[] = [
  {
    question: "Q1. 借金が増えた主なきっかけは何ですか？",
    axis: "EI",
    options: [
      ["友人との飲み会や付き合いで出費が重なった", "E"],
      ["生活費・食費が毎月足りなくなった", "I"],
      ["欲しいものを買ったり、趣味にお金をかけた", "E"],
      ["家族・自分の急な医療費や修理費など", "I"],
    ],
  },
  {
    question: "Q2. 借金の返済について、普段どう感じていますか？",
    axis: "RS",
    options: [
      ["なんとかなるだろうと思っていた", "R"],
      ["将来が不安で、毎月ハラハラしている", "S"],
      ["リボ払いにしておけば大丈夫と思っていた", "R"],
      ["利息や総返済額を把握してから借りた", "S"],
    ],
  },
  {
    question: "Q3. 今の借金に対して、どう向き合っていますか？",
    axis: "HF",
    options: [
      ["明細や残高はなるべく見ないようにしている", "H"],
      ["残高や利息を計算して、現実を直視している", "F"],
      ["督促状や通知が来ても対応を先延ばしにしている", "H"],
      ["返済計画を立てているが、絶望感がある", "F"],
    ],
  },
  {
    question: "Q4. お金の使い方のクセに近いのはどれですか？",
    axis: "PJ",
    options: [
      ["今を楽しむことにお金を使ってしまう", "P"],
      ["家計簿や予算管理をしたいが、なかなか続かない", "J"],
      ["欲しいと思ったらすぐ買う・すぐ借りる", "P"],
      ["計画を立てて節約しようとしている", "J"],
    ],
  },
];

// ==============================================================
// ヘルパー関数
// ==============================================================
function getTypeKey(scores: Scores): string {
  const ei = scores.E >= scores.I ? "E" : "I";
  const rs = scores.R >= scores.S ? "R" : "S";
  const hf = scores.H >= scores.F ? "H" : "F";
  const pj = scores.P >= scores.J ? "P" : "J";
  return `${ei}${rs}${hf}${pj}`;
}

function renderPlan(text: string) {
  return text.split("\n\n").map((block, i) => {
    const lines = block.split("\n");
    return (
      <div key={i} className="mb-4 p-4 bg-white rounded-lg border border-blue-100 shadow-sm">
        {lines.map((line, j) => {
          const parts = line.split(/\*\*(.*?)\*\*/g);
          const rendered = parts.map((part, k) =>
            k % 2 === 1 ? <strong key={k}>{part}</strong> : part
          );
          return (
            <p key={j} className={j === 0 ? "font-semibold text-blue-900 mb-1" : "text-gray-600 text-sm mt-1"}>
              {rendered}
            </p>
          );
        })}
      </div>
    );
  });
}

// ==============================================================
// メインコンポーネント
// ==============================================================
export default function Home() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({
    E: 0, I: 0, R: 0, S: 0, H: 0, F: 0, P: 0, J: 0,
  });
  const [selected, setSelected] = useState<string | null>(null);
  const [showCta, setShowCta] = useState(false);

  const totalQ = QUESTIONS.length;

  const handleNext = () => {
    if (!selected) return;
    const q = QUESTIONS[step];
    const option = q.options.find(([text]) => text === selected);
    if (option) {
      const letter = option[1];
      setScores((prev) => ({ ...prev, [letter]: prev[letter] + 1 }));
    }
    setSelected(null);
    setStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setStep(0);
    setScores({ E: 0, I: 0, R: 0, S: 0, H: 0, F: 0, P: 0, J: 0 });
    setSelected(null);
    setShowCta(false);
  };

  const progressPct = step < totalQ ? (step / totalQ) * 100 : 100;

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <h1 className="text-3xl font-bold text-[#1a3a5c] mb-2">
          💡 借金タイプ診断
        </h1>
        <p className="text-gray-600 mb-6">
          あなたの性格や行動パターンから「借金タイプ」を診断し、あなたに合った返済方法をご提案します。
        </p>
        <hr className="border-gray-200 mb-6" />

        {/* プログレスバー */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {step < totalQ ? (
          /* ====== 質問フェーズ ====== */
          <div>
            <p className="text-sm text-gray-500 mb-3">
              質問 {step + 1} / {totalQ}
            </p>
            <h2 className="text-xl font-semibold text-[#1e4d8c] mb-4">
              {QUESTIONS[step].question}
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              当てはまるものを1つ選んでください
            </p>

            <div className="space-y-3 mb-6">
              {QUESTIONS[step].options.map(([text]) => (
                <label
                  key={text}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selected === text
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="option"
                    value={text}
                    checked={selected === text}
                    onChange={() => setSelected(text)}
                    className="mt-0.5 accent-blue-500 shrink-0"
                  />
                  <span className="text-gray-700">{text}</span>
                </label>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!selected}
              className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              次へ →
            </button>
          </div>
        ) : (
          /* ====== 結果フェーズ ====== */
          (() => {
            const typeKey = getTypeKey(scores);
            const result = TYPES[typeKey];
            return (
              <div>
                {/* 完了バナー */}
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                  診断が完了しました！あなたのタイプが判明しました。
                </div>

                {/* タイプバッジ */}
                <div
                  className="text-white p-5 rounded-xl text-xl font-bold text-center mb-2 tracking-wide"
                  style={{
                    background: "linear-gradient(135deg, #1a3a5c, #2c7be5)",
                  }}
                >
                  {typeKey}型：{result.name}
                </div>
                <p className="text-[#4a6fa5] text-center mb-6">
                  — {result.subtitle} —
                </p>

                {/* 特徴解説 */}
                <h2 className="text-xl font-semibold text-[#1e4d8c] mb-3">
                  あなたの特徴
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 whitespace-pre-line text-gray-700 leading-relaxed">
                  {result.description}
                </div>

                <hr className="border-gray-200 mb-6" />

                {/* 第1提案 */}
                <h2 className="text-xl font-semibold text-[#1e4d8c] mb-4">
                  第1提案：自力返済ステップ
                </h2>
                <div className="mb-6">{renderPlan(result.plan1)}</div>

                <hr className="border-gray-200 mb-6" />

                {/* 第2提案 */}
                <h2 className="text-xl font-semibold text-[#1e4d8c] mb-3">
                  第2提案（オプション）：家計改善の次の一手として
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  自力返済を続けながら、
                  <strong>利息のカット</strong>や
                  <strong>元金の圧縮</strong>
                  という選択肢を知っておくことも大切です。
                  <strong>債務整理</strong>
                  は、借金問題に悩む方に法律が認めた正式な手続きです。
                  適切に活用することで、返済総額を大幅に減らせる場合があります。
                </p>

                {/* 比較表 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-bold text-blue-900 mb-3">自力返済</h3>
                    <ul className="space-y-1.5 text-sm text-gray-700">
                      <li>✅ 信用情報への影響なし</li>
                      <li>✅ 手続き不要で始められる</li>
                      <li>✅ 家族に知られにくい</li>
                      <li className="pt-2">⚠️ 利息はそのまま支払い続ける</li>
                      <li>⚠️ 高額な場合は時間がかかる</li>
                      <li>⚠️ 生活費を圧迫する可能性がある</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-bold text-green-900 mb-3">
                      債務整理（任意整理・自己破産など）
                    </h3>
                    <ul className="space-y-1.5 text-sm text-gray-700">
                      <li>✅ 利息カット・元金圧縮が可能</li>
                      <li>✅ 法律で認められた正式な手続き</li>
                      <li>✅ 返済総額を大幅に減らせる</li>
                      <li className="pt-2">⚠️ 一定期間、新規借入が難しくなる</li>
                      <li>⚠️ 弁護士・司法書士への相談が必要</li>
                      <li>⚠️ 手続きに数か月かかる場合がある</li>
                    </ul>
                  </div>
                </div>

                <hr className="border-gray-200 mb-6" />

                {/* CTA */}
                <h2 className="text-xl font-semibold text-[#1e4d8c] mb-3">
                  無料シミュレーション
                </h2>
                <p className="text-gray-700 mb-4">
                  あなたの借金が
                  <strong>具体的にいくら減るか</strong>
                  、専門家による無料シミュレーションで確認できます。
                </p>
                <button
                  onClick={() => setShowCta(true)}
                  className="w-full py-4 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
                >
                  💰 私の借金がいくら減るか、無料でシミュレーションする
                </button>

                {showCta && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 space-y-2">
                    <p className="font-bold">ご案内</p>
                    <p>
                      このボタンは通常、相談・お申し込みページへ遷移します。
                    </p>
                    <div>
                      <p className="font-bold">📞 無料相談窓口（ダミー）</p>
                      <p className="text-sm">
                        受付時間：平日 9:00〜21:00 ／ 土日祝 10:00〜18:00
                        <br />
                        0120-XXX-XXX
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">
                        🌐 オンライン相談フォーム（ダミー）
                      </p>
                      <p className="text-sm">24時間受付中</p>
                    </div>
                    <p className="text-sm">
                      秘密厳守・費用は相談後にご説明・強引な勧誘は一切ありません。
                    </p>
                  </div>
                )}

                <hr className="border-gray-200 my-6" />

                {/* リスタート */}
                <button
                  onClick={handleReset}
                  className="w-full py-3 px-6 border-2 border-gray-300 text-gray-600 font-semibold rounded-lg hover:border-gray-400 hover:text-gray-800 transition-colors"
                >
                  もう一度診断する
                </button>
              </div>
            );
          })()
        )}
      </div>
    </main>
  );
}
