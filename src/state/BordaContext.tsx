import { createContext, PropsWithChildren, useReducer } from "react"
import { Borda, BordaStage } from "./Borda"
import bordaReducer, { BordaAction } from "./BordaReducer"

export const BordaCtx = createContext<Borda | null>(null)
export const BordaDispatchCtx =
  createContext<React.Dispatch<BordaAction> | null>(null)

export default function BordaProvider(
  props: PropsWithChildren & { borda?: Borda }
) {
  const [borda, dispatch] = useReducer(
    bordaReducer,
    props.borda ?? {
      features: [],
      candidates: [],
      state: BordaStage.FEATURES,
    }
  )

  return (
    <BordaCtx.Provider value={borda}>
      <BordaDispatchCtx.Provider value={dispatch}>
        {props.children}
      </BordaDispatchCtx.Provider>
    </BordaCtx.Provider>
  )
}
