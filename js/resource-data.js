/**
 * CampusVault
 * Shared Resource Data Source
 *
 * Single source of truth for the resource catalogue.
 * Every page that needs resource metadata (resource details,
 * dashboard, saved resources, recently viewed, and the
 * resources listing) reads from this object instead of
 * keeping its own copy.
 *
 * This is a classic script: load it BEFORE any script that
 * consumes it. No modules and no build step are required.
 *
 * Storage formats are unchanged:
 *   - saved resources  -> localStorage "campusVaultSavedResources"
 *   - recently viewed  -> localStorage "campusVaultRecentlyViewed"
 * Both store arrays of the resource ids defined below.
 *
 * "pdf" is written relative to the pages/ directory because it is
 * only used by pages/resources-details.html. Only the resource
 * listed below has an actual file in assets/pdfs/.
 */


const CAMPUSVAULT_RESOURCES = {

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
            "This resource contains academic materials for Data Structures and Algorithms. It is provided to help students study and prepare for their coursework.",
        filterType: "lecture-notes",
        filterLevel: "300",
        filterSession: "2025-2026"
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
            "This resource contains academic materials for Database Management Systems. It is provided to help students study and prepare for their coursework.",
        filterType: "lecture-notes",
        filterLevel: "300",
        filterSession: "2025-2026"
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
            "This resource contains past examination questions for Engineering Mathematics II. It can help students prepare for assessments and examinations.",
        filterType: "past-questions",
        filterLevel: "200",
        filterSession: "2024-2025"
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
            "This resource contains past examination questions for Applied Physics. It can help students prepare for assessments and examinations.",
        filterType: "past-questions",
        filterLevel: "200",
        filterSession: "2024-2025"
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
            "This resource contains academic materials for Introduction to Programming. It is provided to support students with their coursework and assignments.",
        filterType: "assignments",
        filterLevel: "200",
        filterSession: "2025-2026"
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
            "This resource contains academic materials for Computer Architecture. It is provided to help students study and prepare for their coursework.",
        filterType: "lecture-notes",
        filterLevel: "300",
        filterSession: "2025-2026"
    }

};


/* Listing order for the resources page. Derived from the object
   above so the id list is never maintained in two places. */
const CAMPUSVAULT_RESOURCE_IDS =
    Object.keys(CAMPUSVAULT_RESOURCES);
