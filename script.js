const birthdayPlan = {
  celebrationLength: "",
  dates: "",
  restaurant: "",
  activity: "",
  scientistActivity: "",
  gift: "",
  notes: ""
};

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", function () {
  showCelebrationLengthScreen();
});

function showCelebrationLengthScreen() {
  document.body.innerHTML = `
    <main class="welcome-screen">
      <div class="birthday-card">

        <p class="small-text">Birthday Mission: Step 1</p>

        <h1>How Much Birthday Trouble Are We Getting Into? 😏🎉</h1>

        <p class="message">
          Pick how you want to celebrate your big 35.
        </p>

        <button class="choice-button" data-choice="One-Day Birthday Adventure">
          🎂 One-Day Birthday Adventure
        </button>

        <button class="choice-button" data-choice="Two-Day Birthday Weekend">
          🎉 Two-Day Birthday Weekend
        </button>

        <button class="choice-button" data-choice="Surprise Me, Wife!">
          🎲 Surprise Me, Wife!
        </button>

      </div>
    </main>
  `;

  const choiceButtons = document.querySelectorAll(".choice-button");

  choiceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      birthdayPlan.celebrationLength = button.dataset.choice;
      showDateScreen();
    });
  });
}

function showDateScreen() {
  document.body.innerHTML = `
    <main class="welcome-screen">
      <div class="birthday-card">

        <p class="small-text">Birthday Mission: Step 2</p>

        <h1>When Are We Celebrating? 📅❤️</h1>

        <p class="message">
          Your birthday is September 5th, but you can choose whatever works best with your schedule.
        </p>

        <button class="choice-button date-choice" data-date="September 5, 2026">
          🎂 September 5 — The Big 35
        </button>

        <button class="choice-button date-choice" data-date="September 6, 2026">
          🎉 September 6 — Birthday Weekend Continues
        </button>

        <button class="choice-button date-choice" data-date="September 5 & 6, 2026">
          💕 September 5 + 6 — Give Me Both Days
        </button>

        <button class="choice-button" id="customDateButton">
          🗓️ Another Date Works Better
        </button>

        <div id="customDateArea" style="display: none; margin-top: 20px;">
          <p class="message">
            Pick the date that works best for you:
          </p>

          <input
            type="date"
            id="customDate"
            class="date-input"
          >

          <button class="choice-button" id="saveCustomDate">
            Save My Date ❤️
          </button>
        </div>

      </div>
    </main>
  `;

  const dateChoices = document.querySelectorAll(".date-choice");

  dateChoices.forEach(function (button) {
    button.addEventListener("click", function () {
      birthdayPlan.dates = button.dataset.date;

      alert(
        "Saved! ❤️\\n\\n" +
        "Celebration: " + birthdayPlan.celebrationLength +
        "\\nDate: " + birthdayPlan.dates
      );
    });
  });

  const customDateButton = document.getElementById("customDateButton");
  const customDateArea = document.getElementById("customDateArea");

  customDateButton.addEventListener("click", function () {
    customDateArea.style.display = "block";
  });

  const saveCustomDate = document.getElementById("saveCustomDate");

  saveCustomDate.addEventListener("click", function () {
    const customDate = document.getElementById("customDate").value;

    if (customDate === "") {
      alert("Pick a date first, birthday boy 😌");
      return;
    }

    birthdayPlan.dates = customDate;

    alert(
      "Saved! ❤️\\n\\n" +
      "Celebration: " + birthdayPlan.celebrationLength +
      "\\nDate: " + birthdayPlan.dates
    );
  });
}
