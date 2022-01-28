import './Spacer.scss'

export const Spacer = ({
  height = '1rem',
  width = '1rem',
}: {
  height?: string
  width?: string
}) => <div className="Spacer" style={{ height, width }} aria-hidden></div>
