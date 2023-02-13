export default function getPath(el: HTMLElement): string {
  let curEl = el;
  let uniqueSelector = "";
  do {
    let curSelector = curEl.nodeName.toLowerCase();
    let newUniqueSelector =
      curSelector + `${uniqueSelector ? " " + uniqueSelector : ""}`;

    if (isUniqueSelector(newUniqueSelector)) return newUniqueSelector;

    const className = getClassName(curEl);
    curSelector += className;
    newUniqueSelector =
      curSelector + `${uniqueSelector ? " " + uniqueSelector : ""}`;
    if (isUniqueSelector(newUniqueSelector)) return newUniqueSelector;

    const nthChildClass = getNthChildSelector(curEl, newUniqueSelector);
    if (nthChildClass) {
      newUniqueSelector =
        curSelector +
        nthChildClass +
        `${uniqueSelector ? " " + uniqueSelector : ""}`;
    }

    uniqueSelector = newUniqueSelector;
    curEl = curEl.parentElement!;
  } while (!isUniqueSelector(uniqueSelector));

  return uniqueSelector;
}

function isUniqueSelector(cssSelector: string): boolean {
  return document.querySelectorAll(cssSelector).length === 1;
}

function getNthChildSelector(
  childEl: HTMLElement,
  cssSelector: string
): string {
  const parent = childEl.parentElement;
  if (!parent || parent.querySelectorAll(cssSelector).length === 1) {
    return "";
  }

  const ind = [...parent.children].indexOf(childEl);
  return `:nth-child(${ind + 1})`;
}

function getClassName(el: HTMLElement): string {
  const classList = [...el.classList];
  if (classList.length === 0) {
    return "";
  }

  const nodeName = el.nodeName;
  const classCounter: { [className: string]: number } = {};
  for (const className of classList) {
    classCounter[className] = document.querySelectorAll(
      `${nodeName}.${className}`
    ).length;
  }

  const rarestClassName = Object.entries(classCounter).reduce(
    ([prevClassName, prevCount], [className, count]) =>
      prevCount <= count ? [prevClassName, prevCount] : [className, count]
  )[0];

  return `.${rarestClassName}`;
}
