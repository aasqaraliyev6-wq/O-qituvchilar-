// GLOBAL O'ZGARUVCHILAR
let totalScore = 0;
let userProgress = {
  matematika: { score: 0, completed: 0 },
  onaTili: { score: 0, completed: 0 },
  oqish: { score: 0, completed: 0 }
};
let addedTasks = JSON.parse(localStorage.getItem("addedTasks")) || {
  matematika: [],
  onaTili: [],
  oqish: []
};

// MATEMATIKA
let currentComparison = {};
window.generateComparison = function () {
  try {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    document.getElementById("compNum1").textContent = num1;
    document.getElementById("compNum2").textContent = num2;
    currentComparison = { num1, num2 };
  } catch (e) {
    console.error("Generate Comparison xatosi:", e);
  }
};
window.checkComparison = function (operator) {
  try {
    const { num1, num2 } = currentComparison;
    const resultElement = document.getElementById("compResult");
    let correct = false;
    if (operator === ">" && num1 > num2) correct = true;
    else if (operator === "<" && num1 < num2) correct = true;
    else if (operator === "=" && num1 === num2) correct = true;
    if (correct) {
      resultElement.textContent = "✅ To'g'ri! Ajoyib!";
      resultElement.className = "result-message success";
      addScore("matematika", 10, "mathScore1");
    } else {
      resultElement.textContent = "❌ Noto'g'ri, qayta urinib ko'ring!";
      resultElement.className = "result-message error";
    }
    setTimeout(() => {
      generateComparison();
      resultElement.textContent = "";
      resultElement.className = "result-message";
    }, 2000);
  } catch (e) {
    console.error("Comparison xatosi:", e);
  }
};

