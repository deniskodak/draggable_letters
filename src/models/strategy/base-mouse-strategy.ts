import OutputEl from "../output";
import MouseEventStrategy from "./base-mouse-strategy";
import DragSelectionStrategy from "./drag-selection-strategy";
import LetterMouseStrategy from "./letter-mouse-strategy";

class BaseMouseStrategy implements MouseEventStrategy {
  constructor(private output: OutputEl) {}

  handleMouseDown(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (clickedElement.tagName === "BUTTON") return;

    const isLetterClicked = clickedElement?.classList.contains("letter");

    const strategy = isLetterClicked
      ? new LetterMouseStrategy(this.output)
      : new DragSelectionStrategy(this.output);

    this.output.mouseHandler.setStrategy(strategy);
    this.output.mouseHandler.handleMouseDown(event);
  }
}

export default BaseMouseStrategy;
