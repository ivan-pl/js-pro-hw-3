import getPath from "./getPath";

const appendElements = (elements: HTMLElement[]): void =>
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
    appendElements([div, p]);
    checkExpectations(div, "div");
  });
});
