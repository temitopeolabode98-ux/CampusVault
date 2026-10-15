/**
 * CampusVault
 * Student Dashboard
 */


/* =========================
   RESOURCE DATA
========================= */

const dashboardResourceData = CAMPUSVAULT_RESOURCES;



/* =========================
   PAGE ELEMENTS
========================= */

const dashboardRecentResources =
    document.querySelector(
        "#dashboard-recent-resources"
    );

const dashboardRecentEmpty =
    document.querySelector(
        "#dashboard-recent-empty"
    );


/* =========================
   GET RECENTLY VIEWED
========================= */

function getDashboardRecentlyViewed() {

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
   DISPLAY RECENT RESOURCES
========================= */

function displayDashboardRecentResources() {

    const recentlyViewed =
        getDashboardRecentlyViewed();


    dashboardRecentResources.innerHTML = "";


    /*
     * Show only the first 3 resources
     * on the dashboard.
     */

    const resourcesToShow =
        recentlyViewed.slice(0, 3);


    if (resourcesToShow.length === 0) {

        dashboardRecentEmpty.hidden = false;

        return;

    }


    dashboardRecentEmpty.hidden = true;


    resourcesToShow.forEach((resourceId) => {

        const resource =
            dashboardResourceData[resourceId];


        if (!resource) {
            return;
        }


        const card =
            document.createElement("article");

        card.className =
            "dashboard-resource-card";


        card.innerHTML = `

            <div class="dashboard-resource-content">

                <span class="resource-type-badge">
                    ${resource.type}
                </span>

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


            <div class="dashboard-resource-action">

                <a
                    href="../resources-details.html?id=${resourceId}"
                    class="btn btn-primary btn-small"
                >
                    View
                </a>

            </div>

        `;


        dashboardRecentResources.appendChild(card);

    });

}


/* =========================
   INITIALIZE
========================= */

if (dashboardRecentResources) {

    displayDashboardRecentResources();

}
// =========================
// PERSONALIZED WELCOME
// =========================

function updateDashboardWelcome() {
    const welcomeHeading = document.querySelector(
        "#dashboard-welcome-name"
    );

    if (!welcomeHeading) {
        return;
    }

    try {
        const savedProfile = JSON.parse(
            localStorage.getItem("campusVaultStudentProfile")
        );

        const studentName =
            savedProfile &&
            typeof savedProfile.fullName === "string"
                ? savedProfile.fullName.trim()
                : "";

        if (studentName) {
            const firstName = studentName.split(/\s+/)[0];

            welcomeHeading.textContent =
                `Welcome back, ${firstName}!`;
        } else {
            welcomeHeading.textContent =
                "Welcome back, Student";
        }
    } catch (error) {
        console.error(
            "Unable to load the student profile:",
            error
        );

        welcomeHeading.textContent =
            "Welcome back, Student";
    }
}

updateDashboardWelcome();