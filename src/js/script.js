/**
 * ===========================
 * 各要素
 */
// スタートボタン
const quizStartBtn = document.querySelector('#quiz-start-btn');

// スタートオーバーレイ
const quizStart = document.querySelector('#quiz-start');

// プログレスバー
const progressFill = document.querySelector('#progress-fill');

// プログレステキスト(現在/全問題数の形式)
const currentQuestion = document.querySelector('#progress-text');

// 現在の問題番号
const questionNum = document.querySelector('#question-num');

// 問題文
const question = document.querySelector('#question');

// 選択肢 (全体とそれぞれを取得しておく)
const choiceInputs = document.querySelectorAll('input[name="choice"]');
const choiceA = document.querySelector('#choice-a');
const choiceB = document.querySelector('#choice-b');
const choiceC = document.querySelector('#choice-c');

// 解説
const explanation = document.querySelector('#explanation');
const explanationSpace = document.querySelector('#explanation-space');

// ヒント
const hint = document.querySelector('#hint');

// 答え合わせボタン
const checkAnswerBtn = document.querySelector('#check-answer');

// 次の問題へボタン
const nextQuestionBtn = document.querySelector('#next-question');

// 結果を見るボタン
const checkResultBtn = document.querySelector('#check-result');

// 結果画面
const quizResult = document.querySelector('#quiz-result');

// スコア表示要素
const score = document.querySelector('#score');
const accuracy = document.querySelector('#accuracy');

// もう一度トライするボタン
const startOverBtn = document.querySelector('#start-over');


/**
 * ===========================
 * 問題
 */
const questions = [
    {
        id: 1,
        question: "大きくて強い肉食恐竜で、短い前あしが特徴的なのは次のうちどれでしょう？",
        choices: {
            a: "トリケラトプス",
            b: "ティラノサウルス",
            c: "プテラノドン"
        },
        correct: "b",
        explanation: "ティラノサウルス（T-Rex）は、大きな体と短い前あしが特徴の肉食恐竜です。",
        hint: "「恐竜の王様」とも呼ばれる、とても有名で人気の恐竜です。"
    },
    {
        id: 2,
        question: "顔に3本の角を持つ草食恐竜は次のうちどれでしょう？",
        choices: {
            a: "ステゴサウルス",
            b: "トリケラトプス",
            c: "ブラキオサウルス"
        },
        correct: "b",
        explanation: "トリケラトプスは、名前の「トリ」が「3」を意味するように、顔に3本の角を持つ植物食の恐竜です。",
        hint: "名前の「トリ」は数字の3という意味があります。"
    },
    {
        id: 3,
        question: "ブラキオサウルスのように首がとても長く、高い木の葉っぱを食べていた恐竜は、肉食恐竜と草食恐竜のどちらでしょう？",
        choices: {
            a: "肉食恐竜",
            b: "草食恐竜",
            c: "雑食恐竜"
        },
        correct: "b",
        explanation: "木の葉っぱや草などの植物を食べる恐竜は、草食恐竜と呼ばれます。",
        hint: "「草」食恐竜は、何を食べる恐竜でしょうか？"
    },
    {
        id: 4,
        question: "大昔にほとんどの恐竜がいなくなってしまった一番大きな理由として、科学者が考えているのは次のうちどれでしょう？",
        choices: {
            a: "恐竜同士のケンカが激しすぎたから",
            b: "地面がとても冷たくなってしまったから",
            c: "大きな隕石が地球にぶつかったから"
        },
        correct: "c",
        explanation: "巨大な隕石が地球に衝突し、その後に起きた環境の変化が恐竜の絶滅の主な原因という説が最も有力です。",
        hint: "宇宙から飛んできた、とても大きなものが関係しています。"
    },
    {
        id: 5,
        question: "次の恐竜の名前の中で、「恐竜」（Dinosaur）ではないものはどれでしょう？",
        choices: {
            a: "スピノサウルス",
            b: "プテラノドン",
            c: "ヴェロキラプトル"
        },
        correct: "b",
        explanation: "プテラノドンは空を飛ぶ翼竜（よくりゅう）の仲間で、正確には「恐竜」には分類されません。",
        hint: "この生き物は、翼を広げて空を飛ぶことができました。"
    }
];

/**
 * ===========================
 * 変数
 */
// 現在の問題番号
let currentQuestionIndex = 0;

// 正答数
let correctAnswers = 0;

