/**
 * CampusVault
 * Homepage Resource Search
 */

const searchForm = document.querySelector("#resource-search-form");
const searchInput = document.querySelector("#resource-search");
const searchMessage = document.querySelector("#search-message");

if (searchForm && searchInput && searchMessage) {

    searchForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const searchTerm = searchInput.value.trim();

        // Check if the search field is empty
        if (!searchTerm) {

            searchMessage.textContent =
                "Please enter a course, resource, or keyword to search.";

            searchMessage.className = "search-message error";

            searchInput.focus();

            return;
        }

        // Redirect to the Resources page with the search term
        const destination = new URL(
            "pages/resources.html",
            window.location.href
        );

        destination.searchParams.set("search", searchTerm);

        window.location.href = destination.href;

    });

}