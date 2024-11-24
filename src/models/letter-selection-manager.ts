import LetterElement from "./letter";

class LetterSelectionManager {
  private lettersMap: Map<string, LetterElement> = new Map();
  private selectedLettersMap: Map<String, LetterElement> = new Map();

  constructor(letters: LetterElement[]) {
    letters.forEach((letter) => this.lettersMap.set(letter.id, letter));
  }

  get letters(): LetterElement[] {
    return Array.from(this.lettersMap.values());
  }

  get selectedLetters(): LetterElement[] {
    return Array.from(this.selectedLettersMap.values());
  }

  getLetterById(id: string): LetterElement | undefined {
    return this.lettersMap.get(id);
  }

  clearSelection() {
    this.selectedLettersMap.forEach((letter) => letter.setSelected(false));
    this.selectedLettersMap.clear();
  }

  setLetterSelection(isSelected: boolean, letter: LetterElement) {
    letter.setSelected(isSelected);
    isSelected
      ? this.selectedLettersMap.set(letter.id, letter)
      : this.selectedLettersMap.delete(letter.id);
  }
}

export default LetterSelectionManager;
