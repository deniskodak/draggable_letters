import { LetterPosition } from "../interfaces";

class LetterElement {
  element: HTMLSpanElement;
  private _isSelected: boolean = false;
  private _isMoving: boolean = false;
  private _lastPosition?: LetterPosition;
  static readonly size = 50;

  constructor(text: string) {
    this.element = document.createElement("span");
    this.element.classList.add("letter");
    this.element.classList.add("absolute");
    this.element.style.width = `${LetterElement.size}px`;
    this.element.style.height = `${LetterElement.size}px`;
    this.element.innerText = text;
    this.element.id = Math.random().toString(36).slice(2);
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  get isMoving(): boolean {
    return this._isMoving;
  }

  get position(): LetterPosition {
    return {
      x: this.element.offsetLeft,
      y: this.element.offsetTop,
    };
  }

  get lastPosition(): typeof this._lastPosition {
    return this._lastPosition;
  }

  get id(): string {
    return this.element.id;
  }

  set isSelected(value: boolean) {
    this._isSelected = value;
    value
      ? this.element.classList.add("selected")
      : this.element.classList.remove("selected");
  }

  set isMoving(value: boolean) {
    this._isMoving = value;
    value
      ? this.element.classList.add("moving")
      : this.element.classList.remove("moving");
  }

  setPosition(position: LetterPosition) {
    this.element.style.left = position.x + "px";
    this.element.style.top = position.y + "px";
  }

  setLastPosition(position: LetterPosition) {
    this._lastPosition = { ...position };
  }

  setSelected(selected: boolean) {
    this.isSelected = selected;
  }

  setIsMoving(isMoving: boolean) {
    this.isMoving = isMoving;
  }
}

export default LetterElement;
