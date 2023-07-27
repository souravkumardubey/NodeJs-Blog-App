document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.querySelector(".searchBar");
  const searchBtn = document.querySelectorAll(".searchBtn");
  const searchInput = document.getElementById("searchInput");
  const searchClose = document.getElementById("searchClose");

  searchBtn.forEach((element) => {
    element.addEventListener("click", () => {
      searchBar.style.visibility = "visible";
      searchBar.classList.add("open");
      searchInput.focus();
    });
  });

  searchClose.addEventListener("click", () => {
    searchBar.style.visibility = "hidden";
    searchBar.classList.remove("open");
  });
});
