import { QUESTIONS, NAMES } from "./questions.js";
import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  doc,
  onSnapshot,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const PLAYER_KEY = "whosMoreLikely.player";
const EMPTY_SCORES = { a: 0, b: 0, both: 0, neither: 0, matches: 0, rounds: 0 };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const sessionRef = doc(db, "sessions", "shared");

const els = {
  playerPicker: document.getElementById("playerPicker"),
  pickA: document.getElementById("pickA"),
  pickB: document.getElementById("pickB"),
  playerIndicator: document.getElementById("playerIndicator"),
  currentPlayerName: document.getElementById("currentPlayerName"),
  switchPlayerBtn: document.getElementById("switchPlayerBtn"),

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
  matchStat: document.getElementById("matchStat"),

  waitingMsg: document.getElementById("waitingMsg"),
  waitingText: document.getElementById("waitingText"),
  revealBox: document.getElementById("revealBox"),
  revealA: document.getElementById("revealA"),
  revealB: document.getElementById("revealB"),
  matchBanner: document.getElementById("matchBanner"),
};

const EMOJI = { a: "🧑", b: "👩", both: "🤝", neither: "🚫" };

els.nameA.textContent = NAMES.a;
els.nameB.textContent = NAMES.b;
els.scoreLabelA.textContent = NAMES.a;
els.scoreLabelB.textContent = NAMES.b;
els.pickA.querySelector(".player-btn-name").textContent = NAMES.a;
els.pickB.querySelector(".player-btn-name").textContent = NAMES.b;

let myPlayer = localStorage.getItem(PLAYER_KEY);
let latestData = null;

if (myPlayer === "a" || myPlayer === "b") {
  startApp();
} else {
  showPlayerPicker();
}

els.pickA.addEventListener("click", () => choosePlayer("a"));
els.pickB.addEventListener("click", () => choosePlayer("b"));
els.switchPlayerBtn.addEventListener("click", showPlayerPicker);

function choosePlayer(key) {
  myPlayer = key;
  localStorage.setItem(PLAYER_KEY, key);
  els.playerPicker.classList.add("hidden");
  startApp();
}

function showPlayerPicker() {
  els.playerPicker.classList.remove("hidden");
}

let started = false;
function startApp() {
  updatePlayerIndicator();
  if (started) return;
  started = true;

  ensureSession()
    .then(() => {
      onSnapshot(
        sessionRef,
        (snap) => {
          if (!snap.exists()) return;
          latestData = snap.data();
          render(latestData);
        },
        (err) => showConnectionError(err)
      );
    })
    .catch((err) => showConnectionError(err));

  els.answers.addEventListener("click", (e) => {
    const btn = e.target.closest(".answer-btn");
    if (!btn || btn.disabled) return;
    submitAnswer(btn.dataset.answer);
  });

  els.nextBtn.addEventListener("click", advance);
  els.skipBtn.addEventListener("click", advance);
  els.resetBtn.addEventListener("click", resetScores);
}

function updatePlayerIndicator() {
  els.currentPlayerName.textContent = NAMES[myPlayer];
}

function showConnectionError(err) {
  console.error("Firestore error:", err);
  els.questionText.textContent = "Couldn't connect — check the Firestore database is set up.";
  els.questionCount.textContent = "Connection problem";
}

function shuffledDeck() {
  const deck = QUESTIONS.map((_, i) => i);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

async function ensureSession() {
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(sessionRef);
    if (!snap.exists()) {
      tx.set(sessionRef, {
        deck: shuffledDeck(),
        deckIndex: 0,
        answers: { a: null, b: null },
        resolved: false,
        scores: EMPTY_SCORES,
      });
    }
  });
}

async function submitAnswer(key) {
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(sessionRef);
    const data = snap.data();
    if (!data || data.resolved || data.answers[myPlayer] !== null) return;

    const answers = { ...data.answers, [myPlayer]: key };
    const bothAnswered = answers.a !== null && answers.b !== null;
    const update = { answers };

    if (bothAnswered) {
      const scores = { ...EMPTY_SCORES, ...data.scores };
      scores[answers.a] = (scores[answers.a] || 0) + 1;
      scores[answers.b] = (scores[answers.b] || 0) + 1;
      scores.rounds += 1;
      if (answers.a === answers.b) scores.matches += 1;
      update.resolved = true;
      update.scores = scores;
    }

    tx.update(sessionRef, update);
  });
}

async function advance() {
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(sessionRef);
    const data = snap.data();
    if (!data) return;

    let deck = data.deck;
    let deckIndex = data.deckIndex + 1;
    if (deckIndex >= deck.length) {
      deck = shuffledDeck();
      deckIndex = 0;
    }

    tx.update(sessionRef, {
      deck,
      deckIndex,
      answers: { a: null, b: null },
      resolved: false,
    });
  });
}

async function resetScores() {
  if (!confirm("Reset the scoreboard back to zero?")) return;
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(sessionRef);
    if (!snap.exists()) return;
    tx.update(sessionRef, { scores: EMPTY_SCORES });
  });
}

function render(data) {
  const q = QUESTIONS[data.deck[data.deckIndex]] || "…";
  els.questionText.textContent = q + "?";
  els.questionCount.textContent = `Question ${data.deckIndex + 1}`;
  els.progressBar.style.width = ((data.deckIndex + 1) / data.deck.length) * 100 + "%";

  const myAnswer = data.answers[myPlayer];
  const otherPlayer = myPlayer === "a" ? "b" : "a";
  const otherName = NAMES[otherPlayer];
  const iAnswered = myAnswer !== null;

  els.answers.querySelectorAll(".answer-btn").forEach((b) => {
    const key = b.dataset.answer;
    b.disabled = iAnswered;
    b.classList.toggle("selected", key === myAnswer);
  });

  els.nextBtn.disabled = !data.resolved;

  if (data.resolved) {
    els.waitingMsg.classList.add("hidden");
    els.revealBox.classList.remove("hidden");
    els.revealA.textContent = `${EMOJI[data.answers.a]} ${NAMES.a} picked: ${answerLabel(data.answers.a)}`;
    els.revealB.textContent = `${EMOJI[data.answers.b]} ${NAMES.b} picked: ${answerLabel(data.answers.b)}`;
    const matched = data.answers.a === data.answers.b;
    els.matchBanner.textContent = matched ? "🎉 You matched!" : "You picked differently";
    els.matchBanner.classList.toggle("match", matched);
    els.matchBanner.classList.toggle("no-match", !matched);
  } else {
    els.revealBox.classList.add("hidden");
    if (iAnswered) {
      els.waitingMsg.classList.remove("hidden");
      els.waitingText.textContent = `Waiting for ${otherName} to answer…`;
    } else {
      els.waitingMsg.classList.add("hidden");
    }
  }

  const scores = { ...EMPTY_SCORES, ...data.scores };
  els.scoreA.textContent = scores.a;
  els.scoreB.textContent = scores.b;
  els.scoreBoth.textContent = scores.both;
  els.scoreNeither.textContent = scores.neither;
  els.matchStat.textContent = `${scores.matches} / ${scores.rounds} matched`;
}

function answerLabel(key) {
  if (key === "a") return NAMES.a;
  if (key === "b") return NAMES.b;
  if (key === "both") return "Both";
  if (key === "neither") return "Neither";
  return "…";
}
