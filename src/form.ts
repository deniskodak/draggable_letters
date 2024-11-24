import { LetterElement } from "./models";
import OutputEl from "./models/output";

export interface InputForm {
  phrase: string;
}

export function setupFormListening(
  formElement: HTMLFormElement,
  outputElement: HTMLDivElement
) {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(
      new FormData(formElement)
    ) as unknown as InputForm;
    const string = formData.phrase ?? "";

    const letters = string.split("").map((letter) => {
      return new LetterElement(letter);
    });

    const output = new OutputEl(outputElement, letters);
    output.init();
  });
}
