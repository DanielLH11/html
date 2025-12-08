const selectLocation = document.querySelector("#filter-location");

selectLocation?.addEventListener("change", (e) => {
    console.log("change event triggered", e.target.value);

    const location = e.target.value;
    const jobsListings = document.querySelectorAll(".job-listing-card");

    jobsListings.forEach(jobListing => {
        const dataModalidad = jobListing.dataset.modalidad;
        const isShown = dataModalidad.includes(location);
        jobListing.classList.toggle("is-hidden", !isShown);
    });
});


const empleosSearchInput = document.querySelector("#empleos-search-input");

empleosSearchInput?.addEventListener("keyup", (e) => {
    const searchQuery = e.target.value;
    const jobsListings = document.querySelectorAll(".job-listing-card");

    jobsListings.forEach(jobListing => {
        const jobTitle = jobListing.getElementsByTagName("h3")[0].textContent;
        const isShown = jobTitle.includes(searchQuery);
        jobListing.classList.toggle("is-hidden", !isShown);
    });
});