/**
 * ===========================
 * 関数
 */

// スタートボタンとクイズ初期化処理
quizStartBtn.addEventListener('click', () => {
    quizStart.classList.add('is-started');
    displayQuestion(currentQuestionIndex);
});


// 問題を表示する機能
// ボタン、選択肢の初期化も含む
function displayQuestion(index) {
    const q = questions[index];

    questionNum.textContent = q.id;
    question.textContent = q.question;
    choiceA.textContent = q.choices.a;
    choiceB.textContent = q.choices.b;
    choiceC.textContent = q.choices.c;
    hint.textContent = q.hint;

    // プログレスバーの更新
    currentQuestion.textContent = `${index + 1}/${questions.length}`;
    progressFill.style.width = `${((index + 1) / questions.length) * 100}%`;

    // 選択肢をリセットし、選択できるように有効化
    for (let i = 0; i < choiceInputs.length; i++) {
        choiceInputs[i].checked = false;
        choiceInputs[i].disabled = false;
    }

    // 解説を非表示
    explanationSpace.classList.remove('is-shown');
    
    // 答え合わせボタンを無効化
    checkAnswerBtn.disabled = true;
}

// 選択肢の変更を監視し、答え合わせボタンの状態を更新する関数
choiceInputs.forEach(input => {
    input.addEventListener('change', () => {
        checkAnswerBtn.disabled = false;
    });
});

// 答え合わせボタンのクリックイベント
checkAnswerBtn.addEventListener('click', () => {
    const q = questions[currentQuestionIndex];
    const selectedInput = document.querySelector('input[name="choice"]:checked');
    
    // if (!selectedInput) return;
    
    // 選択したボタンの値と正解の値を取得する
    const selectedValue = selectedInput.value;
    const correctValue = q.correct;
    
    // 正解の選択肢に correct クラスを付与
    const correctInput = document.querySelector(`input[value="${correctValue}"]`);
    correctInput.classList.add('correct');
    
    // 正解の場合は正解数を更新、間違いの場合は間違いの選択肢に incorrect クラスを付与
    if (selectedValue === correctValue) {
        correctAnswers++;
    } else {
        selectedInput.classList.add('incorrect');
    }
    
    // 解説を表示
    explanation.textContent = q.explanation;
    explanationSpace.classList.add('is-shown');
    
    // 選択肢を無効化
    choiceInputs.forEach(input => {
        input.disabled = true;
    });
    
    // 答え合わせボタンを無効化
    checkAnswerBtn.disabled = true;
    
    // 最後の問題でない場合のみ次の問題ボタンを有効化
    console.log('現在の問題番号', currentQuestionIndex);
    if (currentQuestionIndex < questions.length - 1) {
        nextQuestionBtn.disabled = false;
    } else {
        console.log('last!')
        // 最後の問題の場合は結果を見るボタンを有効化し、表示させる
        checkResultBtn.disabled = false;
        checkResultBtn.classList.add('is-shown');
    }
});

// 次の問題へボタンのクリックイベント
nextQuestionBtn.addEventListener('click', () => {
    // 選択肢のクラスをリセット
    choiceInputs.forEach(input => {
        input.parentElement.classList.remove('correct', 'incorrect');
    });
    
    // 次の問題に進む(currentQuestionIndexをインクリメントし、displayQuestionを呼び出す)
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
    
    // 次の問題ボタンを無効化
    nextQuestionBtn.disabled = true;
});

// 結果を見るボタンのクリックイベント
checkResultBtn.addEventListener('click', () => {
    // 正答率を計算
    const accuracyRate = Math.round((correctAnswers / questions.length) * 100);
    
    // スコアと正答率を表示
    score.textContent = `${correctAnswers}/${questions.length}`;
    accuracy.textContent = accuracyRate;
    
    // 結果画面を表示
    quizResult.classList.add('is-shown');
});

// もう一度トライするボタンのクリックイベント
startOverBtn.addEventListener('click', () => {
    // 変数をリセット
    currentQuestionIndex = 0;
    correctAnswers = 0;
    
    // 結果画面を非表示
    quizResult.classList.remove('is-shown');
    
    // スタート画面を表示
    quizStart.classList.remove('is-started');
    
    // ボタンを初期状態に戻す
    checkResultBtn.disabled = true;
    checkResultBtn.classList.remove('is-shown');
    nextQuestionBtn.disabled = true;
    checkAnswerBtn.disabled = true;
});