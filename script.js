/* =====================================
   SAVED BIRTHDAY PLAN
===================================== */

const birthdayPlan =
  JSON.parse(
    localStorage.getItem(
      "birthdayPlan35"
    )
  )

  ||

  {
    celebrationLength: "",
    dates: "",
    restaurants: [],
    activities: [],
    gifts: [],
    giftNotes: ""
  };


function savePlan() {

  localStorage.setItem(
    "birthdayPlan35",
    JSON.stringify(
      birthdayPlan
    )
  );

}


/* =====================================
   START
===================================== */

const startButton =
  document.getElementById(
    "startButton"
  );


startButton.addEventListener(
  "click",
  showCelebrationLengthScreen
);


/* =====================================
   PAGE TEMPLATE
===================================== */

function pageShell(
  step,
  title,
  emoji,
  body,
  wide = false
) {

  return `

    <main class="welcome-screen">

      <div
        class="
          birthday-card
          ${wide ? "wide-card" : ""}
        "
      >

        ${
          step > 1

          ?

          `
          <button
            class="back-button"
            id="backButton"
          >
            ← Back
          </button>
          `

          :

          ""
        }


        <p class="small-text">

          Birthday Mission:
          Step ${step}

        </p>


        <h1>

          <span class="gradient-text">
            ${title}
          </span>

          <span class="emoji">
            ${emoji}
          </span>

        </h1>


        ${body}

      </div>

    </main>

  `;

}


/* =====================================
   STEP 1
   BIRTHDAY LENGTH
===================================== */

function showCelebrationLengthScreen() {

  document.body.innerHTML =
    pageShell(

      1,

      "How Much Birthday Trouble Are We Getting Into?",

      "😏🎉",

      `

        <p class="message">

          Pick how you want to
          celebrate your big 35.

        </p>


        <button
          class="
            choice-button
            celebration-choice
          "
          data-value="
            One-Day Birthday Adventure
          "
        >

          🎂 One-Day Birthday Adventure

        </button>


        <button
          class="
            choice-button
            celebration-choice
          "
          data-value="
            Two-Day Birthday Weekend
          "
        >

          🎉 Two-Day Birthday Weekend

        </button>


        <button
          class="
            choice-button
            celebration-choice
          "
          data-value="
            Surprise Me, Wife!
          "
        >

          🎲 Surprise Me, Wife!

        </button>

      `

    );


  const buttons =
    document.querySelectorAll(
      ".celebration-choice"
    );


  buttons.forEach(
    button => {

      if (
        button.dataset.value.trim()
        ===
        birthdayPlan.celebrationLength
      ) {

        button.classList.add(
          "selected"
        );

      }


      button.addEventListener(
        "click",
        () => {

          birthdayPlan
            .celebrationLength =
            button
              .dataset
              .value
              .trim();

          savePlan();

          showDateScreen();

        }
      );

    }
  );

}


/* =====================================
   STEP 2
   DATE
===================================== */

