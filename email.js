/* =====================================
   BIRTHDAY PLAN EMAIL SUBMISSION
   Formspree
===================================== */

const FORMSPREE_ENDPOINT =
  "https://formspree.io/f/xkjwkzln";


document.addEventListener(
  "click",

  async function (event) {

    const submitButton =
      event.target.closest(
        "#finishButton"
      );


    if (!submitButton) {
      return;
    }


    /*
      Stop the old Submit button behavior
      temporarily so we can send the email
      BEFORE showing the success screen.
    */

    event.preventDefault();

    event.stopImmediatePropagation();


    const originalButtonText =
      submitButton.textContent;


    submitButton.disabled = true;

    submitButton.textContent =
      "Sending Birthday Mission... 💌";


    /* ---------------------------------
       Prepare everything Ifreke receives
    --------------------------------- */

    const formData =
      new FormData();


    formData.append(
      "Celebration",
      birthdayPlan.celebrationLength
      ||
      "Not selected"
    );


    formData.append(
      "Date",
      birthdayPlan.dates
      ||
      "Not selected"
    );


    formData.append(
      "Restaurants",

      birthdayPlan.restaurants.length

        ?

        birthdayPlan.restaurants.join(
          " + "
        )

        :

        "Not selected"
    );


    formData.append(
      "Activities",

      birthdayPlan.activities.length

        ?

        birthdayPlan.activities.join(
          " + "
        )

        :

        "Not selected"
    );


    formData.append(
      "Gift Ideas",

      birthdayPlan.gifts.length

        ?

        birthdayPlan.gifts.join(
          " + "
        )

        :

        "No preset gift selected"
    );


    formData.append(
      "Gift Notes",

      birthdayPlan.giftNotes.trim()

      ||

      "No extra notes"
    );


    /*
      This also sends one nicely formatted
      copy of the entire birthday plan.
    */

    formData.append(
      "Full Birthday Plan",
      buildPlanText()
    );


    /* ---------------------------------
       Send to Formspree
    --------------------------------- */

    try {

      const response =
        await fetch(

          FORMSPREE_ENDPOINT,

          {
            method: "POST",

            body: formData,

            headers: {
              Accept:
                "application/json"
            }
          }

        );


      /*
        Only show the birthday success page
        if Formspree confirms the submission.
      */

      if (!response.ok) {

        throw new Error(
          "Formspree submission failed"
        );

      }


      /*
        Keep his choices saved locally too.
      */

      savePlan();


      /*
        Now show your existing
        confetti success page.
      */

      showFinalScreen();

    }


    catch (error) {

      console.error(
        "Birthday submission error:",
        error
      );


      submitButton.disabled =
        false;


      submitButton.textContent =
        originalButtonText;


      alert(
        "Your birthday choices are still saved, " +
        "but they could not be sent right now. ❤️ " +
        "Please check the internet connection " +
        "and press Submit My Birthday Mission again."
      );

    }

  },

  /*
    This lets our email code catch the click
    before the existing Submit button sends
    him to the confetti screen.
  */

  true
);
