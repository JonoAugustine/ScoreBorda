import { nanoid } from "nanoid"
import { createContext, PropsWithChildren, useReducer } from "react"
import { Borda, BordaStage } from "./Borda"
import bordaReducer from "./BordaReducer"
import { BordaAction } from "./BordaAction"

export const BordaCtx = createContext<Borda | null>(null)
export const BordaDispatchCtx =
  createContext<React.Dispatch<BordaAction> | null>(null)

export default function BordaProvider(
  props: PropsWithChildren & { borda?: Borda }
) {
  const [borda, dispatch] = useReducer(
    bordaReducer,
    props.borda ?? {
      _id: nanoid(),
      name: "New Borda",
      features: [],
      candidates: [],
      stage: BordaStage.SETUP,
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
