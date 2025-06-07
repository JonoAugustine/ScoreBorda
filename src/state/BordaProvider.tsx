import { Context, Dispatch, PropsWithChildren, useReducer } from "react"
import { BaseBorda, BordaReducerType } from "./types"

export type BordaProviderProps<
  BordaType extends BaseBorda<BordaStage>,
  BordaStage,
  ActionType,
> = PropsWithChildren & {
  bordaContext: Context<BordaType | null>
  dispatchContext: Context<Dispatch<ActionType> | null>
  borda?: BordaType
  reducer: BordaReducerType<BordaType, ActionType>
  default: BordaType
}

export default function BordaProvider<
  BordaType extends BaseBorda<BordaStage>,
  BordaStage,
  ActionType,
>(props: BordaProviderProps<BordaType, BordaStage, ActionType>) {
  const [borda, dispatch] = useReducer(
    props.reducer,
    props.borda ?? props.default
  )

  return (
    <props.bordaContext.Provider value={borda}>
      <props.dispatchContext.Provider value={dispatch}>
        {props.children}
      </props.dispatchContext.Provider>
    </props.bordaContext.Provider>
  )
}
