/**
 * CampusVault
 * Global Theme Management
 */

(function () {
    const SETTINGS_STORAGE_KEY = "campusVaultSettings";
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    let darkModePreference = readDarkModePreference();
    let isDarkMode = darkModePreference ?? colorScheme.matches;

    function readSettings() {
        try {
            const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
            if (!savedSettings) {
                return {};
            }

            const settings = JSON.parse(savedSettings);
            if (!settings || typeof settings !== "object" || Array.isArray(settings)) {
                throw new TypeError("Saved settings must be an object.");
            }

            return settings;
        } catch (error) {
            console.error("Unable to read saved theme settings:", error);
            return null;
        }
    }

    function readDarkModePreference() {
        const settings = readSettings();
        return settings && typeof settings.darkMode === "boolean"
            ? settings.darkMode
            : null;
    }

    function updateThemeControls() {
        document.querySelectorAll(".theme-toggle").forEach((toggle) => {
            const label = toggle.querySelector(".theme-toggle-label");
            const icon = toggle.querySelector(".theme-toggle-icon");

            toggle.setAttribute("aria-pressed", String(isDarkMode));
            toggle.setAttribute(
                "aria-label",
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            );

            if (label) {
                label.textContent = isDarkMode ? "Light mode" : "Dark mode";
            }

            if (icon) {
                icon.textContent = isDarkMode ? "☀" : "☾";
            }
        });

        const settingsToggle = document.querySelector("#dark-mode");
        if (settingsToggle) {
            settingsToggle.checked = isDarkMode;
        }
    }

    function renderTheme() {
        document.body.classList.toggle("dark-mode", isDarkMode);
        document.documentElement.style.colorScheme = isDarkMode ? "dark" : "light";
        updateThemeControls();
    }

    function savePreference(enabled) {
        const settings = readSettings();
        if (!settings) {
            return false;
        }

        try {
            localStorage.setItem(
                SETTINGS_STORAGE_KEY,
                JSON.stringify({ ...settings, darkMode: enabled })
            );
            return true;
        } catch (error) {
            console.error("Unable to save the theme preference:", error);
            return false;
        }
    }

    function setDarkMode(enabled) {
        isDarkMode = enabled;
        darkModePreference = enabled;
        renderTheme();
        return savePreference(enabled);
    }

    function resetToSystemPreference() {
        try {
            localStorage.removeItem(SETTINGS_STORAGE_KEY);
        } catch (error) {
            console.error("Unable to reset saved theme settings:", error);
            return false;
        }

        darkModePreference = null;
        isDarkMode = colorScheme.matches;
        renderTheme();
        return true;
    }

    function syncFromStorage() {
        darkModePreference = readDarkModePreference();
        isDarkMode = darkModePreference ?? colorScheme.matches;
        renderTheme();
    }

    window.CampusVaultTheme = {
        applyDarkMode(enabled) {
            isDarkMode = enabled;
            darkModePreference = enabled;
            renderTheme();
        },
        isDarkMode() {
            return isDarkMode;
        },
        resetToSystemPreference,
        setDarkMode
    };

    document.querySelectorAll(".theme-toggle").forEach((toggle) => {
        toggle.addEventListener("click", () => {
            setDarkMode(!isDarkMode);
        });
    });

    const settingsToggle = document.querySelector("#dark-mode");
    if (settingsToggle) {
        settingsToggle.addEventListener("change", () => {
            setDarkMode(settingsToggle.checked);
        });
    }

    window.addEventListener("storage", (event) => {
        if (event.key === SETTINGS_STORAGE_KEY) {
            syncFromStorage();
        }
    });

    function handleColorSchemeChange() {
        if (darkModePreference === null) {
            isDarkMode = colorScheme.matches;
            renderTheme();
        }
    }

    if (typeof colorScheme.addEventListener === "function") {
        colorScheme.addEventListener("change", handleColorSchemeChange);
    } else {
        colorScheme.addListener(handleColorSchemeChange);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", renderTheme, { once: true });
    } else {
        renderTheme();
    }
})();
