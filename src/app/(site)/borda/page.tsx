"use client"

import EntitySetup from "@/components/EntitySetup"
import { BordaStage } from "@/state/Borda"
import { BordaCtx, BordaDispatchCtx } from "@/state/BordaContext"
import { useContext, useEffect } from "react"

export default function BordaPage() {
  const borda = useContext(BordaCtx)!
  const dispatch = useContext(BordaDispatchCtx)!
  useEffect(() => console.log(borda), [borda])

  const confirm = () => dispatch({ type: "NEXT_STATE" })
  const back = () => dispatch({ type: "LAST_STATE" })
  const reset = () => dispatch({ type: "RESET" })

  /**
   * Renders the appropriate borda screen based on the round state.
   *
   * @param {string} state - The current state of the round
   */
  const renderState = (state: BordaStage) => {
    switch (state) {
      case BordaStage.CANDIDATES:
        return (
          <EntitySetup
            entityType="candidate"
            entities={borda.candidates}
            addEntity={(name) =>
              dispatch({
                type: "ADD_CANDIDATE",
                payload: { name, features: [], score: 0 },
              })
            }
            removeEntity={(name) =>
              dispatch({ type: "REMOVE_CANDIDATE", payload: { name } })
            }
            confirm={confirm}
            back={back}
            reset={reset}
          />
        )
      // TODO case BordaState.CONFIRM:
      // TODO case BordaState.CALIBRATION:
      // TODO case BordaState.SCORING:
      // TODO case BordaState.COMPLETE:
      case BordaStage.FEATURES:
        return (
          <EntitySetup
            entityType="feature"
            entities={borda.features}
            addEntity={(name) =>
              dispatch({ type: "ADD_FEATURE", payload: { name, score: 0 } })
            }
            removeEntity={(name) =>
              dispatch({ type: "REMOVE_FEATURE", payload: { name } })
            }
            confirm={confirm}
            back={back}
            reset={reset}
          />
        )
      default:
        return (
          <div>
            <h1>Unknown state: {state}</h1>
            <button onClick={reset}>Reset</button>
          </div>
        )
    }
  }

  return <div className="borda">{renderState(borda.state)}</div>
}