function showDateScreen() {

  document.body.innerHTML =
    pageShell(

      2,

      "When Are We Celebrating?",

      "📅❤️",

      `

        <p class="message">

          Your birthday is
          September 5th,
          but choose whatever
          works best with your schedule.

        </p>


        <button
          class="
            choice-button
            date-choice
          "
          data-date="
            September 5, 2026
          "
        >

          🎂 September 5 —
          The Big 35

        </button>


        <button
          class="
            choice-button
            date-choice
          "
          data-date="
            September 6, 2026
          "
        >

          🎉 September 6 —
          Birthday Weekend Continues

        </button>


        <button
          class="
            choice-button
            date-choice
          "
          data-date="
            September 5 & 6, 2026
          "
        >

          💕 September 5 + 6 —
          Give Me Both Days

        </button>


        <button
          class="choice-button"
          id="customDateButton"
        >

          🗓️ Another Date Works Better

        </button>


        <div
          id="customDateArea"
          class="hidden-area"
        >

          <p class="message">

            Pick the date that
            works best for you:

          </p>


          <input
            type="date"
            id="customDate"
            class="date-input"
          >


          <button
            class="choice-button"
            id="saveCustomDate"
          >

            ❤️ Use This Date

          </button>

        </div>


        <div
          id="dateContinueArea"
          class="continue-area"
        >

          <p
            class="saved-choice"
            id="savedDateText"
          ></p>


          <button
            class="continue-button"
            id="continueToFood"
          >

            Continue to Food 🍽️ →

          </button>

        </div>

      `

    );


  document
    .getElementById(
      "backButton"
    )
    .addEventListener(
      "click",
      showCelebrationLengthScreen
    );


  const buttons =
    document.querySelectorAll(
      ".date-choice"
    );


  function updateDates() {

    buttons.forEach(
      button => {

        button.classList.toggle(

          "selected",

          button
            .dataset
            .date
            .trim()

          ===

          birthdayPlan.dates

        );

      }
    );


    const area =
      document.getElementById(
        "dateContinueArea"
      );


    if (
      birthdayPlan.dates
    ) {

      area.style.display =
        "block";


      document
        .getElementById(
          "savedDateText"
        )
        .textContent =

        "✨ Selected: "
        +
        birthdayPlan.dates;

    }

    else {

      area.style.display =
        "none";

    }

  }


  buttons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          birthdayPlan.dates =
            button
              .dataset
              .date
              .trim();

          savePlan();

          updateDates();

        }
      );

    }
  );


  document
    .getElementById(
      "customDateButton"
    )
    .addEventListener(
      "click",
      () => {

        document
          .getElementById(
            "customDateArea"
          )
          .style
          .display =
          "block";

      }
    );


  document
    .getElementById(
      "saveCustomDate"
    )
    .addEventListener(
      "click",
      () => {

        const value =
          document
            .getElementById(
              "customDate"
            )
            .value;


        if (!value) {

          alert(
            "Pick a date first, birthday boy 😌"
          );

          return;

        }


        birthdayPlan.dates =
          formatCustomDate(
            value
          );


        savePlan();

        updateDates();

      }
    );


  document
    .getElementById(
      "continueToFood"
    )
    .addEventListener(
      "click",
      showRestaurantScreen
    );


  updateDates();

}


function formatCustomDate(
  value
) {

  return new Date(
    value
    +
    "T12:00:00"
  )
  .toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric"
    }
  );

}


/* =====================================
   STEP 3
   RESTAURANTS
   UP TO TWO
===================================== */

const restaurantOptions = [

  [
    "🍣",
    "Umi Sushi & Seafood Buffet",
    "Sushi + Seafood Buffet"
  ],

  [
    "🥩",
    "Texas Roadhouse",
    "Steaks + American Food"
  ],

  [
    "🌮",
    "Chuy's",
    "Mexican Food"
  ],

  [
    "🍔",
    "Cheddar's",
    "American Restaurant"
  ],

  [
    "🔥",
    "Gen Korean BBQ House",
    "Korean BBQ"
  ],

  [
    "🍣",
    "Kaiten Sushi Ginza Onodera Houston",
    "Conveyor Belt Sushi"
  ],

  [
    "🌶️",
    "Ember + Lotus Texas Thai Kitchen",
    "Texas Thai Kitchen"
  ],

  [
    "🥩",
    "Perry's Steakhouse",
    "Steakhouse"
  ],

  [
    "🔥",
    "Fogo de Chão",
    "Brazilian Steakhouse"
  ],

  [
    "🍲",
    "Shabu Zone",
    "All-You-Can-Eat Hot Pot"
  ],

  [
    "🎲",
    "Surprise Me, Wife!",
    "You choose for me 😌"
  ]

];


