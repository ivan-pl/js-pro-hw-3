export default function getPath(el: HTMLElement): string {
  const curEl = el;
  const uniqueSelector = "";
  do {
    const curSelector = curEl.nodeName.toLowerCase();
    let newSelector = curSelector + uniqueSelector;

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
