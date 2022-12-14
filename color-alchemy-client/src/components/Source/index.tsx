import { useContext, useEffect, useMemo } from 'react'
import { GameContext } from '../../context/game.context'
import { replaceItemColor, getDifferenceTargetColorPercent, winPercent } from '../../utils'

interface SourceProps {
  color: string
  position: string
  openModal: () => void
}

export function Source({ color, position, openModal }: SourceProps) {
  const {
    moveStep,
    setMoveStep,
    boxColors,
    setBoxColors,
    gameInfo,
    closestColor,
  } = useContext(GameContext)

  const style = useMemo(() => {
    return {
      backgroundColor: `#${color}`,
      cursor: moveStep < 3 ? 'pointer' : 'default',
    }
  }, [color, moveStep])

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (gameInfo) {
      const currentPercent = getDifferenceTargetColorPercent(
        gameInfo.target,
        closestColor,
      )
      if (gameInfo.maxMoves <= moveStep + 1 || +currentPercent < winPercent) {
        openModal()
      }
      if (gameInfo.maxMoves > moveStep && +currentPercent >= winPercent) {
        const draggingColor = event.dataTransfer.getData('dragging_color')
        setBoxColors(replaceItemColor(boxColors, position, draggingColor))
        setMoveStep(moveStep + 1)
      }
    }
  }

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.preventDefault()
  }

  const handleClick = () => {
    if (moveStep < 3 && gameInfo) {
      const currentPercent = getDifferenceTargetColorPercent(
        gameInfo.target,
        closestColor,
      )

      if (+currentPercent >= winPercent) {
        setBoxColors(
          replaceItemColor(
            boxColors,
            position,
            moveStep === 0 ? 'ff0000' : moveStep === 1 ? '00ff00' : '0000ff',
          ),
        )
        setMoveStep(moveStep + 1)
      } else {
        openModal()
      }
    }
  }

  useEffect(() => {
    if (gameInfo) {
      const currentPercent = getDifferenceTargetColorPercent(
        gameInfo.target,
        closestColor,
      )
      if (gameInfo.maxMoves <= moveStep || +currentPercent < winPercent) {
        openModal()
      }
    }
  }, [closestColor, moveStep])

  return (
    <div
      className='border-2 rounded-full border-gray-400 w-6 h-6'
      style={style}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={enableDropping}
      draggable={false}
    />
  )
}

export default Source
