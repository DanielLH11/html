// const jobListingsSection = document.querySelector(".jobs-listings");

// console.log(" fetching data...");

// fetch("./data.json")
//     .then(response => response.json())
//     .then(jobsData => {
//         console.log("data fetched", jobsData);

//         jobsData.forEach(job => {
//             jobListingsSection.innerHTML += `
//                 <article data-modalidad="${job.data.modalidad}" data-nivel="${job.data.nivel}" data-technology="${job.data.technology}" class="job-listing-card">
//                     <div>
//                         <h3>${job.titulo}</h3>
//                         <small>${job.empresa} | ${job.ubicacion}</small>
//                         <p>${job.descripcion}</p>
//                     </div>
//                     <button class="button-apply-job" id="boton-importante">Aplicar</button>
//                 </article>
//             `;
//         });
//     });

// console.log("end of fetching data");