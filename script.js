"use strict";
const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const main = document.querySelector("main");
let search = document.querySelector(".search");
let serchby = document.getElementById("serched_by");

fetch(APIURL)
  .then((response) => response.json())
  .then((data) => {
    let results = data.results;
    results = results.sort((a, b) =>
      a.vote_average < b.vote_average
        ? 1
        : b.vote_average < a.vote_average
        ? -1
        : 0
    ); // sorting from hi to low
    // console.log(results);
    loadMovies(results);
    movieSearch(results);
  })
  .catch((error) => console.log(error));

function movieSearch(arr) {
  search.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      let newarr = arr.filter((x) => {
        return x.original_title
          .toLowerCase()
          .includes(search.value.toLowerCase());
      });
      if (search.value == "") {
        serchby.innerText = "Popularity";
      } else {
        serchby.innerText = search.value;
      }
      loadMovies(newarr);
    }
  });
}

function loadMovies(array) {
  main.innerHTML = "";
  array.map((x) => {
    let color = "green";
    if (x.vote_average >= 8) {
      color = "green";
    } else if (x.vote_average >= 5 && x.vote_average < 8) {
      color = "orange";
    } else {
      color = "red";
    }

    let createMovie = document.createElement("div");
    createMovie.classList.add("movie");
    createMovie.innerHTML = `
        <img src="${IMGPATH + x.poster_path}" alt="${x.original_title}">
          <div class="movie-info">
              <h3>${x.original_title}</h3>
              <span class="${color}">${x.vote_average}</span>
          </div>
          <div class="overview">
              <h3>Overview:</h3>
              <p>${x.overview}</p>
          </div>
        `;
    main.append(createMovie);
  });
}
