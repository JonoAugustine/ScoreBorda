import Candidate from "./Candidate"
import Feature from "./Feature"

type Round = {
  features: Feature[]
  candidates: Candidate[]
  state: string
}

export default Round
