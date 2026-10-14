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

    /*
     * An unknown resource id must never leave the sample
     * metadata from the markup on screen, so every
     * resource-specific field is cleared explicitly.
     */

    document.title =
        "Resource Not Found | CampusVault";

    resourceTitle.textContent =
        "Resource Not Found";

    resourceCourse.textContent =
        "";

    resourceType.textContent = "";
    resourceFileType.textContent = "";
    resourceLevel.textContent = "";
    resourceSession.textContent = "";
    resourceUploaded.textContent = "";

    resourceDescription.textContent =
        "The resource you are looking for could not be found. " +
        "It may have been removed, or the link may be incorrect.";

    infoCourse.textContent = "";
    infoType.textContent = "";
    infoLevel.textContent = "";
    infoSession.textContent = "";
    infoFileType.textContent = "";
    infoUploaded.textContent = "";

    /* Hide the metadata chips and sidebar when there is no data. */

    const resourceMetaRow =
        document.querySelector(".resource-details-card .resource-meta");

    if (resourceMetaRow) {
        resourceMetaRow.hidden = true;
    }

    const resourceInfoList =
        document.querySelector(".resource-information-list");

    if (resourceInfoList) {
        resourceInfoList.hidden = true;
    }

    const resourceInfoCard =
        document.querySelector(".resource-info-card");

    if (resourceInfoCard) {
        resourceInfoCard.hidden = true;
    }

}
/* =========================
   SAFE LOCAL STORAGE READS
========================= */

/*
 * Stored values are user-controlled, so every read is
 * guarded. Corrupt data falls back to a safe default and
 * is never written back, so valid data is never destroyed.
 */

function readSavedResources() {

    try {

        const stored =
            localStorage.getItem("campusVaultSavedResources");

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

function readRecentlyViewed() {

    try {

        const stored =
            localStorage.getItem("campusVaultRecentlyViewed");

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

function writeStoredList(key, value) {

    try {

        localStorage.setItem(key, JSON.stringify(value));

        return true;

    } catch (error) {

        console.error("Unable to save " + key + ":", error);

        return false;

    }

}

/* =========================
   PDF ACTIONS
========================= */

const viewPdfButton =
    document.querySelector("#view-pdf-button");

const downloadPdfButton =
    document.querySelector("#download-pdf-button");

const pdfViewer =
    document.querySelector("#pdf-viewer");

const pdfPreviewUnavailable =
    document.querySelector("#pdf-preview-unavailable");

/*
 * A PDF is only available when the resource exists and a
 * file path is recorded for it. Resources without a file
 * show a clear message and offer no broken actions.
 */

const hasPdf = Boolean(resource && resource.pdf);

if (pdfViewer) {

    pdfViewer.hidden = !hasPdf;

    if (hasPdf) {
        pdfViewer.src = resource.pdf;
    } else {
        pdfViewer.removeAttribute("src");
    }

}

if (pdfPreviewUnavailable) {
    pdfPreviewUnavailable.hidden = hasPdf;
}

if (viewPdfButton) {

    viewPdfButton.disabled = !hasPdf;

    if (hasPdf) {

        viewPdfButton.addEventListener("click", () => {

            window.open(
                resource.pdf,
                "_blank"
            );

        });

    }

}

if (downloadPdfButton) {

    downloadPdfButton.disabled = !hasPdf;

    if (hasPdf) {

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
   SAVE RESOURCE
========================= */

const saveResourceButton =
    document.querySelector("#save-resource-button");

/*
 * Saving is only offered for resources that actually
 * exist. This prevents unknown ids from ever entering
 * the saved list, where they would render as blank cards.
 */

if (saveResourceButton && resourceId && resource) {

    const savedResources = readSavedResources();

    const isSaved =
        savedResources.includes(resourceId);

    saveResourceButton.textContent =
        isSaved ? "Saved" : "Save Resource";

    saveResourceButton.addEventListener("click", () => {

        const currentSavedResources =
            readSavedResources();

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

        writeStoredList(
            "campusVaultSavedResources",
            currentSavedResources
        );

    });

} else if (saveResourceButton) {

    /* There is no valid resource to save. */

    saveResourceButton.disabled = true;
    saveResourceButton.textContent = "Unavailable";

}
/* =========================
   RECENTLY VIEWED
========================= */

function saveRecentlyViewed() {

    if (!resourceId) {
        return;
    }

    let recentlyViewed = readRecentlyViewed();

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

    writeStoredList(
        "campusVaultRecentlyViewed",
        recentlyViewed
    );

}

if (resource) {

    saveRecentlyViewed();

}