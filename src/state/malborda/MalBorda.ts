export const enum MalBordaStage {
  SETUP = 0,
  SCORING = 1,
  COMPLETE = 2,
}

export type MalBorda = {
  _id: string
  date?: Date
  name: string
  stage: MalBordaStage
  candidates: any[]
}