function showRestaurantScreen() {

  const cards =
    restaurantOptions
      .map(
        ([emoji, name, type]) => `

          <button
            class="
              option-card
              restaurant-option
            "
            data-value="${name}"
          >

            <span class="option-name">

              ${emoji} ${name}

            </span>


            <span class="option-type">

              ${type}

            </span>

          </button>

        `
      )
      .join("");


  document.body.innerHTML =
    pageShell(

      3,

      "Where Are We Eating, Birthday Boy?",

      "😋🍽️",

      `

        <p class="message">

          Choose up to
          <strong>
            2 restaurants
          </strong>

          in case one delicious meal
          simply isn't enough. 😌

        </p>


        <p
          class="selection-counter"
          id="restaurantCounter"
        ></p>


        <div class="option-grid">

          ${cards}

        </div>


        <div
          id="restaurantContinueArea"
          class="continue-area"
        >

          <p
            class="saved-choice"
            id="savedRestaurantText"
          ></p>


          <button
            class="continue-button"
            id="continueToActivities"
          >

            Continue to Activities 🎮 →

          </button>

        </div>

      `,

      true

    );


  document
    .getElementById(
      "backButton"
    )
    .addEventListener(
      "click",
      showDateScreen
    );


  const buttons =
    [
      ...document
        .querySelectorAll(
          ".restaurant-option"
        )
    ];


  function updateRestaurants() {

    buttons.forEach(
      button => {

        button.classList.toggle(

          "selected",

          birthdayPlan
            .restaurants
            .includes(
              button.dataset.value
            )

        );

      }
    );


    document
      .getElementById(
        "restaurantCounter"
      )
      .textContent =

      `Selected ${
        birthdayPlan
          .restaurants
          .length
      } of 2`;


    const area =
      document.getElementById(
        "restaurantContinueArea"
      );


    if (
      birthdayPlan
        .restaurants
        .length
    ) {

      area.style.display =
        "block";


      document
        .getElementById(
          "savedRestaurantText"
        )
        .textContent =

        "✨ Selected: "
        +
        birthdayPlan
          .restaurants
          .join(" + ");

    }

    else {

      area.style.display =
        "none";

    }

  }


  buttons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const value =
            button.dataset.value;


          const index =
            birthdayPlan
              .restaurants
              .indexOf(
                value
              );


          if (
            index >= 0
          ) {

            birthdayPlan
              .restaurants
              .splice(
                index,
                1
              );

          }

          else if (
            birthdayPlan
              .restaurants
              .length < 2
          ) {

            birthdayPlan
              .restaurants
              .push(
                value
              );

          }

          else {

            alert(
              "You can choose up to 2 restaurants, birthday boy 😋"
            );

          }


          savePlan();

          updateRestaurants();

        }
      );

    }
  );


  document
    .getElementById(
      "continueToActivities"
    )
    .addEventListener(
      "click",
      showActivityScreen
    );


  updateRestaurants();

}


/* =====================================
   STEP 4
   ACTIVITIES
   UP TO TWO
===================================== */

const activityGroups = [

  {
    title:
      "🏎️ Adventure",

    items: [

      [
        "K1 Speed",
        "Go-kart racing"
      ],

      [
        "Escape Room",
        "Pick any available room"
      ],

      [
        "Swimming or Beach Day",
        "Pool, beach, water + relaxing"
      ]

    ]
  },


  {
    title:
      "🎮 Play",

    items: [

      [
        "Dave & Buster's",
        "Arcade games + food"
      ],

      [
        "Itaewon Pocha",
        "Korean karaoke + food"
      ],

      [
        "Studio Movie Grill",
        "Pick any movie"
      ]

    ]
  },


  {
    title:
      "🌳 Explore",

    items: [

      [
        "New Park Adventure",
        "Explore a new park together"
      ],

      [
        "Museum Day",
        "Pick any museum"
      ],

      [
        "Houston Zoo",
        "Animals + walking date"
      ]

    ]
  },


  {
    title:
      "✨ Immersive",

    items: [

      [
        "Seismique",
        "Immersive art + technology"
      ],

      [
        "Color Factory",
        "Interactive colorful experience"
      ],

      [
        "Similar Immersive Experience",
        "Wife finds another cool place"
      ]

    ]
  },


  {
    title:
      "🔬 Something for the Scientist",

    items: [

      [
        "Science Museum",
        "Hands-on science exhibits"
      ],

      [
        "Planetarium",
        "Space + astronomy"
      ],

      [
        "Observatory / Astronomy Experience",
        "Stars, telescopes + sky watching"
      ],

      [
        "Interactive Technology Exhibit",
        "Technology, robotics or innovation"
      ],

      [
        "Engineering Experience",
        "Something for a curious mind"
      ],

      [
        "Immersive Science Exhibit",
        "Interactive science experience"
      ],

      [
        "Space-Related Experience",
        "NASA, astronomy or space"
      ],

      [
        "Wife, Find Me Something Nerdy & Amazing",
        "Scientist-approved surprise 🤓"
      ]

    ]
  },


  {
    title:
      "🎲 Wild Card",

    items: [

      [
        "Surprise Me, Wife!",
        "You choose the adventure 😌"
      ]

    ]
  }

];


