const input = document.getElementById("input") as HTMLInputElement;
const preview = document.getElementById("preview") as HTMLDivElement;
const printButton = document.getElementById("print") as HTMLButtonElement;

function setText() {
  textFit(preview, {
    alignHoriz: true,
    alignVert: true,
    alignVertWithFlexbox: true,
  });
}

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

  #preview {
    width: 51mm;
    height: 25mm;
    font-family: Arial;
    line-height: 1;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  @page {
    /* Remove browser default header (title) and footer (url) */
    margin: 0;
}

  @media print {
    @page {
      size: 51mm 25mm;
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
