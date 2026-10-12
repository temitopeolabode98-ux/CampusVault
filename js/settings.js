/**
 * CampusVault
 * Student Settings Management
 */

// =========================
// ELEMENTS
// =========================

const emailNotifications = document.querySelector(
    "#email-notifications"
);

const darkModeToggle = document.querySelector(
    "#dark-mode"
);

const defaultResourceType = document.querySelector(
    "#default-resource-type"
);

const saveSettingsButton = document.querySelector(
    "#save-settings-button"
);

const resetSettingsButton = document.querySelector(
    "#reset-settings-button"
);

const clearHistoryButton = document.querySelector(
    "#clear-history-button"
);

const settingsMessage = document.querySelector(
    "#settings-message"
);


// =========================
// DEFAULT SETTINGS
// =========================

const defaultSettings = {
    emailNotifications: false,
    defaultResourceType: "all"
};

const SETTINGS_STORAGE_KEY = "campusVaultSettings";


// =========================
// LOAD SETTINGS
// =========================

function loadSettings() {
    try {
        const storedSettings = localStorage.getItem(
            SETTINGS_STORAGE_KEY
        );

        const settings = storedSettings
            ? {
                ...defaultSettings,
                ...JSON.parse(storedSettings)
            }
            : { ...defaultSettings };

        emailNotifications.checked =
            settings.emailNotifications === true;

        darkModeToggle.checked =
            typeof settings.darkMode === "boolean"
                ? settings.darkMode
                : window.CampusVaultTheme.isDarkMode();

        defaultResourceType.value =
            settings.defaultResourceType;

    } catch (error) {
        console.error("Unable to load settings:", error);
        showSettingsMessage(
            "Unable to load your settings.",
            "error"
        );
    }
}


// =========================
// SAVE SETTINGS
// =========================

function saveSettings() {
    const settings = {
        emailNotifications: emailNotifications.checked,
        darkMode: darkModeToggle.checked,
        defaultResourceType: defaultResourceType.value
    };

    try {
        localStorage.setItem(
            SETTINGS_STORAGE_KEY,
            JSON.stringify(settings)
        );

        applyDarkMode(settings.darkMode);

        showSettingsMessage(
            "Your settings have been saved successfully.",
            "success"
        );

    } catch (error) {
        console.error("Unable to save settings:", error);

        showSettingsMessage(
            "Unable to save settings. Please try again.",
            "error"
        );
    }
}


// =========================
// DARK MODE
// =========================

function applyDarkMode(enabled) {
    window.CampusVaultTheme.applyDarkMode(enabled);
}


// =========================
// CLEAR RECENT HISTORY
// =========================

function clearRecentlyViewed() {
    const confirmed = window.confirm(
        "Are you sure you want to clear your recently viewed resources?"
    );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem(
        "campusVaultRecentlyViewed"
    );

    showSettingsMessage(
        "Your recently viewed history has been cleared.",
        "success"
    );
}


// =========================
// RESET SETTINGS
// =========================

function resetSettings() {
    const confirmed = window.confirm(
        "Reset all settings to their default values?"
    );

    if (!confirmed) {
        return;
    }

    try {
        const reset = window.CampusVaultTheme.resetToSystemPreference();
        if (!reset) {
            showSettingsMessage(
                "Unable to reset settings. Please try again.",
                "error"
            );
            return;
        }

        loadSettings();

        showSettingsMessage(
            "Settings have been restored to their defaults.",
            "success"
        );

    } catch (error) {
        console.error("Unable to reset settings:", error);

        showSettingsMessage(
            "Unable to reset settings. Please try again.",
            "error"
        );
    }
}


// =========================
// STATUS MESSAGE
// =========================

function showSettingsMessage(message, type) {
    settingsMessage.textContent = message;
    settingsMessage.className =
        `settings-message ${type}`;
}


// =========================
// EVENT LISTENERS
// =========================

saveSettingsButton.addEventListener(
    "click",
    saveSettings
);

resetSettingsButton.addEventListener(
    "click",
    resetSettings
);

clearHistoryButton.addEventListener(
    "click",
    clearRecentlyViewed
);


// =========================
// INITIALIZE
// =========================

loadSettings();