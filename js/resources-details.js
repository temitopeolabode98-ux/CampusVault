/**
 * CampusVault
 * Resource Details
 */

const resources = {
    "csc301-data-structures": {
        title: "Data Structures and Algorithms",
        course: "CSC 301",
        type: "Lecture Notes",
        level: "300 Level",
        session: "2025/2026",
        fileType: "PDF",
        uploaded: "Uploaded recently",
        pdf: "../assets/pdfs/csc301-data-structures.pdf",
        description:
            "This resource contains academic materials for Data Structures and Algorithms. It is provided to help students study and prepare for their coursework."
    },

    "csc305-database": {
        title: "Database Management Systems",
        course: "CSC 305",
        type: "Lecture Notes",
        level: "300 Level",
        session: "2025/2026",
        fileType: "PDF",
        uploaded: "Uploaded recently",
        description:
            "This resource contains academic materials for Database Management Systems. It is provided to help students study and prepare for their coursework."
    },

    "mth201-engineering-mathematics": {
        title: "Engineering Mathematics II",
        course: "MTH 201",
        type: "Past Questions",
        level: "200 Level",
        session: "2024/2025",
        fileType: "PDF",
        uploaded: "Uploaded recently",
        description:
            "This resource contains past examination questions for Engineering Mathematics II. It can help students prepare for assessments and examinations."
    },

    "phy203-applied-physics": {
        title: "Applied Physics",
        course: "PHY 203",
        type: "Past Questions",
        level: "200 Level",
        session: "2024/2025",
        fileType: "PDF",
        uploaded: "Uploaded recently",
        description:
            "This resource contains past examination questions for Applied Physics. It can help students prepare for assessments and examinations."
    },

    "intro-programming": {
        title: "Introduction to Programming",
        course: "CSC 201",
        type: "Assignment",
        level: "200 Level",
        session: "2025/2026",
        fileType: "PDF",
        uploaded: "Uploaded recently",
        description:
            "This resource contains academic materials for Introduction to Programming. It is provided to support students with their coursework and assignments."
    },

    "csc307-computer-architecture": {
        title: "Computer Architecture",
        course: "CSC 307",
        type: "Lecture Notes",
        level: "300 Level",
        session: "2025/2026",
        fileType: "PDF",
        uploaded: "Uploaded recently",
        description:
            "This resource contains academic materials for Computer Architecture. It is provided to help students study and prepare for their coursework."
    }
};


/* =========================
   GET RESOURCE ID
========================= */

const urlParams = new URLSearchParams(
    window.location.search
);

const resourceId = urlParams.get("id");

const resource = resources[resourceId];


/* =========================
   PAGE ELEMENTS
========================= */

const resourceType =
    document.querySelector("#resource-details-type");

const resourceFileType =
    document.querySelector("#resource-file-type");

const resourceTitle =
    document.querySelector("#resource-title");

const resourceCourse =
    document.querySelector("#resource-course");

const resourceLevel =
    document.querySelector("#resource-level");

const resourceSession =
    document.querySelector("#resource-session");

const resourceUploaded =
    document.querySelector("#resource-uploaded");

const resourceDescription =
    document.querySelector("#resource-description");

const infoCourse =
    document.querySelector("#info-course");

const infoType =
    document.querySelector("#info-type");

const infoLevel =
    document.querySelector("#info-level");

const infoSession =
    document.querySelector("#info-session");

const infoFileType =
    document.querySelector("#info-file-type");

const infoUploaded =
    document.querySelector("#info-uploaded");


/* =========================
   DISPLAY RESOURCE
========================= */

if (resource) {

    resourceType.textContent =
        resource.type;

    resourceFileType.textContent =
        resource.fileType;

    resourceTitle.textContent =
        resource.title;

    resourceCourse.textContent =
        resource.course;

    resourceLevel.textContent =
        resource.level;

    resourceSession.textContent =
        resource.session;

    resourceUploaded.textContent =
        resource.uploaded;

    resourceDescription.textContent =
        resource.description;

    infoCourse.textContent =
        resource.course;

    infoType.textContent =
        resource.type;

    infoLevel.textContent =
        resource.level;

    infoSession.textContent =
        resource.session;

    infoFileType.textContent =
        resource.fileType;

    infoUploaded.textContent =
        resource.uploaded;

    document.title =
        `${resource.title} | CampusVault`;

} else {

    document.title =
        "Resource Not Found | CampusVault";

    resourceTitle.textContent =
        "Resource Not Found";

    resourceCourse.textContent =
        "";

    resourceDescription.textContent =
        "The resource you are looking for could not be found.";

}
/* =========================
   PDF ACTIONS
========================= */

const viewPdfButton =
    document.querySelector("#view-pdf-button");

const downloadPdfButton =
    document.querySelector("#download-pdf-button");


if (resource && resource.pdf) {

    if (viewPdfButton) {

        viewPdfButton.addEventListener("click", () => {

            window.open(
                resource.pdf,
                "_blank"
            );

        });

    }


    if (downloadPdfButton) {

        downloadPdfButton.addEventListener("click", () => {

            const link =
                document.createElement("a");

            link.href = resource.pdf;

            link.download =
                `${resource.course}-${resource.title}.pdf`;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

        });

    }

}

/* =========================
   PDF PREVIEW
========================= */

const pdfViewer =
    document.querySelector("#pdf-viewer");

if (resource && resource.pdf && pdfViewer) {

    pdfViewer.src = resource.pdf;

}
/* =========================
   SAVE RESOURCE
========================= */

const saveResourceButton =
    document.querySelector("#save-resource-button");

if (saveResourceButton && resourceId) {

    const savedResources =
        JSON.parse(
            localStorage.getItem("campusVaultSavedResources")
        ) || [];

    const isSaved =
        savedResources.includes(resourceId);

    saveResourceButton.textContent =
        isSaved ? "Saved" : "Save Resource";


    saveResourceButton.addEventListener("click", () => {

        const currentSavedResources =
            JSON.parse(
                localStorage.getItem("campusVaultSavedResources")
            ) || [];

        const resourceIndex =
            currentSavedResources.indexOf(resourceId);


        if (resourceIndex === -1) {

            // Save resource
            currentSavedResources.push(resourceId);

            saveResourceButton.textContent =
                "Saved";

        } else {

            // Remove resource
            currentSavedResources.splice(
                resourceIndex,
                1
            );

            saveResourceButton.textContent =
                "Save Resource";
        }


        localStorage.setItem(
            "campusVaultSavedResources",
            JSON.stringify(currentSavedResources)
        );

    });

}
/* =========================
   RECENTLY VIEWED
========================= */

function saveRecentlyViewed() {

    if (!resourceId) {
        return;
    }

    let recentlyViewed =
        JSON.parse(
            localStorage.getItem(
                "campusVaultRecentlyViewed"
            )
        ) || [];


    // Remove the resource if it already exists
    recentlyViewed =
        recentlyViewed.filter(
            (id) => id !== resourceId
        );


    // Add the current resource to the beginning
    recentlyViewed.unshift(resourceId);


    // Keep only the 10 most recently viewed resources
    recentlyViewed =
        recentlyViewed.slice(0, 10);


    localStorage.setItem(
        "campusVaultRecentlyViewed",
        JSON.stringify(recentlyViewed)
    );

}


if (resource) {

    saveRecentlyViewed();

}