let currentMathProblem = {};
window.generateMathProblem = function () {
  try {
    const operations = ["+", "-"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2;
    if (operation === "+") {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
    } else {
      num1 = Math.floor(Math.random() * 10) + 5;
      num2 = Math.floor(Math.random() * num1) + 1;
    }
    document.getElementById("mathNum1").textContent = num1;
    document.getElementById("mathOperator").textContent = operation;
    document.getElementById("mathNum2").textContent = num2;
    currentMathProblem = { num1, num2, operation };
  } catch (e) {
    console.error("Generate Math xatosi:", e);
  }
};
window.checkMathProblem = function () {
  try {
    const { num1, num2, operation } = currentMathProblem;
    const userAnswer =
      parseInt(document.getElementById("mathAnswer").value) || 0;
    let correctAnswer = operation === "+" ? num1 + num2 : num1 - num2;
    const resultElement = document.getElementById("mathResult");
    if (userAnswer === correctAnswer) {
      resultElement.textContent = `✅ To'g'ri! ${num1} ${operation} ${num2} = ${correctAnswer}`;
      resultElement.className = "result-message success";
      addScore("matematika", 15, "mathScore2");
    } else {
      resultElement.textContent = `❌ Noto'g'ri. To'g'ri javob: ${correctAnswer}`;
      resultElement.className = "result-message error";
    }
    setTimeout(() => {
      generateMathProblem();
      document.getElementById("mathAnswer").value = "";
      resultElement.textContent = "";
      resultElement.className = "result-message";
    }, 3000);
  } catch (e) {
    console.error("Math Problem xatosi:", e);
  }
};

const shapes = [
  { type: "circle", name: "Aylana", question: "Aylana shaklini tanlang" },
  { type: "square", name: "Kvadrat", question: "Kvadrat shaklini tanlang" },
  {
    type: "triangle",
    name: "Uchburchak",
    question: "Uchburchak shaklini tanlang"
  }
];
let currentShape = {};
window.generateShapeQuestion = function () {
  try {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    document.getElementById("shapeQuestion").textContent = randomShape.question;
    currentShape = randomShape;
  } catch (e) {
    console.error("Generate Shape xatosi:", e);
  }
};
window.checkShape = function (selectedShape) {
  try {
    const resultElement = document.getElementById("shapeResult");
    if (selectedShape === currentShape.type) {
      resultElement.textContent = `✅ To'g'ri! Bu ${currentShape.name}`;
      resultElement.className = "result-message success";
      addScore("matematika", 12, "mathScore3");
    } else {
      resultElement.textContent = `❌ Noto'g'ri. To'g'ri javob: ${currentShape.name}`;
      resultElement.className = "result-message error";
    }
    setTimeout(() => {
      generateShapeQuestion();
      resultElement.textContent = "";
      resultElement.className = "result-message";
    }, 2000);
  } catch (e) {
    console.error("Shape xatosi:", e);
  }
};

const numbers = [
  { word: "nol", number: 0 },
  { word: "bir", number: 1 },
  { word: "ikki", number: 2 },
  { word: "uch", number: 3 },
  { word: "to'rt", number: 4 },
  { word: "besh", number: 5 },
  { word: "olti", number: 6 },
  { word: "yetti", number: 7 },
  { word: "sakkiz", number: 8 },
  { word: "to'qqiz", number: 9 },
  { word: "o'n", number: 10 }
];
let currentNumber = {};
window.generateNumberWord = function () {
  try {
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    document.getElementById("numberWord").textContent = randomNumber.word;
    currentNumber = randomNumber;
  } catch (e) {
    console.error("Generate Number xatosi:", e);
  }
};
window.checkNumber = function () {
  try {
    const userAnswer =
      parseInt(document.getElementById("numberInput").value) || 0;
    const resultElement = document.getElementById("numberResult");
    if (userAnswer === currentNumber.number) {
      resultElement.textContent = `✅ To'g'ri! ${currentNumber.word} = ${currentNumber.number}`;
      resultElement.className = "result-message success";
      addScore("matematika", 8, "mathScore4");
    } else {
      resultElement.textContent = `❌ Noto'g'ri. To'g'ri javob: ${currentNumber.number}`;
      resultElement.className = "result-message error";
    }
    setTimeout(() => {
      generateNumberWord();
      document.getElementById("numberInput").value = "";
      resultElement.textContent = "";
      resultElement.className = "result-message";
    }, 2000);
  } catch (e) {
    console.error("Number xatosi:", e);
  }
};

// ONA TILI
const alphabet = [
  "A",
  "B",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "X",
  "Y",
  "Z",
  "Oʻ",
  "Gʻ",
  "Sh",
  "Ch",
  "Ng"
];
let currentLetter = "";
window.generateLetter = function () {
  try {
    currentLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    document.getElementById("currentLetter").textContent = currentLetter;
  } catch (e) {
    console.error("Generate Letter xatosi:", e);
  }
};
window.checkLetter = function () {
  try {
    const userInput = document
      .getElementById("letterInput")
      .value.toUpperCase()
      .trim();
    const resultElement = document.getElementById("letterResult");
    if (userInput === currentLetter) {
      resultElement.textContent = "✅ To'g'ri! Ajoyib!";
      resultElement.className = "result-message success";
      addScore("onaTili", 5, "langScore1");
    } else {
      resultElement.textContent = `❌ Noto'g'ri. To'g'ri javob: ${currentLetter}`;
      resultElement.className = "result-message error";
    }
    setTimeout(() => {
      generateLetter();
      document.getElementById("letterInput").value = "";
      resultElement.textContent = "";
      resultElement.className = "result-message";
    }, 2000);
  } catch (e) {
    console.error("Letter xatosi:", e);
  }
};

let currentWord = "";
window.addLetter = function (letter) {
  currentWord += letter;
  document.getElementById("builtWord").textContent = currentWord;
};
window.clearWord = function () {
  currentWord = "";
  document.getElementById("builtWord").textContent = "";
  document.getElementById("wordResult").textContent = "";
};
window.checkWord = function () {
  try {
    const validWords = [
      "ALI",
      "LOLA",
      "OLA",
      "MALI",
      "OLMA",
      "LOL",
      "MOM",
      "ALO"
    ];
    const resultElement = document.getElementById("wordResult");
    if (validWords.includes(currentWord.toUpperCase())) {
      resultElement.textContent = `✅ To'g'ri! "${currentWord}" - mavjud so'z`;
      resultElement.className = "result-message success";
      addScore("onaTili", 15, "langScore2");
    } else {
      resultElement.textContent = "❌ Bunday so'z mavjud emas";
      resultElement.className = "result-message error";
    }
    setTimeout(() => {
      clearWord();
    }, 3000);
  } catch (e) {
    console.error("Word xatosi:", e);
  }
};

let currentSentence = "";
window.addToSentence = function (word) {
  if (currentSentence === "") {
    currentSentence = word;
  } else {
    currentSentence += " " + word;
  }
  document.getElementById("builtSentence").textContent = currentSentence;
};
window.clearSentence = function () {
  currentSentence = "";
  document.getElementById("builtSentence").textContent = "";
  document.getElementById("sentenceResult").textContent = "";
};
window.checkSentence = function () {
  try {
    const validSentences = [
      "Men maktabga boraman",
      "Men kitob o'qiyman",
      "Men maktabga boraman kitob o'qiyman"
    ];
    const resultElement = document.getElementById("sentenceResult");
    if (validSentences.includes(currentSentence)) {
      resultElement.textContent = `✅ To'g'ri! "${currentSentence}" - mazmunli gap`;
      resultElement.className = "result-message success";
      addScore("onaTili", 20, "langScore3");
    } else {
      resultElement.textContent = "❌ Gap mazmunli emas yoki noto'g'ri";
      resultElement.className = "result-message error";
    }
    setTimeout(() => {
      clearSentence();
    }, 3000);
  } catch (e) {
    console.error("Sentence xatosi:", e);
  }
};

const spellingWords = [
  { correct: "kitob", display: "kitob" },
  { correct: "daftar", display: "daftar" },
  { correct: "ruchka", display: "ruchka" },
  { correct: "o'quvchi", display: "o'quvchi" },
  { correct: "maktab", display: "maktab" }
];
let currentSpellingWord = {};
window.generateSpellingWord = function () {
  try {
    currentSpellingWord =
      spellingWords[Math.floor(Math.random() * spellingWords.length)];
    document.getElementById("spellingWord").textContent =
      currentSpellingWord.display;
  } catch (e) {
    console.error("Generate Spelling xatosi:", e);
  }
};
window.checkSpelling = function () {
  try {
    const userInput = document
      .getElementById("spellingInput")
      .value.toLowerCase()
      .trim();
    const resultElement = document.getElementById("spellingResult");
    if (userInput === currentSpellingWord.correct) {
      resultElement.textContent = "✅ To'g'ri yozdingiz!";
      resultElement.className = "result-message success";
      addScore("onaTili", 10, "langScore4");
    } else {
      resultElement.textContent = `❌ Noto'g'ri. To'g'ri yozilishi: ${currentSpellingWord.correct}`;
      resultElement.className = "result-message error";
    }
    setTimeout(() => {
      generateSpellingWord();
      document.getElementById("spellingInput").value = "";
      resultElement.textContent = "";
      resultElement.className = "result-message";
    }, 3000);
  } catch (e) {
    console.error("Spelling xatosi:", e);
  }
};

// O'QISH
const stories = [
  {
    title: "Bola va Olma",
    content: `<h4>Bola va Olma</h4><p>Bir bor ekan, bir yoq ekan. Bir bola bor ekan. Uning ismi Ali ekan.</p><p>Ali bog'ga borib, qizil olma ko'ribdi. Olma juda chiroyli edi.</p><p>Ali olmani terib, onasiga olib bordi. Onasi olmani yuvib, Aliga berdi.</p><p>Ali olmani yeb, juda xursand bo'ldi.</p>`,
    questions: [
      { question: "1. Bola ismi nima edi?", answer: "ali" },
      { question: "2. Ali nima ko'ribdi?", answer: "olma" },
      { question: "3. Olma qanday rang edi?", answer: "qizil" },
      { question: "4. Ali olmani kimga olib bordi?", answer: "onasi" }
    ]
  },
  {
    title: "Chumoli va Kapalak",
    content: `<h4>Chumoli va Kapalak</h4><p>Bir kuni chumoli uyasiga ovqat olib ketayotgan edi.</p><p>Yo'lda u rang-barang kapalakni ko'ribdi. Kapalak gullar ustida raqs tushayotgan edi.</p><p>Chumoli: "Sening qanotlaring juda go'zal", dedi.</p><p>Kapalak: "Rahmat, sen ham juda mehnatkorsan", dedi.</p>`,
    questions: [
      {
        question: "1. Chumoli nima qilayotgan edi?",
        answer: "ovqat olib ketayotgan"
      },
      { question: "2. Kapalak qayerda edi?", answer: "gullar ustida" },
      {
        question: "3. Kapalak nima qilayotgan edi?",
        answer: "raqs tushayotgan"
      }
    ]
  },
  {
    title: "Mening Oilam",
    content: `<h4>Mening Oilam</h4><p>Mening oilamda ona, ota va aka bor. Biz birga yashaymiz.</p><p>Ona ovqat pishiradi. Ota ishlaydi. Aka maktabga boradi.</p><p>Biz oilamizni yaxshi ko'ramiz.</p>`,
    questions: [
      { question: "1. Oilada kimlar bor?", answer: "ona ota aka" },
      { question: "2. Ona nima qiladi?", answer: "ovqat pishiradi" },
      {
        question: "3. Biz oilamizni qanday ko'ramiz?",
        answer: "yaxshi ko'ramiz"
      }
    ]
  }
];
let currentStoryIndex = 0;
window.showStory = function (index) {
  try {
    currentStoryIndex = index - 1;
    const story = stories[currentStoryIndex];
    document.querySelectorAll(".story-btn").forEach((btn, i) => {
      btn.classList.toggle("active", i === currentStoryIndex);
    });
    document.getElementById("storyText").innerHTML = story.content;
    const questionsContainer = document.querySelector(
      ".comprehension-questions"
    );
    let questionsHTML = "<h4>Savollar:</h4>";
    story.questions.forEach((q, i) => {
      questionsHTML += `
                <div class="question">
                    <p>${q.question}</p>
                    <input type="text" id="q${i + 1}" class="question-input">
                </div>
            `;
    });
    questionsHTML += `
            <button class="check-btn" onclick="checkComprehension()">Javoblarni tekshirish</button>
            <div id="comprehensionResult" class="result-message"></div>
            <div class="score-display">Ball: <span id="readingScore1">0</span></div>
        `;
    questionsContainer.innerHTML = questionsHTML;
  } catch (e) {
    console.error("Show Story xatosi:", e);
  }
};
window.checkComprehension = function () {
  try {
    const story = stories[currentStoryIndex];
    let allCorrect = true;
    let resultHTML = "";
    story.questions.forEach((q, i) => {
      const userAnswer = document
        .getElementById(`q${i + 1}`)
        .value.toLowerCase()
        .trim();
      if (userAnswer.includes(q.answer)) {
        resultHTML += `<p>✅ ${q.question} - To'g'ri!</p>`;
      } else {
        resultHTML += `<p>❌ ${q.question} - To'g'ri javob: ${q.answer}</p>`;
        allCorrect = false;
      }
    });
    const resultElement = document.getElementById("comprehensionResult");
    resultElement.innerHTML = resultHTML;
    if (allCorrect) {
      resultElement.className = "result-message success";
      addScore("oqish", 25, "readingScore1");
    } else {
      resultElement.className = "result-message warning";
    }
  } catch (e) {
    console.error("Comprehension xatosi:", e);
  }
};

const poems = [
  {
    title: "Bahor",
    content: `<h4>Bahor</h4><p>Bahor keldi, gullar ochdi,</p><p>Qushlar sayradi shodlik bilan.</p><p>Yam-yashil bo'ldi dalalar,</p><p>Tabiat kiyindi yangi libos.</p>`,
    questions: [
      { question: "Qaysi fasl haqida she'r?", answer: "bahor" },
      { question: "Nimalar ochdi?", answer: "gullar" }
    ]
  }
];
let currentPoemIndex = 0;
window.showPoem = function (index) {
  try {
    currentPoemIndex = index;
    const poem = poems[currentPoemIndex % poems.length];
    document.getElementById("currentPoem").innerHTML = poem.content;
    const questionsContainer = document.querySelector(".poem-questions");
    let questionsHTML = "";
    poem.questions.forEach((q, i) => {
      questionsHTML += `
                <div class="question">
                    <p>${q.question}</p>
                    <input type="text" id="poemQ${
                      i + 1
                    }" class="question-input">
                </div>
            `;
    });
    questionsHTML += `
            <button class="check-btn" onclick="checkPoemQuestions()">Tekshirish</button>
            <div id="poemResult" class="result-message"></div>
            <div class="score-display">Ball: <span id="readingScore2">0</span></div>
        `;
    questionsContainer.innerHTML = questionsHTML;
  } catch (e) {
    console.error("Show Poem xatosi:", e);
  }
};
window.checkPoemQuestions = function () {
  try {
    const poem = poems[currentPoemIndex % poems.length];
    let correctCount = 0;
    let resultHTML = "";
    poem.questions.forEach((q, i) => {
      const userAnswer = document
        .getElementById(`poemQ${i + 1}`)
        .value.toLowerCase()
        .trim();
      if (userAnswer.includes(q.answer)) {
        correctCount++;
        resultHTML += `<p>✅ ${q.question} - To'g'ri!</p>`;
      } else {
        resultHTML += `<p>❌ ${q.question} - To'g'ri javob: ${q.answer}</p>`;
      }
    });
    const resultElement = document.getElementById("poemResult");
    resultElement.innerHTML = resultHTML;
    if (correctCount === poem.questions.length) {
      resultElement.className = "result-message success";
      addScore("oqish", 20, "readingScore2");
    } else {
      resultElement.className = "result-message warning";
    }
  } catch (e) {
    console.error("Poem Questions xatosi:", e);
  }
};

let readingTimer;
let timeLeft = 60;
window.startSpeedReading = function () {
  try {
    timeLeft = 60;
    document.getElementById("timer").textContent = timeLeft;
    document.getElementById("comprehensionTest").style.display = "none";
    document.querySelector(".start-btn").style.display = "none";
    readingTimer = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(readingTimer);
        document.getElementById("comprehensionTest").style.display = "block";
        document.querySelector(".start-btn").style.display = "block";
      }
    }, 1000);
  } catch (e) {
    console.error("Speed Reading xatosi:", e);
  }
};
window.checkSpeedReading = function () {
  try {
    const answers = [
      document.getElementById("speedQ1").value.toLowerCase().trim(),
      document.getElementById("speedQ2").value.toLowerCase().trim(),
      document.getElementById("speedQ3").value.toLowerCase().trim()
    ];
    const correctAnswers = ["bog'ga", "daraxt ostida", "qushlar uya"];
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (answer.includes(correctAnswers[index])) correctCount++;
    });
    const resultElement = document.getElementById("speedResult");
    const score = correctCount * 10;
    if (correctCount === 3) {
      resultElement.textContent =
        "✅ Ajoyib! Barcha savollarga to'g'ri javob berdingiz!";
      resultElement.className = "result-message success";
    } else {
      resultElement.textContent = `✅ ${correctCount} ta savolga to'g'ri javob berdingiz.`;
      resultElement.className = "result-message warning";
    }
    addScore("oqish", score, "readingScore3");
  } catch (e) {
    console.error("Check Speed Reading xatosi:", e);
  }
};

