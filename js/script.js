/******************************************************
 * JavaScript Assignment (Parts 1–4)
 * Everything is clearly labeled and organized below.
 ******************************************************/

/* ============================
   PART 1 — VARIABLES & CONDITIONALS
   - Variable declarations (const, let, var)
   - If/else, switch, and ternary examples
============================ */

// Declarations
const appName = "JavaScript Assignment Demo";
let currentTheme = "dark";  // will toggle to light when user clicks
var user = { name: "Guest", visits: 1 }; // var used for legacy style example

// Basic conditional: time-based greeting
const hour = new Date().getHours();
let greetingText;

if (hour < 12) {
  greetingText = "Good morning";
} else if (hour < 18) {
  greetingText = "Good afternoon";
} else {
  greetingText = "Good evening";
}

// Ternary operator to suggest a theme (purely demonstrative)
const suggestedTheme = hour >= 7 && hour <= 18 ? "light" : "dark";

// Switch example: categorize hour into a part of day
let partOfDay;
switch (true) {
  case hour < 6:
    partOfDay = "early hours";
    break;
  case hour < 12:
    partOfDay = "morning";
    break;
  case hour < 18:
    partOfDay = "afternoon";
    break;
  default:
    partOfDay = "evening";
}

/* ============================
   PART 2 — CUSTOM FUNCTIONS (At least 2)
   We'll define multiple for clarity and reuse.
============================ */

/**
 * parseScores: string -> number[]
 * Converts "80, 92, 75" into [80, 92, 75]
 */
function parseScores(input) {
  if (!input) return [];
  return input
    .split(",")
    .map(s => Number(s.trim()))
    .filter(n => Number.isFinite(n));
}

/**
 * calculateAverage: number[] -> number
 * Uses a loop (for...of) — counts total and returns average
 */
function calculateAverage(nums) {
  if (nums.length === 0) return 0;
  let total = 0;
  for (const n of nums) {          // LOOP EXAMPLE #1 (for...of)
    total += n;
  }
  return total / nums.length;
}

/**
 * getLetterGrade: number -> string
 * Returns a letter grade using conditionals
 */
function getLetterGrade(avg) {
  if (avg >= 90) return "A";
  if (avg >= 80) return "B";
  if (avg >= 70) return "C";
  if (avg >= 60) return "D";
  return "F";
}

/**
 * countDown: number -> number[]
 * Returns an array counting down to 1 using a while loop
 */
function countDown(n) {
  const out = [];
  while (n > 0) {                  // LOOP EXAMPLE #2 (while)
    out.push(n);
    n--;
  }
  return out;
}

/* ============================
   PART 3 — LOOPS (At least 2)
   We'll also demonstrate forEach here.
============================ */
function loopDemos() {
  const lines = [];

  // for...of shown in calculateAverage()

  // while loop shown in countDown()

  // forEach loop to compute squares of [1..5]
  const nums = [1, 2, 3, 4, 5];
  const squares = [];
  nums.forEach(n => squares.push(n * n)); // LOOP EXAMPLE #3 (forEach)

  lines.push(`Squares of 1..5 using forEach: ${squares.join(", ")}`);
  lines.push(`Countdown from 5 using while: ${countDown(5).join(" → ")}`);

  return lines.join("<br>");
}

/* ============================
   PART 4 — DOM INTERACTIONS (At least 3)
   We'll:
   1) Change textContent/innerHTML
   2) Create and append elements
   3) Add event listeners
   4) Toggle classes for theme
============================ */

// Select elements
const appTitleEl   = document.getElementById("app-title");
const themeBtn     = document.getElementById("theme-toggle");
const greetEl      = document.getElementById("greeting");

const scoreInput   = document.getElementById("score-input");
const analyzeBtn   = document.getElementById("analyze-btn");
const scoreResult  = document.getElementById("score-result");

const taskInput    = document.getElementById("task-input");
const addTaskBtn   = document.getElementById("add-task-btn");
const taskList     = document.getElementById("task-list");

const runLoopsBtn  = document.getElementById("run-loops-btn");
const loopsOutput  = document.getElementById("loops-output");

// 1) Update text content on load
appTitleEl.textContent = appName;
greetEl.textContent = `${greetingText}, ${user.name}! It’s the ${partOfDay}. Suggested theme: ${suggestedTheme}.`;

// 2) Event listener + DOM manipulation: theme toggle
themeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("light"); // classList toggle
  currentTheme = document.documentElement.classList.contains("light") ? "light" : "dark";
  themeBtn.textContent = currentTheme === "light" ? "🌙 Toggle Theme" : "🌞 Toggle Theme";
});

// 3) Event listener + DOM manipulation: analyze scores
analyzeBtn.addEventListener("click", () => {
  const scores = parseScores(scoreInput.value);
  const avg = calculateAverage(scores);
  const grade = getLetterGrade(avg);

  // Build result with badges
  const countBadge = `<span class="badge ${scores.length ? 'ok' : 'err'}">${scores.length} scores</span>`;
  const gradeClass = grade === "A" || grade === "B" ? "ok" : (grade === "C" ? "warn" : "err");
  const gradeBadge = `<span class="badge ${gradeClass}">Grade: ${grade}</span>`;

  scoreResult.innerHTML = `
    Average: <strong>${avg.toFixed(2)}</strong> ${countBadge} ${gradeBadge}
    <br>
    Original: [ ${scores.join(", ")} ]
  `;
});

// 4) Event listener + DOM manipulation: add task
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

/**
 * addTask — DOM creation, appending, and event handling
 */
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  // Create elements
  const li = document.createElement("li");
  const span = document.createElement("span");
  const removeBtn = document.createElement("button");

  // Set content
  span.textContent = text;
  removeBtn.textContent = "Remove";

  // Interactions
  span.addEventListener("click", () => {
    // Toggle done state (simple visual)
    span.style.opacity = span.style.opacity === "0.5" ? "1" : "0.5";
    span.style.textDecoration = span.style.textDecoration === "line-through" ? "none" : "line-through";
  });

  removeBtn.addEventListener("click", () => {
    li.remove(); // DOM removal
  });

  // Assemble and attach
  li.appendChild(span);
  li.appendChild(removeBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  taskInput.focus();
}

// 5) Event listener + DOM manipulation: run loop demos
runLoopsBtn.addEventListener("click", () => {
  loopsOutput.innerHTML = loopDemos();
});
