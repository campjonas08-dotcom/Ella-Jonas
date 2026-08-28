(function () {
  const STORAGE_KEY = "whosMoreLikely.scores";

  const els = {
    questionText: document.getElementById("questionText"),
    questionCount: document.getElementById("questionCount"),
    progressBar: document.getElementById("progressBar"),
    answers: document.getElementById("answers"),
    skipBtn: document.getElementById("skipBtn"),
    nextBtn: document.getElementById("nextBtn"),
    resetBtn: document.getElementById("resetBtn"),
    nameA: document.getElementById("nameA"),
    nameB: document.getElementById("nameB"),
    scoreLabelA: document.getElementById("scoreLabelA"),
    scoreLabelB: document.getElementById("scoreLabelB"),
    scoreA: document.getElementById("scoreA"),
    scoreB: document.getElementById("scoreB"),
    scoreBoth: document.getElementById("scoreBoth"),
    scoreNeither: document.getElementById("scoreNeither"),
  };

  els.nameA.textContent = NAMES.a;
  els.nameB.textContent = NAMES.b;
  els.scoreLabelA.textContent = NAMES.a;
  els.scoreLabelB.textContent = NAMES.b;

  let scores = loadScores();
  let deck = shuffle([...QUESTIONS]);
  let deckIndex = 0;
  let round = 1;
  let answered = false;

  renderScores();
  showQuestion();

  els.answers.addEventListener("click", (e) => {
    const btn = e.target.closest(".answer-btn");
    if (!btn || answered) return;
    selectAnswer(btn.dataset.answer, btn);
  });

  els.nextBtn.addEventListener("click", nextQuestion);
  els.skipBtn.addEventListener("click", nextQuestion);
  els.resetBtn.addEventListener("click", () => {
    if (!confirm("Reset the scoreboard back to zero?")) return;
    scores = { a: 0, b: 0, both: 0, neither: 0 };
    saveScores();
    renderScores();
  });

  document.addEventListener("keydown", (e) => {
    if (answered) {
      if (e.key === "Enter" || e.key === " ") nextQuestion();
      return;
    }
    const map = { 1: "a", 2: "b", 3: "both", 4: "neither" };
    if (map[e.key]) {
      const btn = els.answers.querySelector(`[data-answer="${map[e.key]}"]`);
      if (btn) selectAnswer(map[e.key], btn);
    }
  });

  function selectAnswer(key, btn) {
    answered = true;
    scores[key] = (scores[key] || 0) + 1;
    saveScores();
    renderScores();

    els.answers.querySelectorAll(".answer-btn").forEach((b) => {
      b.disabled = true;
      if (b === btn) b.classList.add("selected");
    });
    els.nextBtn.disabled = false;
  }

  function nextQuestion() {
    deckIndex++;
    if (deckIndex >= deck.length) {
      deck = shuffle([...QUESTIONS]);
      deckIndex = 0;
    }
    round++;
    showQuestion();
  }

  function showQuestion() {
    answered = false;
    els.nextBtn.disabled = true;
    els.answers.querySelectorAll(".answer-btn").forEach((b) => {
      b.disabled = false;
      b.classList.remove("selected");
    });

    const q = deck[deckIndex] || "…";
    els.questionText.textContent = q + "?";
    els.questionCount.textContent = `Question ${round}`;

    const progress = ((deckIndex + 1) / deck.length) * 100;
    els.progressBar.style.width = progress + "%";
  }

  function renderScores() {
    els.scoreA.textContent = scores.a || 0;
    els.scoreB.textContent = scores.b || 0;
    els.scoreBoth.textContent = scores.both || 0;
    els.scoreNeither.textContent = scores.neither || 0;
  }

  function loadScores() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      /* ignore corrupt storage */
    }
    return { a: 0, b: 0, both: 0, neither: 0 };
  }

  function saveScores() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch (e) {
      /* storage unavailable, scores just won't persist */
    }
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
})();
