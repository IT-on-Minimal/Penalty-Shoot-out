function startPrediction() {
  const allCircles = document.querySelectorAll(".circle");
  const allBalls = document.querySelectorAll(".circle .ball");
  const fillBar = document.getElementById("scaleFill");
  const arrows = document.getElementById("arrows");

  // Сброс пульсации кругов и мяча
  allCircles.forEach((c) => c.classList.remove("pulse"));
  allBalls.forEach((b) => b.classList.remove("pulse"));
  fillBar.style.width = "0%";

  // Вероятность прогноза
  let r = Math.random();
  let count = r < 0.1 ? 5 : r < 0.3 ? 4 : r < 0.6 ? 3 : r < 0.85 ? 2 : 1;

  // Рандомные индексы кругов
  const indexes = [0, 1, 2, 3, 4]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  let step = 0;

  // Всегда включаем стрелки и добавляем пульсацию 1 раз (не удаляем больше)
  arrows.style.display = "block";
  arrows.querySelector(".arrow-top").classList.add("pulse-top");
  arrows.querySelector(".arrow-bottom").classList.add("pulse-bottom");
  arrows.querySelector(".arrow-left").classList.add("pulse-left");
  arrows.querySelector(".arrow-right").classList.add("pulse-right");

  function next() {
    if (step >= count) {
      arrows.style.display = "none";
      return;
    }

    const i = indexes[step];
    const circle = allCircles[i];
    const ball = allBalls[i];

    // Центрируем стрелки относительно круга
    arrows.style.top = circle.offsetTop - 10 + "px";
    arrows.style.left = circle.offsetLeft - 10 + "px";

    // Пульсация круга и мяча
    circle.classList.add("pulse");
    ball.classList.add("pulse");

    // Обновление шкалы
    fillBar.style.width = (step + 1) * 20 + "%";

    step++;
    setTimeout(next, 2000);
  }

  next();
}
