/**
 * CampusVault
 * Recently Viewed Resources
 */


/* =========================
   RESOURCE DATA
========================= */

const recentResourceData = {

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

    return JSON.parse(
        localStorage.getItem(
            "campusVaultRecentlyViewed"
        )
    ) || [];

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