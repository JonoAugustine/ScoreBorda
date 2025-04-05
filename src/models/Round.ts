import BordaState from "../state/BordaState"
import Candidate from "./Candidate"
import Feature from "./Feature"

export default class Round {
  features: Feature[]
  candidates: Candidate[]
  state: string

  constructor(
    features = [],
    candidates = [],
    state = BordaState.SETUP.FEATURES
  ) {
    this.features = features
    this.candidates = candidates
    this.state = state
  }

  setFeatures = (features: Feature[]) => (this.features = features)

  setCandidates = (candidates: Candidate[]) => (this.candidates = candidates)

  /**
   * TODO Returns the candidate list in order of highest score to lowest.
   */
  scoreboard = () => console.log("TODO")
}
