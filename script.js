const startButton = document.getElementById("startButton");

startButton.addEventListener("click", function () {
  document.body.innerHTML = `
    <main class="welcome-screen">
      <div class="birthday-card">

        <p class="small-text">Birthday Mission: Step 1</p>

        <h1>How Much Birthday Trouble Are We Getting Into? 😏🎉</h1>

        <p class="message">
          Pick how you want to celebrate your big 35.
        </p>

        <button class="choice-button" data-choice="one-day">
          🎂 One-Day Birthday Adventure
        </button>

        <button class="choice-button" data-choice="two-day">
          🎉 Two-Day Birthday Weekend
        </button>

        <button class="choice-button" data-choice="surprise">
          🎲 Surprise Me, Wife!
        </button>

      </div>
    </main>
  `;
});
