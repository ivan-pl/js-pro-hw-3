export default function getPath(el: HTMLElement): string {
  const curEl = el;
  const uniqueSelector = "";
  do {
    let curSelector = curEl.nodeName.toLowerCase();
    let newSelector = curSelector + uniqueSelector;

    if (isUniqueSelector(newSelector)) return newSelector;

    const className = getClassName(curEl);
    curSelector += className;
    newSelector = curSelector;
    if (isUniqueSelector(newSelector)) return newSelector;

    const nthChildClass = getNthChildSelector(curEl, newSelector);
    if (nthChildClass) {
      newSelector = curSelector + nthChildClass;
      if (isUniqueSelector(newSelector)) return newSelector;
    }
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

  const ind = [...parent.childNodes].indexOf(childEl);
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