// PROGRESS TIZIMI
window.addScore = function (subject, points, elementId) {
  try {
    userProgress[subject].score += points;
    userProgress[subject].completed++;
    totalScore += points;
    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        const currentScore = parseInt(element.textContent) || 0;
        element.textContent = currentScore + points;
      }
    }
    document.getElementById("totalScore").textContent = totalScore;
    document.getElementById("completedLessons").textContent =
      userProgress.matematika.completed +
      userProgress.onaTili.completed +
      userProgress.oqish.completed;
    updateProgressBars();
    checkAchievements();
  } catch (e) {
    console.error("Add Score xatosi:", e);
  }
};

window.updateProgressBars = function () {
  try {
    const maxScores = { matematika: 200, onaTili: 200, oqish: 200 };
    const idMapping = {
      matematika: { progress: "mathProgress", percent: "mathPercent" },
      onaTili: { progress: "langProgress", percent: "langPercent" },
      oqish: { progress: "readingProgress", percent: "readingPercent" }
    };
    Object.keys(userProgress).forEach((subject) => {
      const mapping = idMapping[subject];
      if (!mapping) return;
      const progress = (userProgress[subject].score / maxScores[subject]) * 100;
      const progressBar = document.getElementById(mapping.progress);
      const percentText = document.getElementById(mapping.percent);
      if (progressBar && percentText) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        percentText.textContent = `${Math.round(progress)}%`;
      }
    });
  } catch (e) {
    console.error("Update Progress xatosi:", e);
  }
};

