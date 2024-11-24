import { LetterPosition } from "../interfaces";
import LetterElement from "./letter";
import LetterSelectionManager from "./letter-selection-manager";
import MouseHandler from "./mouse-handler";
import SelectionElement from "./selection";

class OutputEl {
  static instance: null | OutputEl;
  selectionElement = new SelectionElement();
  mouseHandler: MouseHandler;
  private lettersSelectionManager: LetterSelectionManager;

  constructor(public element: HTMLDivElement, letters: LetterElement[]) {
    this.lettersSelectionManager = new LetterSelectionManager(letters);
    this.mouseHandler = new MouseHandler(this);
  }

  get selectionManager(): LetterSelectionManager {
    return this.lettersSelectionManager;
  }

  init() {
    this.cleanupElement();
    this.renderSelection();
    this.renderLetters();
    this.listenMouseDown();
  }

  private cleanupElement() {
    [...this.element.children].forEach((child) => {
      console.log(child.tagName, "child");
      if (child.tagName !== "FORM") this.element.removeChild(child);
    });
    this.element.classList.remove("pending");
  }

  private renderSelection() {
    this.element.append(this.selectionElement.element);
  }

  private renderLetters(): void {
    const letters = this.lettersSelectionManager.letters;
    this.element.append(...letters.map(({ element }) => element));

    letters.forEach((letter, index) => {
      const position = this.getInitialLetterPosition(letters.length, index);
      letter.setPosition(position);
      letter.setLastPosition(position);
    });
  }

  private getInitialLetterPosition = (
    lettersAmount: number,
    letterIndex: number
  ): LetterPosition => {
    const startX =
      this.element.clientWidth / 2 - lettersAmount * LetterElement.size;
    const adjustmentX = LetterElement.size * letterIndex;
    const startY = this.element.clientHeight / 2;
    const adjustmentY = LetterElement.size / 2;
    return {
      x: startX + adjustmentX,
      y: startY - adjustmentY,
    };
  };

  private listenMouseDown() {
    this.element.onmousedown = this.mouseHandler.handleMouseDown;
  }
}

export default OutputEl;
