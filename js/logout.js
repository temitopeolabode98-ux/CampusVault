/**
 * CampusVault
 * Logout Control (Preview Behaviour)
 *
 * There is no backend authentication yet, so this
 * script never claims that a real sign-out happened
 * and never deletes stored profile or saved-resource
 * data. When a real authentication system is added,
 * expose `window.CampusVaultAuth.logout()` and this
 * control will call it instead of showing the notice.
 */


/* =========================
   SHOW NOTICE
========================= */

function showLogoutUnavailableNotice() {

    let notice = document.getElementById(
        "logout-notice"
    );

    if (!notice) {

        notice = document.createElement("p");

        notice.id = "logout-notice";

        notice.className = "logout-notice";

        notice.setAttribute("role", "status");

        notice.textContent =
            "Sign-out is not available yet. " +
            "This preview has no account system, " +
            "so nothing was signed out and your " +
            "saved data stays on this device.";

        const header =
            document.querySelector(".site-header");

        if (header) {
            header.appendChild(notice);
        }

    }

    notice.hidden = false;

}


/* =========================
   ATTACH HANDLERS
========================= */

const logoutButtons =
    document.querySelectorAll(".logout-button");


logoutButtons.forEach((button) => {

    button.addEventListener("click", () => {

        if (
            typeof window.CampusVaultAuth?.logout ===
            "function"
        ) {
            window.CampusVaultAuth.logout();
            return;
        }

        showLogoutUnavailableNotice();

    });

});
