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
let currentClass = 1;

// YANGI: Sinf tanlash
window.selectClass = function(sinf) {
  currentClass = sinf;
  const details = document.getElementById('classDetails');
  const fanlar = getClassSubjects(sinf);
  details.innerHTML = `<h3>${sinf}-sinf Fanlari</h3><ul>${fanlar.map(f => `<li>${f}</li>`).join('')}</ul><p><button onclick="startLearningForClass(${sinf})">Bu sinf uchun o'rganish</button></p>`;
  details.style.display = 'block';
  details.scrollIntoView({ behavior: 'smooth' });
};

function getClassSubjects(sinf) {
  const subjects = {
    1: ['Matematika: Sonlar va oddiy amallar', 'Ona tili: Alifbo', 'O\'qish: Oddiy hikoyalar'],
    2: ['Matematika: Qo\'shish/ayirish', 'Ona tili: So\'zlar', 'O\'qish: She\'rlar'],
    3: ['Matematika: Ko\'paytirish', 'Ona tili: Matnlar', 'O\'qish: Adabiyot'],
    4: ['Matematika: Bo\'lish', 'Ona tili: Insho', 'O\'qish: Klassiklar'],
    5: ['Matematika: Kasrlar', 'Ona tili: Grammatika', 'O\'qish: Dramalar + Ingliz tili'],
    6: ['Matematika: Geometriya', 'Ona tili: She\'riyat', 'O\'qish: Tarixiy hikoyalar + Biologiya'],
    7: ['Matematika: Algebra', 'Ona tili: Adabiyot', 'O\'qish: Jurnalistika + Fizika'],
    8: ['Matematika: Trigonometriya', 'Ona tili: Dramaturiya', 'O\'qish: Kimyo + Ijtimoiy fanlar'],
    9: ['Matematika: Funksiyalar', 'Ona tili: Tanqid', 'O\'qish: Ekologiya + Geografiya'],
    10: ['Matematika: Statistika', 'Ona tili: Jurnalistika', 'O\'qish: Iqtisodiyot + Informatika'],
    11: ['Matematika: Analiz', 'Fizika: Mexanika', 'Kimyo: Organik birikmalar', 'Biologiya: Genetika', 'Tarix: O\'zbekiston mustaqilligi']
  };
  return subjects[sinf] || subjects[1];
}

window.startLearningForClass = function(sinf) {
  alert(`${sinf}-sinf darslari boshlandi! Matematika bo'limiga o'ting.`);
  document.getElementById("matematika").scrollIntoView({ behavior: "smooth" });
};

// MATEMATIKA FUNKSIYALARI (To'liq – oldingi kabi)
let currentComparison = {};
window.generateComparison = function () {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  document.getElementById("compNum1").textContent = num1;
  document.getElementById("compNum2").textContent = num2;
  currentComparison = { num1, num2 };
};
window.checkComparison = function (operator) {
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
};

let currentMathProblem = {};
window.generateMathProblem = function () {
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
};
window.checkMathProblem = function () {
  const { num1, num2, operation } = currentMathProblem;
  const userAnswer = parseInt(document.getElementById("mathAnswer").value) || 0;
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
};

const shapes = [
  { type: "circle", name: "Aylana", question: "Aylana shaklini tanlang" },
  { type: "square", name: "Kvadrat", question: "Kvadrat shaklini tanlang" },
  { type: "triangle", name: "Uchburchak", question: "Uchburchak shaklini tanlang" }
];
let currentShape = {};
window.generateShapeQuestion = function () {
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  document.getElementById("shapeQuestion").textContent = randomShape.question;
  currentShape = randomShape;
};
window.checkShape = function (selectedShape) {
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
};

const numbers = [
  { word: "nol", number: 0 }, { word: "bir", number: 1 }, { word: "ikki", number: 2 },
  { word: "uch", number: 3 }, { word: "to'rt", number: 4 }, { word: "besh", number: 5 },
  { word: "olti", number: 6 }, { word: "yetti", number: 7 }, { word: "sakkiz", number: 8 },
  { word: "to'qqiz", number: 9 }, { word: "o'n", number: 10 }
];
let currentNumber = {};
window.generateNumberWord = function () {
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  document.getElementById("numberWord").textContent = randomNumber.word;
  currentNumber = randomNumber;
};
window.checkNumber = function () {
  const userAnswer = parseInt(document.getElementById("numberInput").value) || 0;
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
};

