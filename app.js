const questions = data.questions;
console.log(questions);
const board = document.getElementById("board");

const bilder = [
  "inget.png",
  "läsa.jpg",
  "mobil.jpg",
  "netflix.jpg",
  "sova.jpg",
  "städa.jpg",
  "träna.jpg",
  "umgänge.jpg",
];
const citatArr = [
  "Man förlorar mer tid när man försöker vinna tid. ",
  "Inget är som väntans tider. ",
  "Om du vill ha ont om tid ska du ingenting göra.",
  "Om du inte kan styra din tid kan du inte styra något alls.",
  "Livet är det som pågår medan du väntar på det som aldrig händer. ",
  "Tiden går fort när man har roligt.",
  "“Jag ska bara…”",
  "Skalman har en fantastisk uppfinning i sin mat- och sovklocka",
];

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
    <div class="category-card" onclick="createOverlay('${q}', ${index})">
        <p class="card-text">${index + 1}</p>
    </div>
    `;

  return card;
}

function createOverlay(questionText, index = "0") {
  let button = questionText == "Rendez-vous" && index != 3 ? true : false;
  let overlay = document.createElement("div");
  overlay.setAttribute("id", "overlay-background");

  overlay.innerHTML = `
    <div id="overlay">
    <div class="close"></div>
        <p class="questionText">${questionText}</p>
        ${button ? "<button id='RV'>Click</button>" : ""}
    </div>
    `;

  if (questionText == "bilder") {
    let bilderHTML = "";
    bilder.forEach((bild) => {
      bilderHTML += "<div class='image' style='background-image:url(images/" + bild + ")'></div>";
    });
    console.log("test");
    overlay.innerHTML = `
    <div id="overlay">
    <div class="close"></div>
        <div id='images'>
        ${bilderHTML}
        </div>
    </div>
    `;
  }
  if (questionText == "citat") {
    let citatHTML = "";
    citatArr.forEach((citat) => {
      citatHTML += "<p class='citat' >" + citat + "</p>";
    });
    overlay.innerHTML = `
    <div id="overlay">
    <div class="close"></div>
        <div id='citat'>
        ${citatHTML}
        </div>
    </div>
    `;
  }
  document.body.append(overlay);
  document.querySelectorAll(".close").forEach((element) => {
    element.addEventListener("click", () => {
      document.querySelectorAll("#overlay-background").forEach((overlayDiv) => {
        overlayDiv.remove();
      });
    });
  });
  document.getElementById("RV").addEventListener("click", () => {
    if (index == 5) {
      createOverlay("bilder");
    }
    if (index == 4) {
      createOverlay("citat");
    }
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
