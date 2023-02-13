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
  beforeEach(() => {
    document.body.innerHTML = "";
  });

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

  it("returns div.some-class", () => {
    const div1 = document.createElement("div");
    div1.classList.add("some-class");
    const div2 = document.createElement("div");
    appendElements(div1, div2);
    checkExpectations(div1, "div.some-class");
  });

  it("returns main div", () => {
    const main = document.createElement("main");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    main.append(div1);
    appendElements(main, div2);
    checkExpectations(div1, "main div");
  });

  it("returns ul:nth-child(2) li.some-class:nth-child(3)", () => {
    const html = `
      <article>
        <ul>
          <li class="some-class">1</li>
          <li class="some-class">2</li>
          <li class="some-class">3</li>
        </ul>
        <ul>
          <li class="some-class">1</li>
          <li class="some-class">2</li>
          <li class="some-class" id="test-id">3</li>
        </ul>
      </article>
    `;
    document.body.innerHTML = html;
    const el = document.getElementById("test-id")!;
    checkExpectations(el, "ul:nth-child(2) li.some-class:nth-child(3)");
  });
});
