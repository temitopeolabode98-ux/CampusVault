/**
 * CampusVault
 * Course Listing Renderer
 *
 * Builds the course cards on pages/courses.html from the shared
 * dataset in js/resource-data.js, so the course catalogue is
 * derived from the resources that actually exist instead of being
 * a second hand-maintained list.
 *
 * A course only appears if at least one real resource references
 * it, and the resource count shown is the number of those real
 * resources. No course or course material is invented.
 *
 * Load order: resource-data.js -> course-list.js
 */


/* =========================
   TEXT ESCAPING
========================= */

function escapeCourseText(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

}


/* =========================
   GROUP RESOURCES BY COURSE
========================= */

function groupResourcesByCourse() {

    const courses = new Map();

    CAMPUSVAULT_RESOURCE_IDS.forEach((id) => {

        const resource = CAMPUSVAULT_RESOURCES[id];
        const code = String(resource.course).trim();

        if (!courses.has(code)) {
            courses.set(code, {
                code: code,
                // Full course name falls back to the code if a
                // resource does not carry a distinct title.
                name: resource.title,
                resources: []
            });
        }

        const course = courses.get(code);

        // Prefer the resource title as the course name; the first
        // resource for a course is the best name we actually have.
        if (course.name === code && resource.title) {
            course.name = resource.title;
        }

        course.resources.push({
            id: id,
            type: resource.type,
            level: resource.level,
            session: resource.session
        });

    });

    // Stable ordering by course code.
    return Array.from(courses.values())
        .sort((a, b) => a.code.localeCompare(b.code));

}


/* =========================
   COURSE CARD MARKUP
========================= */

function buildCourseCard(course) {

    const count = course.resources.length;

    const searchHref =
        "resources.html?search=" +
        encodeURIComponent(course.code);

    const countLabel =
        count === 1
            ? "1 resource"
            : count + " resources";

    // A short, unique marker for the course icon: the alphabetic
    // prefix of the code (e.g. "CSC 301" -> "CS").
    const initials = course.code
        .replace(/[^A-Za-z]/g, "")
        .slice(0, 2)
        .toUpperCase() || "CV";

    return `
                    <article class="course-card">

                        <div class="course-icon">
                            ${escapeCourseText(initials)}
                        </div>

                        <div class="course-content">

                            <span class="course-code">
                                ${escapeCourseText(course.code)}
                            </span>

                            <h3>
                                ${escapeCourseText(course.name)}
                            </h3>

                            <p>
                                ${escapeCourseText(countLabel)}
                            </p>

                        </div>

                        <a
                            href="${searchHref}"
                            class="course-link"
                            aria-label="View resources for ${escapeCourseText(course.code)}"
                        >
                            &rarr;
                        </a>

                    </article>`;

}


/* =========================
   RENDER LISTING
========================= */

function renderCourseListing() {

    const grid =
        document.querySelector("#course-grid");

    if (!grid) {
        return;
    }

    if (typeof CAMPUSVAULT_RESOURCES === "undefined") {
        console.error(
            "Resource data is missing. " +
            "Load js/resource-data.js before js/course-list.js."
        );
        return;
    }

    const courses =
        groupResourcesByCourse();

    const totalCount =
        CAMPUSVAULT_RESOURCE_IDS.length;

    const courseCount =
        document.querySelector("#course-count");

    if (courseCount) {
        courseCount.textContent =
            courses.length === 1
                ? "1 Course"
                : courses.length + " Courses";
    }

    const resourceTotal =
        document.querySelector("#course-resource-total");

    if (resourceTotal) {
        resourceTotal.textContent =
            totalCount === 1
                ? "1 resource"
                : totalCount + " resources";
    }

    const emptyMessage =
        document.querySelector("#course-empty-message");

    if (courses.length === 0) {
        if (emptyMessage) {
            emptyMessage.hidden = false;
        }
        return;
    }

    const cards =
        courses.map(buildCourseCard).join("\n\n");

    grid.insertAdjacentHTML("beforeend", cards);

}


renderCourseListing();
