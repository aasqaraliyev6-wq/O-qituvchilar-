// GLOBAL (JSON.minify uchun simple compression)
let totalScore = 0;
let userProgress = JSON.parse(localStorage.getItem("userProgress") || "{}") || { matematika: { score: 0, completed: 0 }, onaTili: { score: 0, completed: 0 }, oqish: { score: 0, completed: 0 }, fizika: { score: 0, completed: 0 } };
let addedTasks = JSON.parse(localStorage.getItem("addedTasks") || "{}") || { matematika: [], onaTili: [], oqish: [], fizika: [] };
let currentClass = 1;
let timers = {};

// YANGI: Lazy load o'yinlar
function lazyLoadGame(gameId) {
  const game = document.getElementById(gameId);
  if (game && game.style.display === 'none') {
    game.style.display = 'block';
    requestAnimationFrame(() => game.classList.add('fade-in')); // Smooth yuklanish
  }
}

// YANGI: Sinf yuklash (4 ta topshiriq)
window.loadClassGames = function(sinf) {
  try {
    const details = document.getElementById("classDetails");
    let tasksHTML = `<h3>${sinf}-sinf Topshiriqlari</h3><ul>`;
    const tasks = getClassTasks(sinf); // Funksiya quyida
    tasks.forEach(task => tasksHTML += `<li>${task} <button class="mini-btn" onclick="completeTask('${task}')">Bajarish</button></li>`);
    tasksHTML += '</ul>';
    details.innerHTML = tasksHTML;
    details.style.display = 'block';
    details.scrollIntoView({ behavior: 'smooth' });
    if (sinf >= 5) lazyLoadGame('fractionGame');
    if (sinf >= 7) lazyLoadGame('algebraGame');
    if (sinf >= 9) lazyLoadGame('functionGame');
    if (sinf >= 10) lazyLoadGame('statsGame');
    if (sinf >= 4) lazyLoadGame('essayGame');
    if (sinf >= 6) lazyLoadGame('poetryQuiz');
  } catch (e) {
    console.warn("Sinf yuklash xatosi:", e); // Error handling
  }
};

function getClassTasks(sinf) {
  const tasks = {
    1: ['Sonlarni sanash', 'Alifboni o\'rganish', 'Oddiy hikoya o\'qish', 'Rasm chizish'],
    7: ['Algebra tenglamalari', 'Adabiyot tahlili', 'Jurnalistika asoslari', 'Kuch formulasi'],
    11: ['Analiz derivativlari', 'Tanqidiy esse', 'Iqtisodiy modelllar', 'Mexanika qonunlari']
    // Boshqa sinflar uchun qo'shing
  };
  return tasks[sinf] || ['Umumiy topshiriq 1', 'Umumiy topshiriq 2', 'Umumiy topshiriq 3', 'Umumiy topshiriq 4'];
}

window.completeTask = function(task) {
  addScore("matematika", 10, null);
  alert(`${task} bajarildi! +10 ball`);
};

// YANGI: Statistik va Funksiya o'yinlari
window.checkStats = function() {
  try {
    const user = parseInt(document.getElementById("statsAnswer").value) || 0;
    if (user === 7) { // O'rtacha
      document.getElementById("statsResult").textContent = "✅ To'g'ri!";
      document.getElementById("statsResult").className = "result-message success";
      addScore("matematika", 18, "mathScore7");
    } else {
      document.getElementById("statsResult").textContent = "❌ Noto'g'ri. O'rtacha: 7";
      document.getElementById("statsResult").className = "result-message error";
    }
    setTimeout(() => { document.getElementById("statsAnswer").value = ""; document.getElementById("statsResult").textContent = ""; }, 2000);
  } catch (e) { console.warn(e); }
};

window.checkFunction = function() {
  try {
    const user = parseInt(document.getElementById("functionAnswer").value) || 0;
    if (user === 7) { // 2*3 +1 =7
      document.getElementById("functionResult").textContent = "✅ To'g'ri!";
      document.getElementById("functionResult").className = "result-message success";
      addScore("matematika", 20, "mathScore8");
    } else {
      document.getElementById("functionResult").textContent = "❌ Noto'g'ri. f(3)=7";
      document.getElementById("functionResult").className = "result-message error";
    }
    setTimeout(() => { document.getElementById("functionAnswer").value = ""; document.getElementById("functionResult").textContent = ""; }, 2000);
  } catch (e) { console.warn(e); }
};

// YANGI: Ona tili yangi o'yinlari
window.checkEssay = function() {
  const text = document.getElementById("essayInput").value.trim();
  if (text.length > 50) { // Oddiy check
    document.getElementById("essayResult").textContent = "✅ Yaxshi insho!";
    addScore("onaTili", 25, "langScore5");
  } else {
    document.getElementById("essayResult").textContent = "❌ Ko'proq yozing!";
  }
  // ...
};

window.checkPoetry = function() {
  const user = document.getElementById("poetryAnswer").value.toLowerCase().trim();
  if (user.includes("gullar")) {
    document.getElementById("poetryResult").textContent = "✅ To'g'ri!";
    addScore("onaTili", 15, "langScore6");
  } else {
    document.getElementById("poetryResult").textContent = "❌ Noto'g'ri. Gullar ochdi.";
  }
  // ...
};

// YANGI: Fizika o'yinlari
window.checkForce = function() {
  const user = parseInt(document.getElementById("forceAnswer").value) || 0;
  if (user === 50) {
    document.getElementById("forceResult").textContent = "✅ To'g'ri! 50N";
    addScore("fizika", 20, "physScore1");
  } else {
    document.getElementById("forceResult").textContent = "❌ Noto'g'ri. 50N";
  }
  // ...
};

window.checkEnergy = function() {
  const select = document.getElementById("energySelect").value;
  if (select === "1/2 mv^2") {
    document.getElementById("energyResult").textContent = "✅ To'g'ri! Kinematik energiya.";
    addScore("fizika", 18, "physScore2");
  } else {
    document.getElementById("energyResult").textContent = "❌ Noto'g'ri. 1/2 mv^2";
  }
  // ...
};

// Oldingi funksiyalar (try-catch bilan)
window.addScore = function(subject, points, elementId) {
  try {
    userProgress[subject].score += points;
    userProgress[subject].completed++;
    totalScore += points;
    // ... (yangilash)
    localStorage.setItem("userProgress", JSON.stringify(userProgress));
  } catch (e) { console.warn("Score xatosi:", e); }
};

// INITSIALIZATSIYA (window.onload bilan)
window.onload = function() {
  try {
    initializeGames();
  } catch (e) {
    console.error("Yuklanish xatosi:", e);
    document.body.innerHTML += '<div style="color:red;">Xato: Sahifani qayta yuklang.</div>';
  }
};

function initializeGames() {
  // Barcha generate'lar va yuklashlar
  // ...
  selectClass(1);
}

// Oldingi barcha funksiyalar (to'liq, error handling bilan)
