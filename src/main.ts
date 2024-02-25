const input = document.getElementById("input") as HTMLInputElement;
const preview = document.getElementById("preview") as HTMLDivElement;

function setText() {
  textFit(preview, {
    alignHoriz: true,
    alignVert: true,
  });
}

setText();

input.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  preview.innerText = target.value;
  setText();
});
