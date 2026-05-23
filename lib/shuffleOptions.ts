/**
 * Utility for shuffling multiple-choice options while preserving correctness tracking
 * Ensures that the correct answer is identified consistently even after shuffling
 */

export interface ShuffleResult<T extends Record<string, any>> {
  options: T[];
  correctIndex: number;
  originalIndices: number[];
}

/**
 * Shuffles an array of options and returns their new positions
 * @param options Array of options to shuffle
 * @param correctAnswerField Field name that identifies correct answer (true, correct ID, etc.)
 * @returns Shuffled options, index of correct answer, and original indices for validation
 */
export function shuffleOptions<T extends Record<string, any>>(
  options: T[],
  correctAnswerField: string = "correcta"
): ShuffleResult<T> {
  // Create indexed copy to track original positions
  const indexed = options.map((opt, idx) => ({
    ...opt,
    __originalIdx: idx,
  }));

  // Shuffle using Fisher-Yates
  const shuffled = [...indexed];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Find correct answer in shuffled array
  let correctIndex = -1;
  shuffled.forEach((opt, idx) => {
    const correctValue = opt[correctAnswerField];
    // Handle different correctness indicators
    if (correctValue === true || correctValue === "true") {
      correctIndex = idx;
    } else if (typeof correctValue === "string" && correctValue.length <= 3) {
      // For letter-based options (A, B, C, D), match by ID
      if (opt.id === opt.correcta || opt.letra === opt.correcta) {
        correctIndex = idx;
      }
    }
  });

  // Remove tracking field
  const clean = shuffled.map(({ __originalIdx, ...rest }) => rest as unknown as T);

  return {
    options: clean,
    correctIndex,
    originalIndices: shuffled.map((opt) => opt.__originalIdx),
  };
}

/**
 * Validates if a selected option is correct
 * @param selectedIndex Index of selected option
 * @param correctIndex Index of correct option
 * @returns true if selection is correct
 */
export function isCorrect(selectedIndex: number, correctIndex: number): boolean {
  return selectedIndex === correctIndex;
}

/**
 * Gets the original position of an option before shuffling
 * @param newIndex Current index after shuffling
 * @param originalIndices Array of original indices
 * @returns Original position in unshuffled array
 */
export function getOriginalIndex(
  newIndex: number,
  originalIndices: number[]
): number {
  return originalIndices[newIndex] ?? -1;
}