function showActivityScreen() {

  const groupsHTML =
    activityGroups
      .map(
        group => `

          <section
            class="activity-section"
          >

            <h3>
              ${group.title}
            </h3>


            <div class="option-grid">

              ${
                group.items
                  .map(
                    ([name, type]) => `

                      <button
                        class="
                          option-card
                          activity-option
                        "
                        data-value="${name}"
                      >

                        <span
                          class="option-name"
                        >

                          ${name}

                        </span>


                        <span
                          class="option-type"
                        >

                          ${type}

                        </span>

                      </button>

                    `
                  )
                  .join("")
              }

            </div>

          </section>

        `
      )
      .join("");


  document.body.innerHTML =
    pageShell(

      4,

      "What Kind of Adventure Are We Having?",

      "🎮🏎️🔬",

      `

        <p class="message">

          Choose up to
          <strong>
            2 activities
          </strong>.

          One can absolutely
          be something nerdy. 🤓

        </p>


        <p
          class="selection-counter"
          id="activityCounter"
        ></p>


        ${groupsHTML}


        <div
          id="activityContinueArea"
          class="continue-area"
        >

          <p
            class="saved-choice"
            id="savedActivityText"
          ></p>


          <button
            class="continue-button"
            id="continueToGifts"
          >

            Continue to Gifts 🎁 →

          </button>

        </div>

      `,

      true

    );


  document
    .getElementById(
      "backButton"
    )
    .addEventListener(
      "click",
      showRestaurantScreen
    );


  const buttons =
    [
      ...document
        .querySelectorAll(
          ".activity-option"
        )
    ];


  function updateActivities() {

    buttons.forEach(
      button => {

        button
          .classList
          .toggle(

            "selected",

            birthdayPlan
              .activities
              .includes(
                button.dataset.value
              )

          );

      }
    );


    document
      .getElementById(
        "activityCounter"
      )
      .textContent =

      `Selected ${
        birthdayPlan
          .activities
          .length
      } of 2`;


    const area =
      document.getElementById(
        "activityContinueArea"
      );


    if (
      birthdayPlan
        .activities
        .length
    ) {

      area.style.display =
        "block";


      document
        .getElementById(
          "savedActivityText"
        )
        .textContent =

        "✨ Selected: "
        +
        birthdayPlan
          .activities
          .join(" + ");

    }

    else {

      area.style.display =
        "none";

    }

  }


  buttons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const value =
            button.dataset.value;


          const index =
            birthdayPlan
              .activities
              .indexOf(
                value
              );


          if (
            index >= 0
          ) {

            birthdayPlan
              .activities
              .splice(
                index,
                1
              );

          }

          else if (
            birthdayPlan
              .activities
              .length < 2
          ) {

            birthdayPlan
              .activities
              .push(
                value
              );

          }

          else {

            alert(
              "You can choose up to 2 activities, birthday boy 😌"
            );

          }


          savePlan();

          updateActivities();

        }
      );

    }
  );


  document
    .getElementById(
      "continueToGifts"
    )
    .addEventListener(
      "click",
      showGiftScreen
    );


  updateActivities();

}


/* =====================================
   STEP 5
   GIFTS
===================================== */

const giftOptions = [

  [
    "🛴",
    "Electric Scooter"
  ],

  [
    "🪑",
    "New Computer Chair"
  ],

  [
    "👟",
    "New Shoes"
  ],

  [
    "👕",
    "New Clothes"
  ],

  [
    "💈",
    "Professional Barber / Haircut"
  ],

  [
    "🎁",
    "Something Else"
  ]

];


