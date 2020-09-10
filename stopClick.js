// let listSopClick = document.getElementsByClassName("js-stopClick");
function stopClick(root) {
  root.querySelectorAll(".js-stopClick").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
}

export { stopClick };
