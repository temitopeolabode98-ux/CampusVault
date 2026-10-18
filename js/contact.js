/**
 * CampusVault
 * Contact Form Validation
 *
 * Validates the contact form on the client side so that obviously
 * invalid input is caught before it would ever be submitted.
 *
 * This project has no backend. Nothing is sent, stored, or
 * delivered. After a valid submission the page says so honestly
 * and does NOT claim the message reached anyone.
 */


const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


/* =========================
   FIELD ERROR HELPERS
========================= */

function setFieldError(input, message) {

    const errorElement =
        document.getElementById(input.id + "-error");

    if (message) {

        input.setAttribute("aria-invalid", "true");

        if (errorElement) {
            errorElement.textContent = message;
        }

    } else {

        input.removeAttribute("aria-invalid");

        if (errorElement) {
            errorElement.textContent = "";
        }

    }

}


function validateField(input) {

    const value = input.value.trim();

    if (!value) {

        setFieldError(
            input,
            "This field is required."
        );

        return false;

    }

    if (input.type === "email" && !EMAIL_PATTERN.test(value)) {

        setFieldError(
            input,
            "Enter a valid email address, for example name@example.com."
        );

        return false;

    }

    setFieldError(input, "");

    return true;

}


/* =========================
   SUBMIT HANDLER
========================= */

if (contactForm) {

    const fields = Array.from(
        contactForm.querySelectorAll("input[required], textarea[required]")
    );

    // Clear an error as soon as the user starts fixing a field.
    fields.forEach((input) => {

        input.addEventListener("input", () => {

            if (input.getAttribute("aria-invalid") === "true") {
                validateField(input);
            }

        });

    });

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        let firstInvalid = null;

        fields.forEach((input) => {

            const isValid = validateField(input);

            if (!isValid && !firstInvalid) {
                firstInvalid = input;
            }

        });

        if (firstInvalid) {

            if (contactStatus) {
                contactStatus.textContent =
                    "Please fix the highlighted fields before continuing.";
                contactStatus.className =
                    "contact-status error";
            }

            firstInvalid.focus();

            return;

        }

        // Honest outcome: the form is valid, but there is no
        // backend, so nothing is delivered or saved.
        if (contactStatus) {
            contactStatus.textContent =
                "Your message is well formed, but CampusVault has " +
                "no server yet, so it has not been sent or saved " +
                "anywhere. Nothing was delivered.";
            contactStatus.className =
                "contact-status notice";
        }

        contactForm.reset();

    });

}
