import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from "react"

type InfoModalProps = {
  children: ReactNode
}

export default function InfoModal({ children }: InfoModalProps) {
  return (
    <div className="info-modal">
      <FontAwesomeIcon icon={faCircleQuestion} />
      <p>{children}</p>
    </div>
  )
}
