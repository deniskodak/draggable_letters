import { checkOverlap } from "../../helpers";
import { MouseEventStrategy } from "../../interfaces";
import LetterElement from "../letter";
import LetterSelectionManager from "../letter-selection-manager";
import OutputEl from "../output";
import SelectionElement from "../selection";
import BaseMouseStrategy from "./base-mouse-strategy";

class DragSelectionStrategy implements MouseEventStrategy {
  private initialX = 0;
  private initialY = 0;
  private sessionLetters = new Map<string, boolean>();

  constructor(private output: OutputEl) {}

  get selectionElement(): SelectionElement {
    return this.output.selectionElement;
  }

  get selectionManager(): LetterSelectionManager {
    return this.output.selectionManager;
  }

  get letters(): LetterElement[] {
    return this.selectionManager.letters;
  }

  handleMouseDown({ clientX, clientY, ctrlKey }: MouseEvent) {
    this.initialX = clientX;
    this.initialY = clientY;
    this.selectionElement.showSelection();
    this.selectionElement.setPosition(this.initialX, this.initialY);

    if (!ctrlKey) this.selectionManager.clearSelection();

    this.output.element.onmousemove = this.handleMouseMove;
    this.output.element.onmouseup = this.handleMouseUp;
  }

  private handleMouseMove = ({ clientX, clientY, ctrlKey }: MouseEvent) => {
    const minX = Math.min(this.initialX, clientX);
    const maxX = Math.max(this.initialX, clientX);
    const minY = Math.min(this.initialY, clientY);
    const maxY = Math.max(this.initialY, clientY);

    this.selectionElement.setPosition(minX, minY);
    this.selectionElement.setSize(maxX - minX, maxY - minY);

    this.letters.forEach((letter) =>
      this.handleCheckLetterOverlap(letter, ctrlKey)
    );
  };

  private handleMouseUp = () => {
    this.output.element.onmousemove = null;
    this.output.element.onmouseup = null;
    this.selectionElement.hideSelection();
    this.sessionLetters.clear();
    this.output.mouseHandler.setStrategy(new BaseMouseStrategy(this.output));
  };

  private handleCheckLetterOverlap(
    letter: LetterElement,
    isCtrlKeyPressed: boolean
  ) {
    const isOverlapped = this.isLetterOverlapped(letter);

    if (!isCtrlKeyPressed) return this.setLetterState(isOverlapped, letter);

    if (isOverlapped && !this.sessionLetters.has(letter.id)) {
      this.sessionLetters.set(letter.id, letter.isSelected);
    }

    if (!this.sessionLetters.has(letter.id)) return;

    const sessionLetterState = !!this.sessionLetters.get(letter.id);
    const newLetterState = isOverlapped
      ? !sessionLetterState
      : sessionLetterState;

    if (newLetterState !== letter.isSelected)
      this.setLetterState(newLetterState, letter);
  }

  private isLetterOverlapped(letter: LetterElement): boolean {
    return checkOverlap(this.selectionElement.element, letter.element);
  }

  private setLetterState(newState: boolean, letter: LetterElement): void {
    this.selectionManager.setLetterSelection(newState, letter);
  }
}

export default DragSelectionStrategy;
