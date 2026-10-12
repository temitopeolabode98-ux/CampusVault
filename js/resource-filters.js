/**
 * CampusVault
 * Resource Search and Filters
 */

const resourceSearchForm = document.querySelector("#resource-search-form");
const resourceSearchInput = document.querySelector("#resource-search");

const resourceType = document.querySelector("#resource-type");
const resourceLevel = document.querySelector("#resource-level");
const resourceSession = document.querySelector("#resource-session");

const resourceCards = document.querySelectorAll(".resource-card");

const resourceCount = document.querySelector("#resource-count");
const noResultsMessage = document.querySelector("#no-results-message");


function filterResources() {

    const searchTerm = resourceSearchInput
        ? resourceSearchInput.value.trim().toLowerCase()
        : "";

    const selectedType = resourceType
        ? resourceType.value
        : "";

    const selectedLevel = resourceLevel
        ? resourceLevel.value
        : "";

    const selectedSession = resourceSession
        ? resourceSession.value
        : "";


    let visibleCount = 0;


    resourceCards.forEach((card) => {

        const cardText = card.textContent.toLowerCase();

        const cardType = card.dataset.type || "";
        const cardLevel = card.dataset.level || "";
        const cardSession = card.dataset.session || "";


        const matchesSearch =
            searchTerm === "" ||
            cardText.includes(searchTerm);

        const matchesType =
            selectedType === "" ||
            cardType === selectedType;

        const matchesLevel =
            selectedLevel === "" ||
            cardLevel === selectedLevel;

        const matchesSession =
            selectedSession === "" ||
            cardSession === selectedSession;


        const shouldShow =
            matchesSearch &&
            matchesType &&
            matchesLevel &&
            matchesSession;


        if (shouldShow) {

            card.hidden = false;
            visibleCount++;

        } else {

            card.hidden = true;

        }

    });


    if (resourceCount) {

        resourceCount.textContent =
            `${visibleCount} ${
                visibleCount === 1
                    ? "Resource"
                    : "Resources"
            }`;

    }


    if (noResultsMessage) {

        noResultsMessage.hidden =
            visibleCount !== 0;

    }

}


/* Search form */

if (resourceSearchForm) {

    resourceSearchForm.addEventListener("submit", (event) => {

        event.preventDefault();

        filterResources();

    });

}


/* Resource type */

if (resourceType) {

    resourceType.addEventListener("change", filterResources);

}


/* Level */

if (resourceLevel) {

    resourceLevel.addEventListener("change", filterResources);

}


/* Academic session */

if (resourceSession) {

    resourceSession.addEventListener("change", filterResources);

}


/* ========================================
   LOAD DEFAULT RESOURCE TYPE
======================================== */

function loadDefaultResourceType() {
    const SETTINGS_STORAGE_KEY = "campusVaultSettings";

    if (!resourceType) {
        filterResources();
        return;
    }

    try {
        const savedSettings = JSON.parse(
            localStorage.getItem(SETTINGS_STORAGE_KEY) || "{}"
        );

        const defaultType = savedSettings.defaultResourceType || "all";

        // Map saved settings values to resource filter values.
        const resourceTypeMap = {
            all: "",
            "lecture-notes": "lecture-notes",
            "past-questions": "past-questions",
            assignments: "assignments",
            other: "other"
        };

        // Apply the saved preference only if it is supported.
        if (Object.prototype.hasOwnProperty.call(resourceTypeMap, defaultType)) {
            resourceType.value = resourceTypeMap[defaultType];
        } else {
            resourceType.value = "";
        }

    } catch (error) {
        console.error("Unable to load the default resource type:", error);
        resourceType.value = "";
    }

    filterResources();
}

/* ========================================
   INITIALIZE RESOURCE FILTERS
======================================== */

function initializeResourceFilters() {

    // Apply the user's saved default resource type.
    loadDefaultResourceType();

    // Read the search term passed from the homepage.
    const urlParams = new URLSearchParams(
        window.location.search
    );

    const searchTerm = urlParams.get("search");

    // Apply the search term if one was provided.
    if (searchTerm && resourceSearchInput) {

        resourceSearchInput.value = searchTerm;

        filterResources();

    }

}

initializeResourceFilters();