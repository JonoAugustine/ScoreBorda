export type BaseBorda<Stage> = {
  _id: string
  date?: Date
  name: string
  stage: Stage
}

export type BordaReducerType<BordaType, ActionType> = (
  borda: BordaType,
  action: ActionType
) => BordaType
