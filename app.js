const data = {
  questions: [
    {
      metronomen: [
        {
          1: {
            q: "Hellre fort (och ev med några missar/fel) eller långsamt och noggrant? ",
            checked: false,
          },
        },
        {
          2: {
            q: "Morgon eller kväll - om du ska komma in i flow och få mycket gjort? ",
            checked: false,
          },
        },
        {
          3: {
            q: "Att göra-listor eller ta dagen som den kommer?",
            checked: false,
          },
        },
        {
          4: {
            q: "Rendez-vous",
            checked: false,
          },
        },
        {
          5: {
            q: "När du hamnar under tidspress - brukar du reagera med att känna dig handlingsförlamad eller bli handlingskraftig och lösningsfokuserad? ",
            checked: false,
          },
        },
        {
          6: {
            q: "Om du hamnar i en situation där du behöver VÄNTA på något - sitter du då och bara lugnt väntar eller passar du på att göra något annat?",
            checked: false,
          },
        },
        {
          7: {
            q: "Något som du behöver göra dyker upp - tar du tag i det omedelbart eller skjuter du upp? ",
            checked: false,
          },
        },
      ],
    },
    {
      timglaset: [
        {
          1: {
            q: "Ha bestämda arbetstider eller arbeta mer fritt?",
            checked: false,
          },
        },
        {
          2: {
            q: "Egentid eller tid med andra? ",
            checked: false,
          },
        },
        {
          3: {
            q: "Har du gott om tid eller ont om tid? ",
            checked: false,
          },
        },
        {
          4: {
            q: "Är mest värdefull tid för dig att göra eller att inte göra.",
            checked: false,
          },
        },
        {
          5: {
            q: "Om du skjuter upp något som du borde göra klart - beror det främst på viljan att leverera med perfektion eller på känslan av ointresse? ",
            checked: false,
          },
        },
        {
          6: {
            q: "Rendez-vous",
            checked: false,
          },
        },
        {
          7: {
            q: "När får du mest gjort - när du har som mest att göra eller när du inte har så mycket att göra? ",
            checked: false,
          },
        },
      ],
    },
    {
      urverket: [
        {
          1: {
            q: "Vad påverkar dig mest; historien eller framtiden?",
            checked: false,
          },
        },
        {
          2: {
            q: "Är nu viktigare än då eller sen? ",
            checked: false,
          },
        },
        {
          3: {
            q: "Får vi tid eller tar vi oss tid?",
            checked: false,
          },
        },
        {
          4: {
            q: "Vilken tidsepok skulle du vilja leva i - om du fick möjlighet via en tidsresa?",
            checked: false,
          },
        },
        {
          5: {
            q: "Rendez-vous",
            checked: false,
          },
        },
        {
          6: {
            q: "Om jobb inte var kopplat till pengar hur mycket skulle du jobba då?",
            checked: false,
          },
        },
        {
          7: {
            q: "Om en vecka innehåller 112 vakentimmar och du tänker dig dessa timmar som 112 olika kort som kan delas upp i högar (utifrån vad du ägnar dig åt under dessa timmar). Vilken hög vill du då ska vara störst?",
            checked: false,
          },
        },
      ],
    },
  ],
};

const questions = data.questions;
let arrayOfSeenQ = [];
const board = document.getElementById("board");

if (!localStorage.getItem("test")) {
  localStorage.setItem("seenQ", []);
}

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

document.getElementById("reset").addEventListener("click", () => {
  localStorage.setItem("seenQ", []);
  window.location.href = window.location.href;
});

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

function boxClicked(event, q, index) {
  event = event || window.event;
  event.className += " seen";
  arrayOfSeenQ.push(q);
  localStorage.setItem("seenQ", arrayOfSeenQ);
}

function isCardSeen(question) {
  let seen = false;
  let seenQuestionsLS = localStorage.getItem("seenQ").split(",");

  if (seenQuestionsLS.includes(question)) {
    seen = true;
  }
  return seen;
}

function createCard(question, index) {
  let q = question[index + 1].q;
  let isSeen = isCardSeen(q) ? "seen" : "";
  console.log(isSeen);
  let card = `
    <div class="category-card ${isSeen}" onclick="boxClicked(this, '${q}, ${index}'); createOverlay('${q}', ${index})">
        <p class="card-text">${index + 1}</p>
    </div>
    `;

  return card;
}
function boldString(str, substr) {
  var strRegExp = new RegExp(substr, "g");
  return str.replace(strRegExp, "<b><i>" + substr + "</i></b>");
}
function createOverlay(questionText, index = "0") {
  let button = questionText == "Rendez-vous" && index != 3 ? true : false;
  let overlay = document.createElement("div");
  overlay.setAttribute("id", "overlay-background");
  if (questionText.includes("eller")) {
    questionText = boldString(questionText, "eller");
  }

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
      bilderHTML +=
        "<div class='image center' style='background-image:url(images/" +
        bild +
        ")'>" +
        capitalizeFirstLetter(bild.split(".")[0]) +
        "</div>";
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
