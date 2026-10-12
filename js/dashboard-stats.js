/**
 * CampusVault
 * Student Dashboard Statistics
 */

// Total resources currently in our sample dataset.
const totalAvailableResources = 6;

// Read saved resources from localStorage.
const savedResources = JSON.parse(
    localStorage.getItem("campusVaultSavedResources")
) || [];

// Read recently viewed resources from localStorage.
const recentlyViewedResources = JSON.parse(
    localStorage.getItem("campusVaultRecentlyViewed")
) || [];

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