/**
 * CampusVault
 * Student Dashboard Statistics
 */

// Total resources currently in our sample dataset.
const totalAvailableResources = 6;

// Storage keys used across CampusVault.
const SAVED_RESOURCES_KEY = "campusVaultSavedResources";
const RECENTLY_VIEWED_KEY = "campusVaultRecentlyViewed";

/**
 * Read a stored list defensively.
 *
 * Missing, malformed, or non-array values fall back to an
 * empty list so a corrupt localStorage entry can never
 * throw and blank out the dashboard statistics.
 */
function readStoredList(key) {
    try {
        const stored = localStorage.getItem(key);

        if (!stored) {
            return [];
        }

        const parsed = JSON.parse(stored);

        if (!Array.isArray(parsed)) {
            return [];
        }

        // Keep only usable string ids.
        return parsed.filter(
            (id) => typeof id === "string" && id.length > 0
        );
    } catch (error) {
        console.error(
            `Unable to read "${key}" from storage:`,
            error
        );

        return [];
    }
}

// Read saved resources from localStorage.
const savedResources = readStoredList(SAVED_RESOURCES_KEY);

// Read recently viewed resources from localStorage.
const recentlyViewedResources = readStoredList(
    RECENTLY_VIEWED_KEY
);

// Find the statistics elements.
const availableResourcesElement = document.querySelector(
    "#stat-available-resources"
);

const savedResourcesElement = document.querySelector(
    "#stat-saved-resources"
);

const recentResourcesElement = document.querySelector(
    "#stat-recent-resources"
);

// Display the statistics.
if (availableResourcesElement) {
    availableResourcesElement.textContent =
        totalAvailableResources;
}

if (savedResourcesElement) {
    savedResourcesElement.textContent =
        savedResources.length;
}

if (recentResourcesElement) {
    recentResourcesElement.textContent =
        recentlyViewedResources.length;
}