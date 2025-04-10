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
  /**
   * @param {*[]} array - Array of borda items to iterate through
   * @param {boolean} [shuffle=false] - whether the array should be shuffled or not
   */
  private array: T[]
  private left: number
  private right: number
  hasNext: boolean = false
  steps: number = 0
  currentPair: [T, T]

  /**
   * @constructor
   * @param {T[]} array - Array of borda items to iterate through
   * @param {boolean} [shuffle=false] - whether the array should be shuffled or not
   */
  constructor(array: T[], shuffle: boolean = false) {
    this.array = array
    /** The current static comparator  */
    this.left = 0
    /** The current mobile comparator */
    this.right = 1
    if (shuffle) shuffleArray(array)

    // Calculate the number of steps
    for (let i = 1; i <= array.length; i++) {
      this.steps += i * (array.length - i)
    }
    this.hasNext = this.steps > 0
    this.currentPair = [this.array[this.left], this.array[this.right]]
  }

  /**
   * Returns the current comparing pair of values then increments the right pointer.
   * If the right pointer exceeds the array length, increments the left pointer and resets the right pointer.
   * If the left pointer exceeds the array length, returns null.
   * 
   * _this function should be improved at some point_
   * @returns {{0: T, 1: T}} the current comparing pair of values.
   */
  step = (): [T, T] => {
    if (this.left >= this.array.length - 1) {
      throw Error("No more pairs to compare")
    }

    this.currentPair = [this.array[this.left], this.array[this.right]]
    this.right++

    // If the right pointer exceeds the array length,
    // increment the left pointer and reset the right pointer
    if (this.right >= this.array.length) {
      this.left++
      this.right = this.left + 1
    }

    if (this.left >= this.array.length - 1) {
      this.hasNext = false
    }

    return this.currentPair
  }
}