window.checkAchievements = function () {
  try {
    let count = 0;
    if (userProgress.matematika.score >= 100) {
      document.getElementById("mathMaster").classList.remove("locked");
      count++;
    }
    if (userProgress.onaTili.score >= 150) {
      document.getElementById("languageMaster").classList.remove("locked");
      count++;
    }
    if (userProgress.oqish.score >= 120) {
      document.getElementById("readingMaster").classList.remove("locked");
      count++;
    }
    if (Object.values(userProgress).every((sub) => sub.score >= 100)) {
      document.getElementById("superStudent").classList.remove("locked");
      count++;
    }
    document.getElementById("achievementsCount").textContent = count;
  } catch (e) {
    console.error("Achievements xatosi:", e);
  }
};

// O'QITUVCHI
window.addTeacherTask = function (e) {
  e.preventDefault();
  try {
    const subject = document.getElementById("subjectSelect").value;
    const type = document.getElementById("taskType").value.trim();
    const content = document.getElementById("taskContent").value.trim();
    const answer = document.getElementById("correctAnswer").value.trim();
    const points = parseInt(document.getElementById("taskPoints").value) || 10;
    if (!type || !content) {
      document.getElementById("teacherResult").textContent =
        "❌ Barcha maydonlarni to'ldiring!";
      document.getElementById("teacherResult").className =
        "result-message error";
      return;
    }
    const newTask = {
      type,
      content,
      answer,
      points,
      date: new Date().toLocaleDateString("uz-UZ")
    };
    addedTasks[subject].push(newTask);
    localStorage.setItem("addedTasks", JSON.stringify(addedTasks));
    const list = document.getElementById("addedTasks");
    const item = document.createElement("div");
    item.className = "added-task-item";
    item.innerHTML = `<strong>${type}</strong>: ${content} (Ball: ${points})<br><small>${newTask.date}</small>`;
    list.appendChild(item);
    document.getElementById("teacherForm").reset();
    document.getElementById("teacherResult").textContent =
      "✅ Topshiriq qo'shildi!";
    document.getElementById("teacherResult").className =
      "result-message success";
    if (subject === "matematika") {
      alert(`Matematika o'yiniga yangi topshiriq qo\'shildi: ${content}`);
    }
  } catch (e) {
    console.error("O'qituvchi xatosi:", e);
  }
};

