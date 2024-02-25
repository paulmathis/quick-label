const input = document.getElementById("input") as HTMLInputElement;
const preview = document.getElementById("preview") as HTMLDivElement;
const printButton = document.getElementById("print") as HTMLButtonElement;
const widthInput = document.getElementById("width") as HTMLInputElement;
const heightInput = document.getElementById("height") as HTMLInputElement;
const previewWrapper = document.querySelector(
  ".preview-wrapper"
) as HTMLDivElement;
const previewWrapperWrapper = document.querySelector(
  ".preview-wrapper-wrapper"
) as HTMLDivElement;

let width = "51";
let height = "25";

input.value = "Hello, World!";
widthInput.value = width;
heightInput.value = height;

preview.style.width = `${width}mm`;
preview.style.height = `${height}mm`;
preview.style.fontFamily = "Arial";
preview.style.lineHeight = "1";

function setText() {
  textFit(preview, {
    alignHoriz: true,
    alignVert: true,
  });

  // scale previewWrapper to fit in previewWrapperWrapper
  const scale = Math.min(
    previewWrapperWrapper.clientWidth / previewWrapper.clientWidth,
    previewWrapperWrapper.clientHeight / previewWrapper.clientHeight
  );
  previewWrapper.style.transform = `scale(${scale})`;

  // center previewWrapper in previewWrapperWrapper
  previewWrapper.style.transformOrigin = "0 center";
}

window.onresize = () => {
  setText();
};

widthInput.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  width = target.value;
  preview.style.width = `${width}mm`;
  setText();
});

heightInput.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  height = target.value;
  preview.style.height = `${height}mm`;
  setText();
});

setText();

input.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  preview.innerText = target.value;
  setText();
});

function printElem(elem: string) {
  const mywindow = window.open("", "PRINT", "height=400,width=600")!;

  mywindow.document.write(`<html><head><style>
  .textFitAlignVert {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .textFitAlignVertFlex {
    display: flex;
  }

  .textFitAlignVertFlex .textFitAlignVert {
    position: static;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  @page {
    margin: 0;
  }

  @media print {
    @page {
      size: ${width}mm ${height}mm;
    }
  }
  
  </style></head><body>`);
  mywindow.document.write(document.getElementById(elem)!.outerHTML);
  mywindow.document.write("</body></html>");

  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  mywindow.close();

  return true;
}

printButton.addEventListener("click", () => {
  printElem("preview");
});
