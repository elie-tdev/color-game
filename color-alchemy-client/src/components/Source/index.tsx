import { useContext } from "react";
import { GameContext } from "../../context/game.context";
import { replaceItemColor, getDifferenceTargetColorPercent } from "../../utils";

interface SourceProps {
  color: string;
  position: string;
  openModal: () => void;
}

export function Source({ color, position, openModal }: SourceProps) {
  const {
    moveStep,
    setMoveStep,
    boxColors,
    setBoxColors,
    gameInfo,
    closestColor,
  } = useContext(GameContext);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const currentPercent =
      gameInfo &&
      getDifferenceTargetColorPercent(gameInfo.target, closestColor);
    if (
      (gameInfo && gameInfo.maxMoves <= moveStep + 1) ||
      (currentPercent && +currentPercent < 10)
    ) {
      openModal();
    }
    if (gameInfo && gameInfo.maxMoves > moveStep) {
      const draggingColor = event.dataTransfer.getData("dragging_color");
      setBoxColors(replaceItemColor(boxColors, position, draggingColor));
      setMoveStep(moveStep + 1);
    }
  };

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleClick = () => {
    if (moveStep < 3) {
      const currentPercent =
        gameInfo &&
        getDifferenceTargetColorPercent(gameInfo.target, closestColor);

      if (currentPercent && +currentPercent >= 10) {
        setBoxColors(
          replaceItemColor(
            boxColors,
            position,
            moveStep === 0 ? "ff0000" : moveStep === 1 ? "00ff00" : "0000ff"
          )
        );
        setMoveStep(moveStep + 1);
      } else {
        openModal();
      }
    }
  };

  return (
    <div
      className={`border-2 rounded-full border-gray-400 w-6 h-6`}
      style={{
        backgroundColor: `#${color}`,
        cursor: moveStep < 3 ? "pointer" : "default",
      }}
      onClick={() => handleClick()}
      onDrop={handleDrop}
      onDragOver={enableDropping}
      draggable={false}
    />
  );
}

export default Source;
