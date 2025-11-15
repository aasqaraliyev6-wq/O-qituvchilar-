// GLOBAL O'ZGARUVCHILAR (Optimallashtirilgan)
let totalScore = 0;
let userProgress = JSON.parse(localStorage.getItem("userProgress")) || {
  matematika: { score: 0, completed: 0 },
  onaTili: { score: 0, completed: 0 },
  oqish: { score: 0, completed: 0 }
};
let addedTasks = JSON.parse(localStorage.getItem("addedTasks")) || {
  matematika: [], onaTili: [], oqish: []
};
let currentClass = 1;
let timers = {}; // setTimeout'lar uchun clear qilish

// YANGI: Sinf o'yinlarini yuklash
window.loadClassGames = function(sinf) {
  try {
    const gamesDiv = document.getElementById("classDetails");
    let gamesHTML = `<h3>${sinf}-sinf Maxsus O'yinlari</h3>`;
    if (sinf === 1) {
      gamesHTML += '<p>Sonlar solishtirish o\'yini yuklandi!</p>';
    } else if (sinf === 5) {
      document.getElementById("fractionGame").style.display = "block";
      gamesHTML += '<p>Kasrlar o\'yini faollashtirildi!</p>';
    } else if (sinf === 7) {
      document.getElementById("algebraGame").style.display = "block";
      gamesHTML += '<p>Algebra tenglamalari o\'yini faollashtirildi!</p>';
    }
    // Boshqa sinflar uchun qo'shing
    gamesHTML += '<button class="check-btn" onclick="playClassQuiz(' + sinf + ')">Quiz o\'ynash</button>';
    gamesDiv.innerHTML += gamesHTML;
  } catch (e) {
    console.error("O'yin yuklash xatosi:", e);
  }
};

window.playClassQuiz = function(sinf) {
  alert(`${sinf}-sinf quiz boshlandi! To'g'ri javoblar uchun 20 ball.`);
  addScore("matematika", 20, null); // Umumiy ball
};

// YANGI: Kasrlar o'yini
let currentFraction = {};
window.generateFraction = function() {
  const frac1 = Math.floor(Math.random() * 5) + 1 + '/' + (Math.floor(Math.random() * 5) + 1);
  const frac2 = Math.floor(Math.random() * 5) + 1 + '/' + (Math.floor(Math.random() * 5) + 1);
  document.getElementById("fractionProblem").textContent = frac1 + " ? " + frac2;
  currentFraction = { frac1: eval(frac1), frac2: eval(frac2) };
};
window.checkFraction = function(op) {
  const { frac1, frac2 } = currentFraction;
  // ... (logika oldingi comparison kabi, addScore("matematika", 15, "mathScore5"))
  setTimeout(() => { generateFraction(); }, 2000);
};

// YANGI: Algebra o'yini
let currentAlgebra = {};
window.generateAlgebra = function() {
  const x = Math.floor(Math.random() * 10) + 1;
  const num = Math.floor(Math.random() * 10) + 1;
  document.getElementById("algebraEq").textContent = `x + ${num} = ${x + num}`;
  currentAlgebra = { x };
};
window.checkAlgebra = function() {
  const user = parseInt(document.getElementById("algebraAnswer").value) || 0;
  // ... (logika, addScore("matematika", 20, "mathScore6"))
  setTimeout(() => { generateAlgebra(); document.getElementById("algebraAnswer").value = ""; }, 3000);
};

// Oldingi funksiyalar (matematika, ona tili, o'qish – to'liq, lekin try-catch qo'shildi)
window.checkComparison = function(operator) {
  try {
    // ... (oldingi logika)
  } catch (e) {
    console.error("Comparison xatosi:", e);
    document.getElementById("compResult").textContent = "Xato yuz berdi, qayta urinib ko'ring.";
  }
};
// Boshqa funksiyalarga ham try-catch qo'shing

// addScore (Optimallashtirilgan – debouncing)
let scoreTimeout;
window.addScore = function(subject, points, elementId) {
  clearTimeout(scoreTimeout);
  scoreTimeout = setTimeout(() => {
    // ... (oldingi logika)
    localStorage.setItem("userProgress", JSON.stringify(userProgress)); // Har safar saqlash
  }, 500); // Debounce 500ms
};

// O'qituvchi (Optimallashtirilgan – validation)
window.addTeacherTask = function(e) {
  e.preventDefault();
  try {
    // ... (oldingi, lekin if (!type || !content) return; yaxshilandi)
    // Ro'yxat yangilash (oldingi kabi)
  } catch (e) {
    document.getElementById("teacherResult").textContent = "Xato: " + e.message;
  }
};

// INITSIALIZATSIYA (Kengaytirilgan)
function initializeGames() {
  try {
    // Barcha generate'lar
    generateComparison();
    generateMathProblem();
    generateShapeQuestion();
    generateNumberWord();
    generateLetter();
    generateSpellingWord();
    generateFraction(); // Yangi
    generateAlgebra(); // Yangi
    showStory(1);
    // ...
    updateProgressBars();
    checkAchievements();
    document.getElementById("teacherForm").addEventListener("submit", addTeacherTask);
    // Added tasks va progress yuklash (oldingi kabi)
    selectClass(1);
  } catch (e) {
    console.error("Initsializatsiya xatosi:", e);
    alert("Sahifa yuklanishida xato yuz berdi. Qayta yuklang.");
  }
}
document.addEventListener("DOMContentLoaded", initializeGames);
window.addEventListener("beforeunload", () => {
  localStorage.setItem("userProgress", JSON.stringify(userProgress));
  localStorage.setItem("addedTasks", JSON.stringify(addedTasks));
  // Timers tozalash
  Object.values(timers).forEach(clearTimeout);
});
window.startLearning = function() {
  document.getElementById("sinflar").scrollIntoView({ behavior: "smooth" });
};
