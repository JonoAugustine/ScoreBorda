import React from "react"

type TextInputProps = {
  name: string
  type?: "text" | string
  reference: React.RefObject<HTMLInputElement>
}

export default function TextInput({ name, type, reference }: TextInputProps) {
  return (
    <div className="text-input">
      <input
        name={name}
        type={type || "text"}
        required
        autoComplete="off"
        ref={reference}
      />
      <label htmlFor={name} className="floating">
        <span className="content-name">{name}</span>
      </label>
    </div>
  )
}
