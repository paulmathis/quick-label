function $<T extends Element>(selector: string): T {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Element with selector ${selector} not found`);
  }
  return element as T;
}

const input = $<HTMLInputElement>("#input");
const preview = $<HTMLDivElement>("#preview");
const printButton = $<HTMLButtonElement>("#print");
const widthInput = $<HTMLInputElement>("#width");
const heightInput = $<HTMLInputElement>("#height");
const previewWrapper = $<HTMLDivElement>(".preview-wrapper");
const previewWrapperWrapper = $<HTMLDivElement>(".preview-wrapper-wrapper");

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

setText();

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

  </style></head><body>`);
  mywindow.document.write(document.getElementById(elem)!.outerHTML);
  mywindow.document.write("</body></html>");

  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  mywindow.close();

  return true;
}

input.oninput = (event) => {
  const target = event.target as HTMLInputElement;
  preview.innerText = target.value;
  setText();
};

printButton.onclick = () => {
  printElem("preview");
};

window.onresize = () => {
  setText();
};

widthInput.oninput = (event) => {
  const target = event.target as HTMLInputElement;
  width = target.value;
  preview.style.width = `${width}mm`;
  setText();
};

heightInput.oninput = (event) => {
  const target = event.target as HTMLInputElement;
  height = target.value;
  preview.style.height = `${height}mm`;
  setText();
};