function showGiftScreen() {

  const giftCards =
    giftOptions
      .map(
        ([emoji, name]) => `

          <button
            class="
              option-card
              gift-option
            "
            data-value="${name}"
          >

            <span class="option-name">

              ${emoji} ${name}

            </span>

          </button>

        `
      )
      .join("");


  document.body.innerHTML =
    pageShell(

      5,

      "Okay Birthday Boy... What Do You Actually Want?",

      "👀🎁",

      `

        <p class="message">

          Choose up to
          <strong>
            2 gift ideas
          </strong>

          or tell your wife
          exactly what you want.

        </p>


        <p class="funny-message">

          This is a judgment-free
          birthday zone.

          Dream responsibly...
          or don't. 😂

        </p>


        <p
          class="selection-counter"
          id="giftCounter"
        ></p>


        <div class="option-grid">

          ${giftCards}

        </div>


        <label
          class="input-label"
          for="giftNotes"
        >

          Tell your wife
          what you really want:

        </label>


        <textarea
          id="giftNotes"
          class="text-input"
          rows="5"
          placeholder="
Type anything here...
specific gift, link, size,
color or surprise request 👀"
        >${escapeHtml(
          birthdayPlan.giftNotes
        )}</textarea>


        <div
          class="
            continue-area
            visible-area
          "
        >

          <button
            class="continue-button"
            id="continueToReview"
          >

            Review My Birthday Plan ❤️ →

          </button>

        </div>

      `,

      true

    );


  document
    .getElementById(
      "backButton"
    )
    .addEventListener(
      "click",
      showActivityScreen
    );


  const buttons =
    [
      ...document
        .querySelectorAll(
          ".gift-option"
        )
    ];


  function updateGifts() {

    buttons.forEach(
      button => {

        button.classList.toggle(

          "selected",

          birthdayPlan
            .gifts
            .includes(
              button.dataset.value
            )

        );

      }
    );


    document
      .getElementById(
        "giftCounter"
      )
      .textContent =

      `Selected ${
        birthdayPlan
          .gifts
          .length
      } of 2`;

  }


  buttons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const value =
            button.dataset.value;


          const index =
            birthdayPlan
              .gifts
              .indexOf(
                value
              );


          if (
            index >= 0
          ) {

            birthdayPlan
              .gifts
              .splice(
                index,
                1
              );

          }

          else if (
            birthdayPlan
              .gifts
              .length < 2
          ) {

            birthdayPlan
              .gifts
              .push(
                value
              );

          }

          else {

            alert(
              "You can choose up to 2 gift ideas 😌"
            );

          }


          savePlan();

          updateGifts();

        }
      );

    }
  );


  document
    .getElementById(
      "giftNotes"
    )
    .addEventListener(
      "input",
      event => {

        birthdayPlan.giftNotes =
          event.target.value;

        savePlan();

      }
    );


  document
    .getElementById(
      "continueToReview"
    )
    .addEventListener(
      "click",
      showReviewScreen
    );


  updateGifts();

}


/* =====================================
   STEP 6
   REVIEW
===================================== */

function showReviewScreen() {

  document.body.innerHTML =
    pageShell(

      6,

      "Your 35th Birthday Mission",

      "🎉❤️",

      `

        <p class="message">

          Check everything before
          submitting your highly
          classified birthday requests. 😌

        </p>


        <div class="review-box">

          ${
            reviewRow(
              "🎂 Celebration",
              birthdayPlan
                .celebrationLength
                ||
                "Not selected"
            )
          }


          ${
            reviewRow(
              "📅 Date",
              birthdayPlan.dates
              ||
              "Not selected"
            )
          }


          ${
            reviewRow(
              "🍽️ Restaurants",
              birthdayPlan
                .restaurants
                .length

              ?

              birthdayPlan
                .restaurants
                .join(" + ")

              :

              "Not selected"
            )
          }


          ${
            reviewRow(
              "🎮 Activities",
              birthdayPlan
                .activities
                .length

              ?

              birthdayPlan
                .activities
                .join(" + ")

              :

              "Not selected"
            )
          }


          ${
            reviewRow(
              "🎁 Gift Ideas",
              birthdayPlan
                .gifts
                .length

              ?

              birthdayPlan
                .gifts
                .join(" + ")

              :

              "No preset gift selected"
            )
          }


          ${
            reviewRow(
              "💌 Gift Notes",
              birthdayPlan
                .giftNotes
                .trim()

              ||

              "No extra notes"
            )
          }

        </div>


        <div class="final-actions">


          <button
            class="continue-button"
            id="copyPlanButton"
          >

            📋 Copy My Birthday Plan

          </button>


          <button
            class="continue-button"
            id="finishButton"
          >

            🎉 Submit My Birthday Mission

          </button>

        </div>


        <p class="submission-note">

          Your selections are saved
          automatically while you use
          the birthday planner.

        </p>

      `,

      true

    );


  document
    .getElementById(
      "backButton"
    )
    .addEventListener(
      "click",
      showGiftScreen
    );


  document
    .getElementById(
      "copyPlanButton"
    )
    .addEventListener(
      "click",
      async () => {

        const text =
          buildPlanText();


        try {

          await navigator
            .clipboard
            .writeText(
              text
            );


          alert(
            "Birthday plan copied! 🎉"
          );

        }

        catch {

          alert(
            text
          );

        }

      }
    );


  document
    .getElementById(
      "finishButton"
    )
    .addEventListener(
      "click",
      showFinalScreen
    );

}


