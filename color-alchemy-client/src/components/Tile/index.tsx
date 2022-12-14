import React, { useCallback, useContext, useMemo } from 'react'
import { GameContext } from '../../context/game.context'

import { toNumbersRGBColor } from '../../utils'
import Tooltip from '../Tooltip'

interface TileProps {
  position: string
  closest: boolean
  color: string
}

export function Tile({ position, color, closest }: TileProps) {
  const { moveStep } = useContext(GameContext)

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData('dragging_color', color)
    },
    [color],
  )

  const style = useMemo(() => {
    return {
      backgroundColor: `#${color}`,
      borderColor: closest ? '#ff0000' : '#9ca3af',
      cursor: moveStep > 2 ? 'pointer' : 'default',
    }
  }, [closest, color, moveStep])

  return (
    <Tooltip
      text={`${toNumbersRGBColor(color)[0]},${toNumbersRGBColor(color)[1]},${
        toNumbersRGBColor(color)[2]
      }`}
    >
      <div
        className='border-2 rounded w-6 h-6'
        style={style}
        draggable={moveStep > 2 ? true : false}
        id={position}
        onDragStart={handleDragStart}
      />
    </Tooltip>
  )
}

export default Tile
