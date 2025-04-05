/**
 * Features help ScoreBorda(TM) understand what is most important to you.
 * They can be anything from "*red*" to "*votes for president of space*"
 * to "*likes kittens*"; as long as it describes some aspect of a candidate,
 * it's a valid feature.
 */
export default class Feature {
  name: string
  score: number

  /**
   * @param {string} name - The name of the Feature.
   * @param {number} [score=0] - The calibration score or candidate's feature score.
   */
  constructor(name: string, score: number = 0) {
    this.name = name
    this.score = score
  }

  /**
   * @returns {Feature} a new instance of this Feature with a reset score.
   */
  clone = (): Feature => new Feature(this.name)
}
