"use client"

import { useState } from "react"
import { HiMiniBarsArrowDown, HiMiniBarsArrowUp } from "react-icons/hi2"

type AccordianProps = {
  title: string
  children: React.ReactNode
}

export default function Accordian({ title, children }: AccordianProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="accordian">
      <header onClick={() => setOpen(!open)}>
        <p>{title}</p>
        {open ? <HiMiniBarsArrowUp /> : <HiMiniBarsArrowDown />}
      </header>
      <div className="content" data-open={open}>
        {children}
      </div>
    </div>
  )
}
