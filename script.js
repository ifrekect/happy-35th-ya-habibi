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


/* --------------------------------
   STEP 1 - Celebration Length
-------------------------------- */

function showCelebrationLengthScreen() {
  document.body.innerHTML = `
    <main class="welcome-screen">
      <div class="birthday-card">

        <p class="small-text">
          Birthday Mission: Step 1
        </p>

        <h1>
          <span class="gradient-text">
            How Much Birthday Trouble Are We Getting Into?
          </span>

          <span class="emoji">
            😏🎉
          </span>
        </h1>

        <p class="message">
          Pick how you want to celebrate your big 35.
        </p>

        <button
          class="choice-button celebration-choice"
          data-choice="One-Day Birthday Adventure">
          🎂 One-Day Birthday Adventure
        </button>

        <button
          class="choice-button celebration-choice"
          data-choice="Two-Day Birthday Weekend">
          🎉 Two-Day Birthday Weekend
        </button>

        <button
          class="choice-button celebration-choice"
          data-choice="Surprise Me, Wife!">
          🎲 Surprise Me, Wife!
        </button>

      </div>
    </main>
  `;

  const choiceButtons =
    document.querySelectorAll(".celebration-choice");

  choiceButtons.forEach(function (button) {
    if (
      button.dataset.choice ===
      birthdayPlan.celebrationLength
    ) {
      button.classList.add("selected");
    }

    button.addEventListener("click", function () {
      birthdayPlan.celebrationLength =
        button.dataset.choice;

      showDateScreen();
    });
  });
}


/* --------------------------------
   STEP 2 - Date Selection
-------------------------------- */

function showDateScreen() {
  document.body.innerHTML = `
    <main class="welcome-screen">
      <div class="birthday-card">

        <button
          class="back-button"
          id="backToStep1">
          ← Back
        </button>

        <p class="small-text">
          Birthday Mission: Step 2
        </p>

        <h1>
          <span class="gradient-text">
            When Are We Celebrating?
          </span>

          <span class="emoji">
            📅❤️
          </span>
        </h1>

        <p class="message">
          Your birthday is September 5th,
          but you can choose whatever works
          best with your schedule.
        </p>

        <button
          class="choice-button date-choice"
          data-date="September 5, 2026">
          🎂 September 5 — The Big 35
        </button>

        <button
          class="choice-button date-choice"
          data-date="September 6, 2026">
          🎉 September 6 — Birthday Weekend Continues
        </button>

        <button
          class="choice-button date-choice"
          data-date="September 5 & 6, 2026">
          💕 September 5 + 6 — Give Me Both Days
        </button>

        <button
          class="choice-button"
          id="customDateButton">
          🗓️ Another Date Works Better
        </button>

        <div
          id="customDateArea"
          style="display: none; margin-top: 20px;">

          <p class="message">
            Pick the date that works best for you:
          </p>

          <input
            type="date"
            id="customDate"
            class="date-input"
          >

          <button
            class="choice-button"
            id="saveCustomDate">
            ❤️ Use This Date
          </button>

        </div>

        <div
          id="continueArea"
          style="display: none; margin-top: 30px;">

          <p
            class="saved-choice"
            id="savedDateText">
          </p>

          <button
            class="continue-button"
            id="continueToFood">
            Continue to Food 🍽️ →
          </button>

        </div>

      </div>
    </main>
  `;

  document
    .getElementById("backToStep1")
    .addEventListener("click", function () {
      showCelebrationLengthScreen();
    });

  const dateChoices =
    document.querySelectorAll(".date-choice");

  dateChoices.forEach(function (button) {
    if (
      button.dataset.date ===
      birthdayPlan.dates
    ) {
      button.classList.add("selected");
      showContinueButton();
    }

    button.addEventListener("click", function () {
      dateChoices.forEach(function (otherButton) {
        otherButton.classList.remove("selected");
      });

      button.classList.add("selected");

      birthdayPlan.dates =
        button.dataset.date;

      showContinueButton();
    });
  });

  const customDateButton =
    document.getElementById("customDateButton");

  const customDateArea =
    document.getElementById("customDateArea");

  customDateButton.addEventListener("click", function () {
    customDateArea.style.display = "block";
  });

  document
    .getElementById("saveCustomDate")
    .addEventListener("click", function () {
      const customDate =
        document.getElementById("customDate").value;

      if (customDate === "") {
        alert("Pick a date first, birthday boy 😌");
        return;
      }

      dateChoices.forEach(function (button) {
        button.classList.remove("selected");
      });

      birthdayPlan.dates =
        formatCustomDate(customDate);

      showContinueButton();
    });

  function showContinueButton() {
    const continueArea =
      document.getElementById("continueArea");

    const savedDateText =
      document.getElementById("savedDateText");

    continueArea.style.display = "block";

    savedDateText.textContent =
      "✨ Selected: " + birthdayPlan.dates;
  }

  document
    .getElementById("continueToFood")
    .addEventListener("click", function () {
      showRestaurantScreen();
    });
}


/* --------------------------------
   Format Custom Date
-------------------------------- */

function formatCustomDate(dateValue) {
  const date =
    new Date(dateValue + "T12:00:00");

  return date.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric"
    }
  );
}


/* --------------------------------
   STEP 3 - Restaurant Selection
-------------------------------- */

