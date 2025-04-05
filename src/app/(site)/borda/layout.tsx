export default function BordaLayout(props: any) {
  return (
    <div className="borda-layout">
      <div className="borda-layout_header">
        <h2>Active Borda</h2>
      </div>
      <div className="borda-layout__content">{props.children}</div>
    </div>
  )
}
