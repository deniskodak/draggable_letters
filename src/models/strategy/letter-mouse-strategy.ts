import { checkOverlap } from "../../helpers";
import { LetterPosition, MouseEventStrategy } from "../../interfaces";
import LetterElement from "../letter";
import LetterSelectionManager from "../letter-selection-manager";
import OutputEl from "../output";
import BaseMouseStrategy from "./base-mouse-strategy";

class LetterMouseStrategy implements MouseEventStrategy {
  constructor(private output: OutputEl) {}

  get selectionManager(): LetterSelectionManager {
    return this.output.selectionManager;
  }

  get letters(): LetterElement[] {
    return this.output.selectionManager.letters;
  }
  get selectedLetters(): LetterElement[] {
    return this.output.selectionManager.selectedLetters;
  }

  handleMouseDown({ target, ctrlKey }: MouseEvent) {
    const letter = this.selectionManager.getLetterById(
      (target as HTMLElement).id
    );
    if (!letter) return;

    if (!letter.isSelected && !ctrlKey) this.selectionManager.clearSelection();

    letter.setLastPosition(letter.position);

    const shouldSelect = ctrlKey ? !letter.isSelected : true;

    this.selectionManager.setLetterSelection(shouldSelect, letter);
    this.output.element.onmousemove = this.createHandleMouseMove(letter);
    this.output.element.onmouseup = this.createHandleMouseUp(letter);
  }

  private createHandleMouseMove =
    (letter: LetterElement) =>
    ({ clientX, clientY }: MouseEvent) => {
      if (!letter.isMoving) letter.setIsMoving(true);

      const position = this.getAdjustedPosition(letter, clientX, clientY);

      letter.setPosition(position);

      if (this.selectedLetters.length)
        this.handleMoveSelectedLetters(position, letter);
    };

  private createHandleMouseUp =
    (letter: LetterElement) =>
    ({ ctrlKey }: MouseEvent) => {
      this.selectedLetters.forEach(this.handleSelectedLetterOverlap);

      if (!ctrlKey && !letter.isMoving) this.selectionManager.clearSelection();
      if (letter.isMoving) letter.setIsMoving(false);

      this.output.element.onmousemove = null;
      this.output.element.onmouseup = null;
      this.output.mouseHandler.setStrategy(new BaseMouseStrategy(this.output));
    };

  private handleMoveSelectedLetters(
    position: LetterPosition,
    letter: LetterElement
  ): void {
    this.selectedLetters.forEach((item) => {
      if (item === letter) return;

      const differenceX = item.lastPosition!.x - letter.lastPosition!.x;
      const differenceY = item.lastPosition!.y - letter.lastPosition!.y;

      item.setPosition({
        x: position.x + differenceX,
        y: position.y + differenceY,
      });
    });
  }

  private handleSelectedLetterOverlap = (letter: LetterElement) => {
    const overlappedLetter = this.letters.find((item) =>
      this.getOverlappedLetter(item, letter)
    );

    if (overlappedLetter) this.swapLettersPosition(letter, overlappedLetter);
    else letter.setLastPosition(letter.position);
  };

  private getAdjustedPosition(
    letter: LetterElement,
    clientX: number,
    clientY: number
  ): LetterPosition {
    return {
      x: clientX - letter.element.offsetWidth / 2,
      y: clientY - letter.element.offsetHeight / 2,
    };
  }

  private getOverlappedLetter(
    staticLetter: LetterElement,
    movedLetter: LetterElement
  ): boolean {
    return staticLetter !== movedLetter
      ? checkOverlap(movedLetter.element, staticLetter.element)
      : false;
  }

  private swapLettersPosition(
    movedLetter: LetterElement,
    staticLetter: LetterElement
  ): void {
    const moveLetterPosition = movedLetter.lastPosition;
    const staticLetterPosition = staticLetter.lastPosition;
    if (!moveLetterPosition || !staticLetterPosition) return;

    movedLetter.setPosition(staticLetterPosition);
    staticLetter.setPosition(moveLetterPosition);
    movedLetter.setLastPosition(staticLetterPosition);
    staticLetter.setLastPosition(moveLetterPosition);
  }
}

export default LetterMouseStrategy;
