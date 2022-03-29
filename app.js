const questions = data.questions;
console.log(questions);
const board = document.getElementById("board");

function createColumn(category) {
  let questionArray = category[Object.keys(category)];
  let title = capitalizeFirstLetter(Object.keys(category)[0]);
  let column = document.createElement("div");
  column.className = "column";
  column.innerHTML = `
        <div id="category-title" class="category-card">
            <h3 id="category-title-text">${title}</h3>
        </div>
    `;

  questionArray.forEach((questionText, index) => {
    column.innerHTML += createCard(questionText, index);
  });

  //return html
  return column;
}

function createCard(question, index) {
  console.log(question);
  let q = question[index + 1].q;
  let card = `
    <div class="category-card" onclick="createOverlay('${q}')">
        <p class="card-text">${index + 1}</p>
    </div>
    `;

  return card;
}

function createOverlay(questionText) {
  let overlay = document.createElement("div");
  overlay.setAttribute("id", "overlay-background");
  overlay.innerHTML = `
    <div id="overlay">
    <div id="close" onclick="removeOverlay()"></div>
        <p class="questionText">${questionText}</p>
    </div>
    `;
  document.body.append(overlay);
  document.getElementById("close").addEventListener("click", () => {
    overlay.remove();
  });
}
function createRV() {}
function test(string) {
  console.log(string);
}

questions.forEach((category) => {
  let column = createColumn(category);
  board.append(column);
});

function capitalizeFirstLetter(input = "") {
  return input.charAt(0).toUpperCase() + input.slice(1);
}
