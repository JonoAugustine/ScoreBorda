export default {
  SETUP: {
    FEATURES: "Features",
    CANDIDATES: "Candidates",
    CONFIRM: "Confirm",
  },
  RUNNING: {
    CALIBRATION: "Calibration",
    SCORING: "Scoring",
  },
  COMPLETE: "Complete",
  flatMap: function () {
    return [
      this.SETUP.FEATURES,
      this.SETUP.CANDIDATES,
      this.SETUP.CONFIRM,
      this.RUNNING.CALIBRATION,
      this.RUNNING.SCORING,
      this.COMPLETE,
    ]
  },
}
