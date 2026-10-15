/**
 * CampusVault
 * Resource Listing Renderer
 *
 * Builds the cards on pages/resources.html from the shared
 * dataset in js/resource-data.js, so the catalogue is defined
 * in exactly one place instead of also living as static markup.
 *
 * The generated markup keeps the structure the page has always
 * used: article.resource-card carrying data-type, data-level and
 * data-session attributes, which js/resource-filters.js reads.
 *
 * Load order: resource-data.js -> resource-list.js -> resource-filters.js
 */


/* =========================
   TEXT ESCAPING
========================= */

function escapeResourceText(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

}


/* =========================
   CARD MARKUP
========================= */

function buildResourceCard(id, resource) {

    const href =
        "resources-details.html?id=" +
        encodeURIComponent(id).replace(/%2F/gi, "/");

    return `
                            <article
                                 class="resource-card"
                                 data-type="${escapeResourceText(resource.filterType)}"
                                 data-level="${escapeResourceText(resource.filterLevel)}"
                                 data-session="${escapeResourceText(resource.filterSession)}"
                            >

                                <div class="resource-card-top">
                                    <span class="resource-type">
                                        ${escapeResourceText(resource.type)}
                                    </span>

                                    <span class="file-type">
                                        ${escapeResourceText(resource.fileType)}
                                    </span>
                                </div>

                                <h3>
                                    ${escapeResourceText(resource.title)}
                                </h3>

                                <p class="resource-course">
                                    ${escapeResourceText(resource.course)}
                                </p>

                                <div class="resource-meta">

                                    <span>
                                        ${escapeResourceText(resource.level)}
                                    </span>

                                    <span>
                                        ${escapeResourceText(resource.session)}
                                    </span>

                                </div>

                                <div class="resource-card-footer">

                                    <span>
                                        ${escapeResourceText(resource.uploaded)}
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

function renderResourceListing() {

    const grid =
        document.querySelector("#resource-grid");

    if (!grid) {
        return;
    }

    if (typeof CAMPUSVAULT_RESOURCES === "undefined") {
        console.error(
            "Resource data is missing. " +
            "Load js/resource-data.js before js/resource-list.js."
        );
        return;
    }

    const cards =
        CAMPUSVAULT_RESOURCE_IDS.map((id) =>
            buildResourceCard(id, CAMPUSVAULT_RESOURCES[id])
        ).join("\n\n");

    const noResultsMessage =
        document.querySelector("#no-results-message");

    if (noResultsMessage) {
        noResultsMessage.insertAdjacentHTML(
            "beforebegin",
            cards
        );
    } else {
        grid.insertAdjacentHTML("beforeend", cards);
    }

}


renderResourceListing();
