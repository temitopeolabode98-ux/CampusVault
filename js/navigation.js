/**
 * CampusVault
 * Mobile Navigation
 */

const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileNavigation = document.querySelector("#mobile-navigation");

if (mobileMenuToggle && mobileNavigation) {

    mobileMenuToggle.addEventListener("click", () => {

        const isOpen = mobileNavigation.classList.toggle("is-open");

        mobileMenuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        mobileMenuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    // Close the mobile menu when a navigation link is clicked

    const mobileLinks =
        mobileNavigation.querySelectorAll("a");

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileNavigation.classList.remove("is-open");

            mobileMenuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}