const allCircles = document.querySelectorAll(".circle");
const allBalls = document.querySelectorAll(".circle .ball");
const arrows = document.getElementById("arrows");
const fillBar = document.getElementById("scaleFill");
const nextStepBtn = document.getElementById("nextStepBtn");

let indexes = [];
let step = 0;
let totalSteps = 0;

function startNewPrediction() {
  const r = Math.random();
  totalSteps = r < 0.1 ? 5 : r < 0.3 ? 4 : r < 0.6 ? 3 : r < 0.85 ? 2 : 1;
  indexes = [0, 1, 2, 3, 4]
    .sort(() => Math.random() - 0.5)
    .slice(0, totalSteps);
  step = 0;

  fillBar.style.width = "0%";
  arrows.style.display = "none";

  // Сброс стилей и номеров
  allBalls.forEach((ball) => ball.classList.remove("pulse", "highlight"));
  allCircles.forEach((circle) => {
    circle.classList.remove("pulse");
    const number = circle.querySelector(".step-number");
    if (number) number.remove();
  });

  // Сброс кнопки
  nextStepBtn.disabled = false;
  nextStepBtn.textContent = "▶ Получить сигнал";
  nextStepBtn.classList.remove("btn-new");
}

function resetGame() {
  allBalls.forEach((ball) => ball.classList.remove("pulse", "highlight"));
  allCircles.forEach((c) => c.classList.remove("pulse"));
  arrows.style.display = "none";
  fillBar.style.width = "0%";
  startNewPrediction();
}

function nextStep() {
  if (step >= totalSteps) {
    startNewPrediction(); // 👍 теперь снова запускается
    return;
  }

  const i = indexes[step];
  const circle = allCircles[i];
  const ball = allBalls[i];

  arrows.style.top = circle.offsetTop - 10 + "px";
  arrows.style.left = circle.offsetLeft - 10 + "px";
  arrows.style.display = "block";

  circle.classList.add("pulse");
  ball.classList.add("pulse", "highlight");

  const number = document.createElement("div");
  number.className = "step-number";
  number.textContent = step + 1;
  circle.appendChild(number);
  number.style.display = "flex";

  arrows.querySelector(".arrow-top").classList.add("pulse-top");
  arrows.querySelector(".arrow-bottom").classList.add("pulse-bottom");
  arrows.querySelector(".arrow-left").classList.add("pulse-left");
  arrows.querySelector(".arrow-right").classList.add("pulse-right");

  fillBar.style.width = ((step + 1) / totalSteps) * 100 + "%";

  step++;

  if (step >= totalSteps) {
    nextStepBtn.textContent = "Новый прогноз";
    nextStepBtn.classList.add("btn-new");
  }
}

// Стартуем
startNewPrediction();
