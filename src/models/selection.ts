class SelectionElement {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("selection");
    this.element.classList.add("hidden");
  }

  showSelection() {
    this.element.classList.remove("hidden");
  }

  hideSelection() {
    this.setSize(0, 0);
    this.element.classList.add("hidden");
  }

  setPosition(x: number, y: number) {
    this.element.style.left = x + "px";
    this.element.style.top = y + "px";
  }

  setSize(width: number, height: number) {
    this.element.style.width = width + "px";
    this.element.style.height = height + "px";
  }
}

export default SelectionElement;
