/**
 * CampusVault
 * Recently Viewed Resources
 */


/* =========================
   RESOURCE DATA
========================= */

const recentResourceData = CAMPUSVAULT_RESOURCES;



/* =========================
   PAGE ELEMENTS
========================= */

const recentResourcesContainer =
    document.querySelector(
        "#recent-resources-container"
    );

const recentResourcesEmpty =
    document.querySelector(
        "#recent-resources-empty"
    );

const recentResourceCount =
    document.querySelector(
        "#recent-resource-count"
    );


/* =========================
   GET RECENTLY VIEWED
========================= */

function getRecentlyViewed() {

    try {

        const stored = localStorage.getItem(
            "campusVaultRecentlyViewed"
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
            "Unable to read recently viewed resources:",
            error
        );

        return [];

    }

}


/* =========================
   DISPLAY RESOURCES
========================= */

function displayRecentlyViewed() {

    const recentlyViewed =
        getRecentlyViewed();


    recentResourcesContainer.innerHTML = "";


    recentResourceCount.textContent =
        `${recentlyViewed.length} ${
            recentlyViewed.length === 1
                ? "Resource"
                : "Resources"
        }`;


    if (recentlyViewed.length === 0) {

        recentResourcesEmpty.hidden = false;

        return;

    }


    recentResourcesEmpty.hidden = true;


    recentlyViewed.forEach((resourceId) => {

        const resource =
            recentResourceData[resourceId];


        if (!resource) {
            return;
        }


        const card =
            document.createElement("article");

        card.className =
            "resource-card";


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

            </div>

        `;


        recentResourcesContainer.appendChild(card);

    });

}


/* =========================
   INITIALIZE
========================= */

if (recentResourcesContainer) {

    displayRecentlyViewed();

}