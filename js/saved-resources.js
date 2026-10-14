/**
 * CampusVault
 * Saved Resources
 */


/* =========================
   RESOURCE DATA
========================= */

const savedResourceData = {

    "csc301-data-structures": {
        title: "Data Structures and Algorithms",
        course: "CSC 301",
        type: "Lecture Notes",
        level: "300 Level",
        session: "2025/2026"
    },

    "csc305-database": {
        title: "Database Management Systems",
        course: "CSC 305",
        type: "Lecture Notes",
        level: "300 Level",
        session: "2025/2026"
    },

    "mth201-engineering-mathematics": {
        title: "Engineering Mathematics II",
        course: "MTH 201",
        type: "Past Questions",
        level: "200 Level",
        session: "2024/2025"
    },

    "phy203-applied-physics": {
        title: "Applied Physics",
        course: "PHY 203",
        type: "Past Questions",
        level: "200 Level",
        session: "2024/2025"
    },

    "intro-programming": {
        title: "Introduction to Programming",
        course: "CSC 201",
        type: "Assignment",
        level: "200 Level",
        session: "2025/2026"
    },

    "csc307-computer-architecture": {
        title: "Computer Architecture",
        course: "CSC 307",
        type: "Lecture Notes",
        level: "300 Level",
        session: "2025/2026"
    }

};


/* =========================
   PAGE ELEMENTS
========================= */

const savedResourcesContainer =
    document.querySelector("#saved-resources-container");

const savedResourcesEmpty =
    document.querySelector("#saved-resources-empty");

const savedResourceCount =
    document.querySelector("#saved-resource-count");


/* =========================
   GET SAVED RESOURCES
========================= */

function getSavedResources() {

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
   DISPLAY SAVED RESOURCES
========================= */

function displaySavedResources() {

    const savedIds =
        getSavedResources();

    savedResourcesContainer.innerHTML = "";

    let renderedCount = 0;


    savedIds.forEach((resourceId) => {

        const resource =
            savedResourceData[resourceId];


        const card =
            document.createElement("article");

        card.className =
            "resource-card";


        if (!resource) {

            /*
             * The id no longer maps to a known resource.
             * Render a clearly marked card so the counter
             * stays accurate and the entry can still be
             * removed from the list.
             */

            card.classList.add(
                "resource-card-unavailable"
            );

            card.innerHTML = `

                <div class="resource-card-header">

                    <span class="resource-type-badge">
                        Unavailable
                    </span>

                </div>


                <div class="resource-card-body">

                    <h3>
                        Resource no longer available
                    </h3>

                    <p>
                        This saved item is no longer
                        part of the library.
                    </p>

                </div>


                <div class="resource-card-actions">

                    <button
                        type="button"
                        class="btn btn-secondary btn-small remove-saved-resource"
                        data-resource-id="${resourceId}"
                    >
                        Remove
                    </button>

                </div>

            `;

            savedResourcesContainer.appendChild(card);

            renderedCount++;

            return;

        }


        card.innerHTML = `

            <div class="resource-card-header">

                <span class="resource-type-badge">
                    ${resource.type}
                </span>

            </div>


            <div class="resource-card-body">

                <p class="resource-course">
                    ${resource.course}
                </p>

                <h3>
                    ${resource.title}
                </h3>

                <div class="resource-meta">

                    <span>
                        ${resource.level}
                    </span>

                    <span>
                        ${resource.session}
                    </span>

                </div>

            </div>


            <div class="resource-card-actions">

                <a
                    href="../resources-details.html?id=${resourceId}"
                    class="btn btn-primary btn-small"
                >
                    View Resource
                </a>

                <button
                    type="button"
                    class="btn btn-secondary btn-small remove-saved-resource"
                    data-resource-id="${resourceId}"
                >
                    Remove
                </button>

            </div>

        `;


        savedResourcesContainer.appendChild(card);

        renderedCount++;

    });


    /*
     * The counter reports what is actually on screen, and
     * the empty state shows whenever nothing rendered.
     */

    savedResourceCount.textContent =
        `${renderedCount} ${
            renderedCount === 1
                ? "Resource"
                : "Resources"
        }`;


    savedResourcesEmpty.hidden = renderedCount !== 0;


    attachRemoveListeners();

}


/* =========================
   REMOVE RESOURCE
========================= */

function attachRemoveListeners() {

    const removeButtons =
        document.querySelectorAll(
            ".remove-saved-resource"
        );


    removeButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const resourceId =
                    button.dataset.resourceId;


                const savedIds =
                    getSavedResources();


                const updatedIds =
                    savedIds.filter(
                        (id) => id !== resourceId
                    );


                localStorage.setItem(
                    "campusVaultSavedResources",
                    JSON.stringify(updatedIds)
                );


                displaySavedResources();

            }
        );

    });

}


/* =========================
   INITIALIZE
========================= */

if (savedResourcesContainer) {

    displaySavedResources();

}