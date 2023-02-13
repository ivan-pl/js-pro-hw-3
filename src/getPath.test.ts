import getPath from "./getPath";

const appendElements = (...elements: HTMLElement[]): void =>
  elements.forEach((el) => document.body.append(el));

const checkExpectations = (el: HTMLElement, cssSelector: string): void => {
  expect(getPath(el)).toBe(cssSelector);
  const selectedElements = document.querySelectorAll(cssSelector);
  expect(selectedElements.length).toBe(1);
  expect(selectedElements[0]).toBe(el);
};

describe("getPath()", () => {
  it("returns div", () => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    appendElements(div, p);
    checkExpectations(div, "div");
  });

  it("returns li:nth-child(n)", () => {
    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    ul.append(li1, li2);
    appendElements(ul);
    checkExpectations(li1, "li:nth-child(1)");
    checkExpectations(li2, "li:nth-child(2)");
  });
});
