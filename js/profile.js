/**
 * CampusVault
 * Student Profile Management
 */

// =========================
// PAGE ELEMENTS
// =========================

const profileForm = document.querySelector("#profile-form");

const fullNameInput = document.querySelector("#full-name");
const emailInput = document.querySelector("#email");
const studentIdInput = document.querySelector("#student-id");
const facultyInput = document.querySelector("#faculty");
const departmentInput = document.querySelector("#department");
const levelInput = document.querySelector("#level");

const displayName = document.querySelector("#profile-display-name");
const displayEmail = document.querySelector("#profile-display-email");

const profileMessage = document.querySelector("#profile-message");
const profileAvatar = document.querySelector(".profile-avatar");


// =========================
// STORAGE KEY
// =========================

const PROFILE_STORAGE_KEY = "campusVaultStudentProfile";


// =========================
// DEFAULT PROFILE
// =========================

const defaultProfile = {
    fullName: "",
    email: "",
    studentId: "",
    faculty: "",
    department: "",
    level: ""
};


// =========================
// GET SAVED PROFILE
// =========================

function getSavedProfile() {
    try {
        const savedProfile = localStorage.getItem(
            PROFILE_STORAGE_KEY
        );

        if (!savedProfile) {
            return { ...defaultProfile };
        }

        const parsedProfile = JSON.parse(savedProfile);

        if (
            !parsedProfile ||
            typeof parsedProfile !== "object" ||
            Array.isArray(parsedProfile)
        ) {
            return { ...defaultProfile };
        }

        return {
            ...defaultProfile,
            ...parsedProfile
        };

    } catch (error) {
        console.error("Unable to load student profile:", error);

        return { ...defaultProfile };
    }
}


// =========================
// UPDATE PROFILE SUMMARY
// =========================

function updateProfileSummary(profile) {
    const name = profile.fullName.trim();
    const email = profile.email.trim();

    displayName.textContent = name || "Student Name";
    displayEmail.textContent = email || "student@example.com";

    profileAvatar.textContent = name
        ? name.charAt(0).toUpperCase()
        : "S";
}


// =========================
// DISPLAY SAVED PROFILE
// =========================

function loadProfile() {
    const profile = getSavedProfile();

    fullNameInput.value = profile.fullName;
    emailInput.value = profile.email;
    studentIdInput.value = profile.studentId;
    facultyInput.value = profile.faculty;
    departmentInput.value = profile.department;
    levelInput.value = profile.level;

    updateProfileSummary(profile);
}


// =========================
// DISPLAY STATUS MESSAGE
// =========================

function showProfileMessage(message, type) {
    profileMessage.textContent = message;
    profileMessage.className = `profile-message ${type}`;
}


// =========================
// SAVE PROFILE
// =========================

profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const profile = {
        fullName: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        studentId: studentIdInput.value.trim(),
        faculty: facultyInput.value.trim(),
        department: departmentInput.value.trim(),
        level: levelInput.value
    };

    if (!profile.fullName || !profile.email) {
        showProfileMessage(
            "Please enter your full name and email address.",
            "error"
        );

        return;
    }

    try {
        localStorage.setItem(
            PROFILE_STORAGE_KEY,
            JSON.stringify(profile)
        );

        updateProfileSummary(profile);

        showProfileMessage(
            "Your profile has been saved successfully.",
            "success"
        );

    } catch (error) {
        console.error("Unable to save student profile:", error);

        showProfileMessage(
            "Your profile could not be saved. Please try again.",
            "error"
        );
    }
});


// =========================
// RESET FORM
// =========================

profileForm.addEventListener("reset", () => {
    window.setTimeout(() => {
        loadProfile();

        profileMessage.textContent = "";
        profileMessage.className = "profile-message";
    }, 0);
});


// =========================
// INITIALIZE PROFILE PAGE
// =========================

loadProfile();