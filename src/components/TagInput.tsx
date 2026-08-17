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

/**
 *
 * @param {{values: string[]}} o - props
 */
export default function TagInput({ name, values, add, remove }: TagInputProps) {
  const nameInput = useRef<HTMLInputElement>({} as HTMLInputElement)

  const addValue = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Stop page refresh
    const input = event.currentTarget[0] as HTMLInputElement
    // Confirm value is not duplicate
    if (!values.includes(input.value)) {
      add(input.value)
      input.value = "" // clear text field
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