function reviewRow(
  label,
  value
) {

  return `

    <div class="review-row">

      <span class="review-label">

        ${label}

      </span>


      <span class="review-value">

        ${escapeHtml(value)}

      </span>

    </div>

  `;

}


/* =====================================
   PLAN TEXT
===================================== */

function buildPlanText() {

  return [

    "Elsayed's 35th Birthday Mission 🎉",

    "",

    `Celebration: ${
      birthdayPlan
        .celebrationLength
    }`,

    `Date: ${
      birthdayPlan.dates
    }`,

    `Restaurants: ${
      birthdayPlan
        .restaurants
        .join(" + ")
        ||
        "None selected"
    }`,

    `Activities: ${
      birthdayPlan
        .activities
        .join(" + ")
        ||
        "None selected"
    }`,

    `Gift Ideas: ${
      birthdayPlan
        .gifts
        .join(" + ")
        ||
        "None selected"
    }`,

    `Gift Notes: ${
      birthdayPlan
        .giftNotes
        ||
        "None"
    }`

  ]
  .join("\n");

}


/* =====================================
   STEP 7
   FINAL SCREEN
===================================== */

function showFinalScreen() {

  savePlan();


  document.body.innerHTML =
    pageShell(

      7,

      "Birthday Mission Saved!",

      "🎊🥳❤️",

      `

        <p class="message">

          Your highly classified
          birthday requests have
          officially been saved.

        </p>


        <p class="funny-message">

          Now leave the rest
          to your wife. 😌❤️

        </p>


        <div class="review-box">


          ${
            reviewRow(
              "🍽️ Food",
              birthdayPlan
                .restaurants
                .join(" + ")

              ||

              "Wife's choice"
            )
          }


          ${
            reviewRow(
              "🎮 Fun",
              birthdayPlan
                .activities
                .join(" + ")

              ||

              "Wife's choice"
            )
          }


          ${
            reviewRow(
              "🎁 Gift",

              birthdayPlan
                .gifts
                .join(" + ")

              ||

              birthdayPlan.giftNotes

              ||

              "Surprise me"
            )
          }

        </div>


        <p class="love-note">

          I love you, Ya Habibi.

          Here's to 35 and
          many, many more
          birthdays together. ❤️

        </p>


        <button
          class="continue-button"
          id="reviewAgainButton"
        >

          Review My Choices Again

        </button>

      `,

      true

    );


  document
    .getElementById(
      "backButton"
    )
    .addEventListener(
      "click",
      showReviewScreen
    );


  document
    .getElementById(
      "reviewAgainButton"
    )
    .addEventListener(
      "click",
      showReviewScreen
    );


  launchConfetti();

}


/* =====================================
   CONFETTI
===================================== */

function launchConfetti() {

  const emojis = [

    "🎉",
    "✨",
    "🎊",
    "❤️",
    "🥳"

  ];


  for (
    let i = 0;
    i < 35;
    i++
  ) {

    const piece =
      document.createElement(
        "span"
      );


    piece.className =
      "confetti-piece";


    piece.textContent =
      emojis[
        Math.floor(
          Math.random()
          *
          emojis.length
        )
      ];


    piece.style.left =
      `${Math.random() * 100}vw`;


    piece.style.animationDelay =
      `${Math.random() * 1.5}s`;


    piece.style.animationDuration =
      `${
        3
        +
        Math.random() * 2
      }s`;


    document.body.appendChild(
      piece
    );


    setTimeout(
      () => piece.remove(),
      6000
    );

  }

}


/* =====================================
   SAFE TEXT OUTPUT
===================================== */

function escapeHtml(
  value
) {

  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );

}
