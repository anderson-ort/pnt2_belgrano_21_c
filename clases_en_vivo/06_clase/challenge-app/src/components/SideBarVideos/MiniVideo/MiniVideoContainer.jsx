import { useState } from 'react'
import MiniVideo from './MiniVideo'

export const MiniVideoContainer = ({ data }) => {
  const [showOptions, setShowOptions] = useState(false)

  const toggleOptions = (e) => {
    e.stopPropagation()
    setShowOptions(!showOptions)
  }

  return (
    <MiniVideo
      data={data}
      toggleOptions={toggleOptions}
      showOptions={showOptions}
    />
  )
}
