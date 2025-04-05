import Feature from "./Feature"

/**
 * Whether people, clothes, insurance plans, or quite literally anything else.
 * SB's purpose is to aid you in understanding how you feel about about these
 * candidates. Candidates consist of a name, score, and set of features.
 */
export default class Candidate {
  /**
   *
   * @param {string} name - The candidate's name
   * @param {Feature[]} features - The list of this Candidate's ScoreBorda Features
   */
  constructor(name, features = []) {
    this.name = name
    this.features = features
    this.score = 0
  }

  /**
   * @returns {number} The sum of this candidate's feature scores.
   */
  rawScore = () => this.features.reduce((sum, ftr) => sum + ftr.score, 0);
}
