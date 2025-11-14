// GLOBAL O'ZGARUVCHILAR (oldingi + yangi)
let totalScore = 0;
let userProgress = { /* Oldingi */ };
let addedTasks = JSON.parse(localStorage.getItem("addedTasks")) || { /* Oldingi */ };
let currentClass = 1; // Yangi: Joriy sinf

// YANGI: Sinf tanlash
window.selectClass = function(sinf) {
  currentClass = sinf;
  const details = document.getElementById('classDetails');
  const fanlar = getClassSubjects(sinf); // Funksiya quyida
  details.innerHTML = `<h3>${sinf}-sinf Fanlari</h3><ul>${fanlar.map(f => `<li>${f}</li>`).join('')}</ul>`;
  details.style.display = 'block';
  details.scrollIntoView({ behavior: 'smooth' });
};

function getClassSubjects(sinf) {
  const subjects = {
    1: ['Matematika: Sonlar va oddiy amallar', 'Ona tili: Alifbo', 'O\'qish: Oddiy hikoyalar'],
    2: ['Matematika: Qo\'shish/ayirish', 'Ona tili: So\'zlar', 'O\'qish: She\'rlar'],
    // ... 3-10 sinflar uchun o'xshash
    11: ['Matematika: Algebra va geometriya', 'Fizika: Mexanika', 'Kimyo: Organik birikmalar', 'Biologiya: Genetika', 'Tarix: O\'zbekiston mustaqilligi']
  };
  return subjects[sinf] || subjects[1];
}

// ONA TILI O'YINLARI TUZATILDI
let currentWord = "";
window.addLetter = function (letter) { // Tuzatildi: bosilganda qo'shiladi
  currentWord += letter;
  document.getElementById("builtWord").textContent = currentWord;
  // Animatsiya qo'shish
  document.getElementById("builtWord").style.animation = 'fadeInUp 0.3s';
};
window.clearWord = function () {
  currentWord = "";
  document.getElementById("builtWord").textContent = "";
  document.getElementById("wordResult").textContent = "";
};
window.checkWord = function () { // Oldingi kabi, lekin xabar ko'rsatish
  // ... (oldingi logika)
  const resultElement = document.getElementById("wordResult");
  // ... (to'g'ri/noto'g'ri)
  setTimeout(() => { clearWord(); }, 3000);
};

let currentSentence = "";
window.addToSentence = function (word) { // Tuzatildi: bosilganda qo'shiladi
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
window.checkSentence = function () { // Oldingi kabi
  // ... (logika)
};

// O'QITUVCHI PANELI TUZATILDI
window.addTeacherTask = function (e) {
  e.preventDefault();
  // ... (oldingi logika)
  // Ro'yxatni yangilash
  const list = document.getElementById("addedTasks");
  list.innerHTML = ""; // Tozalash
  Object.keys(addedTasks).forEach((subject) => {
    addedTasks[subject].forEach((task) => {
      const item = document.createElement("div");
      item.className = "added-task-item";
      item.innerHTML = `<strong>${task.type}</strong> (${subject}): ${task.content} (Ball: ${task.points}, ${task.date})`;
      list.appendChild(item);
    });
  });
  // Xabar
  document.getElementById("teacherResult").textContent = "✅ Topshiriq qo'shildi va ro'yxatga qo'shildi!";
  // ...
};

// Boshqa funksiyalar (oldingi kabi, lekin addScore da progress yangilanishi ta'minlandi)

// INITSIALIZATSIYA (yangilandi)
function initializeGames() {
  // ... (oldingi)
  selectClass(1); // Dastlab 1-sinf ko'rsatiladi
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
}
document.addEventListener("DOMContentLoaded", initializeGames);
// ...
