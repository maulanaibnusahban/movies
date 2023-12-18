// // http://www.omdbapi.com/?apikey=c982a0af&s=harry potter
// $(".search-button").on("click", function () {
//   $.ajax({
//     url: "http://www.omdbapi.com/?apikey=c982a0af&s=" + $(".input-keyword").val(), //&page=1&r=9
//     success: (result) => {
//       const movies = result.Search;
//       let cards = "";
//       movies.forEach((m) => {
//         cards += lihatKartu(m);
//       });
//       $(".movie-container").html(cards);

//       // Ketika detail onclick
//       $(".modal-detail-button").on("click", function () {
//         // console.log($(this).data("imdbid")); // Mengambil data tiap tombol
//         $.ajax({
//           url: "http://www.omdbapi.com/?apikey=c982a0af&i=" + $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetail = detail(m);
//             $(".modal-body").html(movieDetail);
//           },
//           eror: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     eror: (e) => {
//       console.log(e.responseText);
//     },
//   });

// });

// // Fetch
// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   const inputKey = document.querySelector(".input-keyword");
//   fetch("http://www.omdbapi.com/?apikey=c982a0af&s=" + inputKey.value)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let card = "";
//       movies.forEach((m) => (card += lihatKartu(m)));
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = card;

//       // onclick detail
//       const detailButton = document.querySelectorAll(".modal-detail-button");
//       detailButton.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=c982a0af&i=" + imdbid)
//             .then((response) => response.json())
//             .then((m) => {
//               const modalDetail = detail(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = modalDetail;
//             });
//         });
//       });
//     });
// });

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKey = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKey.value);
  updateUI(movies);
});

// event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateDetail(movieDetail);
  } else {
  }
});

// Function Function
function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=c982a0af&s=" + keyword)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUI(movies) {
  let card = "";
  movies.forEach((m) => (card += lihatKartu(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = card;
}

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=c982a0af&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateDetail(m) {
  const modalDetail = detail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = modalDetail;
}

function lihatKartu(m) {
  return `<div class="col-md-4 my-3">
    <div class="card">
        <img src="${m.Poster}" class="card-img-top" />
        <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
            <a href="#" data-bs-toggle="modal" data-bs-target="#modal" data-imdbid="${m.imdbID}" class="btn btn-primary modal-detail-button">Show Details</a>
        </div>
    </div>
  </div>`;
}

function detail(m) {
  return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
        <img src="${m.Poster}" alt="" class="img-fluid" />
        </div>
        <div class="col-md">
        <ul class="list-group">
            <li class="list-group-item">
            <h4><strong>${m.Title} (${m.Year})</strong></h4>
            </li>
            <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
            <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
            <li class="list-group-item"><strong>Weiter : </strong>${m.Writer}</li>
            <li class="list-group-item">
            <strong>Plot : </strong><br />
            ${m.Plot}
            </li>
        </ul>
        </div>
    </div>
  </div>`;
}
