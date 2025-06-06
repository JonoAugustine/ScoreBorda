/**
 * Shuffles array in place.
 *
 * @param {Array} a items An array containing the items.
 */
export const shuffleArray = (a: any[]): any[] => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

export class BordaIterable<T> {
  private items: T[]
  private leftIndex: number
  private rightIndex: number
  hasNext: boolean = false
  totalSteps: number = 0
  stepsRemaining: number = 0
  currentPair: [T, T]

  constructor(items: T[], shuffle: boolean = false) {
    this.items = items
    this.leftIndex = 0
    this.rightIndex = 1
    if (shuffle) shuffleArray(items)

    // Calculate the total number of comparison steps
    this.totalSteps = this.calculateTotalSteps(items.length)
    this.stepsRemaining = this.totalSteps
    this.hasNext = this.totalSteps > 0
    this.currentPair = [this.items[this.leftIndex], this.items[this.rightIndex]]
  }

  /**
   * Calculates the total number of comparisons possible for the given array length.
   * @param {number} length - The length of the array.
   * @returns {number} The total number of comparisons.
   */
  private calculateTotalSteps(length: number): number {
    if (length < 2) {
      return 0 // No comparisons possible for arrays with fewer than 2 elements
    }
    return (length * (length - 1)) / 2
  }

  /**
   * Returns the current comparing pair of values and updates the indices for the next step.
   * Throws an error if there are no more pairs to compare.
   * @returns {[T, T]} The current comparing pair of values.
   */
  step = (): [T, T] => {
    if (this.leftIndex >= this.items.length - 1) {
      throw Error("No more pairs to compare")
    }

    this.currentPair = [this.items[this.leftIndex], this.items[this.rightIndex]]
    this.updateIndices()
    this.stepsRemaining--
    return this.currentPair
  }

  /**
   * Updates the indices for the next comparison step.
   */
  private updateIndices(): void {
    this.rightIndex++

    // If the moving index exceeds the array length, update the static index and reset the moving index
    if (this.rightIndex >= this.items.length) {
      this.leftIndex++
      this.rightIndex = this.leftIndex + 1
    }

    // Update hasNext flag if no more comparisons are possible
    if (this.leftIndex >= this.items.length - 1) {
      this.hasNext = false
    }
  }
}
