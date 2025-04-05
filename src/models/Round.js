import BordaState from "./BordaState";

export default class Round {
  constructor(
    features = [],
    candidates = [],
    state = BordaState.SETUP.FEATURES
  ) {
    this.features = features;
    this.candidates = candidates;
    this.state = state;
  }

  setFeatures = (features) => (this.features = features);

  setCandidates = (candidates) => (this.candidates = candidates);

  /**
   * TODO Returns the candidate list in order of highest score to lowest.
   */
  scoreboard = () => console.log("TODO");
}
