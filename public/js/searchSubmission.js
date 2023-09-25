// IIFE
(() => {
    const searchForm = document.querySelector('#searchForm');
    const searchInput = document.querySelector('#searchInput');
    searchForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const searchRequestURL = `${window.location.origin}/search/${searchInput.value}`;
        // redirect to search results page
        window.location.href = searchRequestURL;
    })
})();