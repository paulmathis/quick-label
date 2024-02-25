interface textFitOptions {
  alignVert?: boolean;
  alignHoriz?: boolean;
  multiLine?: boolean;
  detectMultiLine?: boolean;
  minFontSize?: number;
  maxFontSize?: number;
  reProcess?: boolean;
  widthOnly?: boolean;
  alignVertWithFlexbox?: boolean;
}

function textFit(
  els: Element | Element[] | NodeListOf<Element> | HTMLCollection | null,
  options?: textFitOptions
): void;