function showRestaurantScreen() {
  document.body.innerHTML = `
    <main class="welcome-screen">
      <div class="birthday-card restaurant-card">

        <button
          class="back-button"
          id="backToDates">
          ← Back
        </button>

        <p class="small-text">
          Birthday Mission: Step 3
        </p>

        <h1>
          <span class="gradient-text">
            Where Are We Eating, Birthday Boy?
          </span>

          <span class="emoji">
            😋🍽️
          </span>
        </h1>

        <p class="message">
          Pick whichever place sounds best.
          You can change your mind before continuing.
        </p>

        <div class="restaurant-grid">

          <button
            class="restaurant-option"
            data-restaurant="Umi Sushi & Seafood Buffet">

            <span class="restaurant-name">
              🍣 Umi Sushi & Seafood Buffet
            </span>

            <span class="restaurant-type">
              Sushi + Seafood Buffet
            </span>
          </button>


          <button
            class="restaurant-option"
            data-restaurant="Texas Roadhouse">

            <span class="restaurant-name">
              🥩 Texas Roadhouse
            </span>

            <span class="restaurant-type">
              Steaks + American Food
            </span>
          </button>


          <button
            class="restaurant-option"
            data-restaurant="Chuy's">

            <span class="restaurant-name">
              🌮 Chuy's
            </span>

            <span class="restaurant-type">
              Mexican Food
            </span>
          </button>


          <button
            class="restaurant-option"
            data-restaurant="Cheddar's">

            <span class="restaurant-name">
              🍔 Cheddar's
            </span>

            <span class="restaurant-type">
              American Restaurant
            </span>
          </button>


          <button
            class="restaurant-option"
            data-restaurant="Gen Korean BBQ House">

            <span class="restaurant-name">
              🔥 Gen Korean BBQ House
            </span>

            <span class="restaurant-type">
              Korean BBQ
            </span>
          </button>


          <button
            class="restaurant-option"
            data-restaurant="Kaiten Sushi Ginza Onodera Houston">

            <span class="restaurant-name">
              🍣 Kaiten Sushi Ginza Onodera
            </span>

            <span class="restaurant-type">
              Conveyor Belt Sushi
            </span>
          </button>


          <button
            class="restaurant-option"
            data-restaurant="Ember + Lotus Texas Thai Kitchen">

            <span class="restaurant-name">
              🌶️ Ember + Lotus
            </span>

            <span class="restaurant-type">
              Texas Thai Kitchen
            </span>
          </button>


          <button
            class="restaurant-option"
            data-restaurant="Perry's Steakhouse">

            <span class="restaurant-name">
              🥩 Perry's Steakhouse
            </span>

            <span class="restaurant-type">
              Steakhouse
            </span>
          </button>


          <button
            class="restaurant-option"
            data-restaurant="Fogo de Chão">

            <span class="restaurant-name">
              🔥 Fogo de Chão
            </span>

            <span class="restaurant-type">
              Brazilian Steakhouse
            </span>
          </button>


          <button
            class="restaurant-option"
            data-restaurant="Shabu Zone">

            <span class="restaurant-name">
              🍲 Shabu Zone
            </span>

            <span class="restaurant-type">
              All-You-Can-Eat Hot Pot
            </span>
          </button>


          <button
            class="restaurant-option surprise-restaurant"
            data-restaurant="Surprise Me, Wife!">

            <span class="restaurant-name">
              🎲 Surprise Me, Wife!
            </span>

            <span class="restaurant-type">
              You choose for me 😌
            </span>
          </button>

        </div>


        <div
          id="restaurantContinueArea"
          style="display: none; margin-top: 30px;">

          <p
            class="saved-choice"
            id="savedRestaurantText">
          </p>

          <button
            class="continue-button"
            id="continueToActivities">
            Continue to Activities 🎮 →
          </button>

        </div>

      </div>
    </main>
  `;


  document
    .getElementById("backToDates")
    .addEventListener("click", function () {
      showDateScreen();
    });


  const restaurantOptions =
    document.querySelectorAll(".restaurant-option");


  restaurantOptions.forEach(function (button) {

    if (
      button.dataset.restaurant ===
      birthdayPlan.restaurant
    ) {
      button.classList.add("selected");
      showRestaurantContinue();
    }


    button.addEventListener("click", function () {

      restaurantOptions.forEach(function (otherButton) {
        otherButton.classList.remove("selected");
      });

      button.classList.add("selected");

      birthdayPlan.restaurant =
        button.dataset.restaurant;

      showRestaurantContinue();
    });
  });


  function showRestaurantContinue() {

    const restaurantContinueArea =
      document.getElementById("restaurantContinueArea");

    const savedRestaurantText =
      document.getElementById("savedRestaurantText");

    restaurantContinueArea.style.display = "block";

    savedRestaurantText.textContent =
      "✨ Selected: " +
      birthdayPlan.restaurant;
  }


  document
    .getElementById("continueToActivities")
    .addEventListener("click", function () {
      showActivityPreview();
    });

}


/* --------------------------------
   STEP 4 - Activity Preview
-------------------------------- */

function showActivityPreview() {

  document.body.innerHTML = `
    <main class="welcome-screen">
      <div class="birthday-card">

        <button
          class="back-button"
          id="backToRestaurants">
          ← Back
        </button>

        <p class="small-text">
          Birthday Mission: Step 4
        </p>

        <h1>
          <span class="gradient-text">
            What Kind of Adventure Are We Having?
          </span>

          <span class="emoji">
            🎮🏎️🔬
          </span>
        </h1>

        <p class="message">
          Activity choices are coming next!
        </p>

        <p class="saved-choice">
          Your choices so far:
        </p>

        <p class="message">
          🎉 ${birthdayPlan.celebrationLength}
          <br>
          📅 ${birthdayPlan.dates}
          <br>
          🍽️ ${birthdayPlan.restaurant}
        </p>

      </div>
    </main>
  `;

  document
    .getElementById("backToRestaurants")
    .addEventListener("click", function () {
      showRestaurantScreen();
    });
}