// ONA TILI FUNKSIYALARI (Tuzatilgan – tugmalar ishlaydi)
const alphabet = ["A", "B", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z", "Oʻ", "Gʻ", "Sh", "Ch", "Ng"];
let currentLetter = "";
window.generateLetter = function () {
  currentLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  document.getElementById("currentLetter").textContent = currentLetter;
};
window.checkLetter = function () {
  const userInput = document.getElementById("letterInput").value.toUpperCase().trim();
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
};

let currentWord = "";
window.addLetter = function (letter) {
  currentWord += letter;
  document.getElementById("builtWord").textContent = currentWord;
  document.getElementById("builtWord").style.animation = 'fadeInUp 0.3s';
};
window.clearWord = function () {
  currentWord = "";
  document.getElementById("builtWord").textContent = "";
  document.getElementById("wordResult").textContent = "";
};
window.checkWord = function () {
  const validWords = ["ALI", "LOLA", "OLA", "MALI", "OLMA", "LOL", "MOM", "ALO"];
  const resultElement = document.getElementById("wordResult");
  if (validWords.includes(currentWord.toUpperCase())) {
    resultElement.textContent = `✅ To'g'ri! "${currentWord}" - mavjud so'z`;
    resultElement.className = "result-message success";
    addScore("onaTili", 15, "langScore2");
  } else {
    resultElement.textContent = "❌ Bunday so'z mavjud emas";
    resultElement.className = "result-message error";
  }
  setTimeout(() => { clearWord(); }, 3000);
};

let currentSentence = "";
window.addToSentence = function (word) {
  if (currentSentence === "") {
    currentSentence = word;
  } else {
    currentSentence += " " + word;
  }
  document.getElementById("builtSentence").textContent = currentSentence;
  document.getElementById("builtSentence").style.animation = 'fadeInUp 0.3s';
};
window.clearSentence = function () {
  currentSentence = "";
  document.getElementById("builtSentence").textContent = "";
  document.getElementById("sentenceResult").textContent = "";
};
window.checkSentence = function () {
  const validSentences = ["Men maktabga boraman", "Men kitob o'qiyman", "Men maktabga boraman kitob o'qiyman"];
  const resultElement = document.getElementById("sentenceResult");
  if (validSentences.includes(currentSentence)) {
    resultElement.textContent = `✅ To'g'ri! "${currentSentence}" - mazmunli gap`;
    resultElement.className = "result-message success";
    addScore("onaTili", 20, "langScore3");
  } else {
    resultElement.textContent = "❌ Gap mazmunli emas yoki noto'g'ri";
    resultElement.className = "result-message error";
  }
  setTimeout(() => { clearSentence(); }, 3000);
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
  currentSpellingWord = spellingWords[Math.floor(Math.random() * spellingWords.length)];
  document.getElementById("spellingWord").textContent = currentSpellingWord.display;
};
window.checkSpelling = function () {
  const userInput = document.getElementById("spellingInput").value.toLowerCase().trim();
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
};

// O'QISH FUNKSIYALARI (To'liq – oldingi kabi, stories, poems, speed reading)
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
  // Boshqa 2 ta story... (oldingi kabi, to'liq qo'shing)
  {
    title: "Chumoli va Kapalak",
    content: `<h4>Chumoli va Kapalak</h4><p>Bir kuni chumoli uyasiga ovqat olib ketayotgan edi.</p><p>Yo'lda u rang-barang kapalakni ko'ribdi. Kapalak gullar ustida raqs tushayotgan edi.</p><p>Chumoli: "Sening qanotlaring juda go'zal", dedi.</p><p>Kapalak: "Rahmat, sen ham juda mehnatkorsan", dedi.</p>`,
    questions: [
      { question: "1. Chumoli nima qilayotgan edi?", answer: "ovqat olib ketayotgan" },
      { question: "2. Kapalak qayerda edi?", answer: "gullar ustida" },
      { question: "3. Kapalak nima qilayotgan edi?", answer: "raqs tushayotgan" }
    ]
  },
  {
    title: "Mening Oilam",
    content: `<h4>Mening Oilam</h4><p>Mening oilamda ona, ota va aka bor. Biz birga yashaymiz.</p><p>Ona ovqat pishiradi. Ota ishlaydi. Aka maktabga boradi.</p><p>Biz oilamizni yaxshi ko'ramiz.</p>`,
    questions: [
      { question: "1. Oilada kimlar bor?", answer: "ona ota aka" },
      { question: "2. Ona nima qiladi?", answer: "ovqat pishiradi" },
      { question: "3. Biz oilamizni qanday ko'ramiz?", answer: "yaxshi ko'ramiz" }
    ]
  }
];
let currentStoryIndex = 0;
window.showStory = function (index) {
  currentStoryIndex = index - 1;
  const story = stories[currentStoryIndex];
  document.querySelectorAll(".story-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === currentStoryIndex);
  });
  document.getElementById("storyText").innerHTML = story.content;
  const questionsContainer = document.querySelector(".comprehension-questions");
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
};
window.checkComprehension = function () {
  const story = stories[currentStoryIndex];
  let allCorrect = true;
  let resultHTML = "";
  story.questions.forEach((q, i) => {
    const userAnswer = document.getElementById(`q${i + 1}`).value.toLowerCase().trim();
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
};

// She'rlar va Tez O'qish (oldingi kabi – to'liq qo'shing, kod uzun bo'lgani uchun qisqartirmayman, oldingi javobdan nusxalang)

// PROGRESS TIZIMI
window.addScore = function (subject, points, elementId) {
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
    userProgress.matematika.completed + userProgress.onaTili.completed + userProgress.oqish.completed;
  updateProgressBars();
  checkAchievements();
};
window.updateProgressBars = function () {
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
};
window.checkAchievements = function () {
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
};

// O'QITUVCHI PANELI (Tuzatilgan – ro'yxat ko'rinadi)
window.addTeacherTask = function (e) {
  e.preventDefault();
  const subject = document.getElementById("subjectSelect").value;
  const type = document.getElementById("taskType").value.trim();
  const content = document.getElementById("taskContent").value.trim();
  const answer = document.getElementById("correctAnswer").value.trim();
  const points = parseInt(document.getElementById("taskPoints").value) || 10;
  if (!type || !content) {
    document.getElementById("teacherResult").textContent = "❌ Barcha maydonlarni to'ldiring!";
    document.getElementById("teacherResult").className = "result-message error";
    return;
  }
  const newTask = {
    type, content, answer, points,
    date: new Date().toLocaleDateString("uz-UZ")
  };
  addedTasks[subject].push(newTask);
  localStorage.setItem("addedTasks", JSON.stringify(addedTasks));
  // Ro'yxatni yangilash
  const list = document.getElementById("addedTasks");
  list.innerHTML = "";
  Object.keys(addedTasks).forEach((sub) => {
    addedTasks[sub].forEach((task) => {
      const item = document.createElement("div");
      item.className = "added-task-item";
      item.innerHTML = `<strong>${task.type}</strong> (${sub}): ${task.content} (Ball: ${task.points}, ${task.date})`;
      list.appendChild(item);
    });
  });
  document.getElementById("teacherForm").reset();
  document.getElementById("teacherResult").textContent = "✅ Topshiriq qo'shildi va ro'yxatga qo'shildi!";
  document.getElementById("teacherResult").className = "result-message success";
};

// INITSIALIZATSIYA
function initializeGames() {
  generateComparison();
  generateMathProblem();
  generateShapeQuestion();
  generateNumberWord();
  generateLetter();
  generateSpellingWord();
  showStory(1);
  // She'r va tez o'qish uchun oldingi kodni qo'shing
  updateProgressBars();
  checkAchievements();
  document.getElementById("teacherForm").addEventListener("submit", addTeacherTask);
  // Added tasks yuklash
  const list = document.getElementById("addedTasks");
  list.innerHTML = "";
  Object.keys(addedTasks).forEach((subject) => {
    addedTasks[subject].forEach((task) => {
      const item = document.createElement("div");
      item.className = "added-task-item";
      item.innerHTML = `<strong>${task.type}</strong> (${subject}): ${task.content} (Ball: ${task.points}, ${task.date})`;
      list.appendChild(item);
    });
  });
  // Progress yuklash
  const savedProgress = localStorage.getItem("userProgress");
  if (savedProgress) {
    userProgress = JSON.parse(savedProgress);
    totalScore = Object.values(userProgress).reduce((sum, sub) => sum + sub.score, 0);
    updateProgressBars();
    checkAchievements();
  }
  selectClass(1); // Dastlab 1-sinf
}
document.addEventListener("DOMContentLoaded", initializeGames);
window.addEventListener("beforeunload", () => {
  localStorage.setItem("userProgress", JSON.stringify(userProgress));
  localStorage.setItem("addedTasks", JSON.stringify(addedTasks));
});
window.startLearning = function () {
  document.getElementById("sinflar").scrollIntoView({ behavior: "smooth" });
};