// INITSIALIZATSIYA
function initializeGames() {
  try {
    generateComparison();
    generateMathProblem();
    generateShapeQuestion();
    generateNumberWord();
    generateLetter();
    generateSpellingWord();
    showStory(1);
    showPoem(0);
    updateProgressBars();
    checkAchievements();
    document
      .getElementById("teacherForm")
      .addEventListener("submit", addTeacherTask);
    const list = document.getElementById("addedTasks");
    list.innerHTML = "";
    Object.keys(addedTasks).forEach((subject) => {
      addedTasks[subject].forEach((task) => {
        const item = document.createElement("div");
        item.className = "added-task-item";
        item.innerHTML = `<strong>${task.type}</strong> (${subject}): ${task.content}`;
        list.appendChild(item);
      });
    });
    // Progress yuklash
    const savedProgress = localStorage.getItem("userProgress");
    if (savedProgress) {
      userProgress = JSON.parse(savedProgress);
      totalScore = Object.values(userProgress).reduce(
        (sum, sub) => sum + sub.score,
        0
      );
      updateProgressBars();
      checkAchievements();
      // Ball elementlarini yangilash
      [
        "mathScore1",
        "mathScore2",
        "mathScore3",
        "mathScore4",
        "langScore1",
        "langScore2",
        "langScore3",
        "langScore4",
        "readingScore1",
        "readingScore2",
        "readingScore3"
      ].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = 0; // Reset, lekin saved'dan yangilash mumkin
      });
    }
  } catch (e) {
    console.error("Initsializatsiya xatosi:", e);
  }
}

document.addEventListener("DOMContentLoaded", initializeGames);
window.addEventListener("beforeunload", () => {
  localStorage.setItem("userProgress", JSON.stringify(userProgress));
  localStorage.setItem("addedTasks", JSON.stringify(addedTasks));
});
window.startLearning = function () {
  document.getElementById("matematika").scrollIntoView({ behavior: "smooth" });
};
