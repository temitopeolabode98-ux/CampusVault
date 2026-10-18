/**
 * CampusVault
 * Past Questions Listing Renderer
 *
 * Builds the past-question cards on pages/past-questions.html from
 * the shared dataset in js/resource-data.js.
 *
 * Only resources whose existing `filterType` is "past-questions"
 * are displayed, so the page never shows a resource that is not
 * already categorized as a past question. No documents are
 * invented; if the archive is small, the page says so honestly.
 *
 * Load order: resource-data.js -> past-questions-list.js
 */


/* =========================
   TEXT ESCAPING
========================= */

function escapePastQuestionText(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

}


/* =========================
   PAST QUESTION CARD MARKUP
========================= */

function buildPastQuestionCard(id, resource) {

    const href =
        "resources-details.html?id=" +
        encodeURIComponent(id).replace(/%2F/gi, "/");

    return `
                            <article
                                class="resource-card"
                                data-type="${escapePastQuestionText(resource.filterType)}"
                                data-level="${escapePastQuestionText(resource.filterLevel)}"
                                data-session="${escapePastQuestionText(resource.filterSession)}"
                            >

                                <div class="resource-card-top">
                                    <span class="resource-type">
                                        ${escapePastQuestionText(resource.type)}
                                    </span>

                                    <span class="file-type">
                                        ${escapePastQuestionText(resource.fileType)}
                                    </span>
                                </div>

                                <h3>
                                    ${escapePastQuestionText(resource.title)}
                                </h3>

                                <p class="resource-course">
                                    ${escapePastQuestionText(resource.course)}
                                </p>

                                <div class="resource-meta">

                                    <span>
                                        ${escapePastQuestionText(resource.level)}
                                    </span>

                                    <span>
                                        ${escapePastQuestionText(resource.session)}
                                    </span>

                                </div>

                                <div class="resource-card-footer">

                                    <span>
                                        ${escapePastQuestionText(resource.uploaded)}
                                    </span>

                                    <a
                                        href="${href}"
                                        class="btn btn-primary"
                                    >
                                        View
                                    </a>

                                </div>

                            </article>`;

}


/* =========================
   RENDER LISTING
========================= */

function renderPastQuestionListing() {

    const grid =
        document.querySelector("#past-question-grid");

    if (!grid) {
        return;
    }

    if (typeof CAMPUSVAULT_RESOURCES === "undefined") {
        console.error(
            "Resource data is missing. " +
            "Load js/resource-data.js before js/past-questions-list.js."
        );
        return;
    }

    const ids =
        CAMPUSVAULT_RESOURCE_IDS.filter(
            (id) =>
                CAMPUSVAULT_RESOURCES[id].filterType ===
                "past-questions"
        );

    const countLabel =
        document.querySelector("#past-question-count");

    if (countLabel) {
        countLabel.textContent =
            ids.length === 1
                ? "1 Resource"
                : ids.length + " Resources";
    }

    const emptyMessage =
        document.querySelector("#past-question-empty-message");

    if (ids.length === 0) {
        if (emptyMessage) {
            emptyMessage.hidden = false;
        }
        return;
    }

    const cards =
        ids.map((id) =>
            buildPastQuestionCard(
                id,
                CAMPUSVAULT_RESOURCES[id]
            )
        ).join("\n\n");

    grid.insertAdjacentHTML("beforeend", cards);

}


renderPastQuestionListing();
