/**
 * CampusVault
 * Homepage Save Buttons
 *
 * Toggles the homepage heart buttons using the same
 * "campusVaultSavedResources" storage key and resource
 * ids as the resource pages. The resource dataset is
 * not duplicated here: ids and titles come from the
 * data attributes in the markup.
 */


/* =========================
   READ SAVED IDS
========================= */

function readHomepageSavedIds() {

    try {

        const stored = localStorage.getItem(
            "campusVaultSavedResources"
        );

        if (!stored) {
            return [];
        }

        const parsed = JSON.parse(stored);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter(
            (id) => typeof id === "string" && id.length > 0
        );

    } catch (error) {

        console.error(
            "Unable to read saved resources:",
            error
        );

        return [];

    }

}


/* =========================
   RENDER HEART STATE
========================= */

function renderHeartState(button, isSaved) {

    const title =
        button.dataset.resourceTitle || "this resource";

    button.textContent = isSaved ? "♥" : "♡";

    button.setAttribute(
        "aria-pressed",
        String(isSaved)
    );

    button.setAttribute(
        "aria-label",
        isSaved
            ? `Remove ${title} from saved resources`
            : `Save ${title} to your saved resources`
    );

}


/* =========================
   INITIALIZE
========================= */

const homepageHeartButtons =
    document.querySelectorAll(
        ".icon-button[data-resource-id]"
    );


homepageHeartButtons.forEach((button) => {

    const resourceId =
        button.dataset.resourceId;

    renderHeartState(
        button,
        readHomepageSavedIds().includes(resourceId)
    );


    button.addEventListener("click", () => {

        const savedIds =
            readHomepageSavedIds();

        const resourceIndex =
            savedIds.indexOf(resourceId);

        if (resourceIndex === -1) {
            savedIds.push(resourceId);
        } else {
            savedIds.splice(resourceIndex, 1);
        }

        localStorage.setItem(
            "campusVaultSavedResources",
            JSON.stringify(savedIds)
        );

        renderHeartState(
            button,
            resourceIndex === -1
        );

    });

});
