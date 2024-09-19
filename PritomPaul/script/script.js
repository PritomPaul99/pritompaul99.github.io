window.onscroll = function () {
  showGoToTopButton();
};

function showGoToTopButton() {
  var button = document.getElementById("goToTopBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.classList.add("show");
  } else {
    button.classList.remove("show");
  }
}

function goToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
