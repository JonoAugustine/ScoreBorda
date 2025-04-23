"use client"

import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef } from "react"
import TextInput from "./TextInput"

type TagInputProps = {
  name: string
  values: string[]
  add: (str: string) => void
  remove: (str: string) => void
}

interface AddValueEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & { [key: number]: { value: string } }
}

/**
 *
 * @param {{values: string[]}} o - props
 */
export default function TagInput({ name, values, add, remove }: TagInputProps) {
  const nameInput = useRef<HTMLInputElement>({} as HTMLInputElement)

  const addValue = (event: AddValueEvent) => {
    event.preventDefault() // Stop page refresh
    // Confirm value is not duplicate
    if (!values.includes(event.target[0].value)) {
      add(event.target[0].value)
      //setValues([...values, event.target[0].value])
      event.target[0].value = "" // clear text field
      nameInput.current.focus() // reset focus to input
    } else {
      // TODO toast saying duplicate
    }
  }

  return (
    <div
      className={`tag-input ${values.length === 0 ? "empty" : ""}`}
      data-empty={values.length === 0 ? "true" : "false"}
    >
      <form onSubmit={addValue}>
        <TextInput name={name} reference={nameInput} />
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} className="fa-fw" />
        </button>
      </form>
      <div className="tag-container">
        {values.map((v) => (
          <button key={v} onClick={() => remove(v)} className="tag">
            {v}
          </button>
        ))}
      </div>
    </div>
  )
}
