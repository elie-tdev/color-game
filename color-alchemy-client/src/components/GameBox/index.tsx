import { useContext, useEffect } from "react";
import { GameContext } from "../../context/game.context";
import Grid from "../Grid";
import Source from "../Source";
import Tile from "../Tile";
import Modal from "../Modal";
import { useToggleState } from "../../hooks/use-toggle-state";
import {
  getDifferenceTargetColorPercent,
  getShinedColor,
  toNumbersRGBColor,
} from "../../utils";

export function GameBox() {
  const {
    boxColors,
    gameInfo,
    moveStep,
    setBoxColors,
    closestColor,
    setClosestColor,
  } = useContext(GameContext);

  const createModal = useToggleState();

  useEffect(() => {
    if (gameInfo) {
      let indexOfClosestColor: number = boxColors.findIndex(
        (item) => item.closest
      );
      let closestColorPercent = getDifferenceTargetColorPercent(
        gameInfo.target,
        closestColor
      );

      const updatedTilesColor = boxColors.map((item, index) => {
        if (item.type === "tile") {
          const shinedColor = getShinedColor(
            boxColors,
            item.position,
            gameInfo?.width,
            gameInfo?.height
          );
          const targetColorPercent = getDifferenceTargetColorPercent(
            gameInfo.target,
            toNumbersRGBColor(shinedColor)
          );

          if (targetColorPercent < closestColorPercent) {
            indexOfClosestColor = index;
            closestColorPercent = targetColorPercent;
          }

          return {
            ...item,
            color: shinedColor,
            closest: false,
          };
        }
        return item;
      });

      updatedTilesColor[indexOfClosestColor] = {
        ...updatedTilesColor[indexOfClosestColor],
        closest: true,
      };

      setBoxColors(updatedTilesColor);
      setClosestColor(
        toNumbersRGBColor(updatedTilesColor[indexOfClosestColor].color)
      );
    }
  }, [moveStep]);

  return (
    <div className="w-fit">
      {gameInfo && (
        <Grid columns={`${gameInfo.width + 2}`}>
          {boxColors.map((v) => {
            if (v.type === "empty") {
              return <div key={v.position} />;
            }
            if (v.type === "source") {
              return (
                <Source
                  key={v.position}
                  position={v.position}
                  color={v.color}
                  openModal={createModal.onOn}
                />
              );
            }

            return (
              <Tile
                key={v.position}
                position={v.position}
                color={v.color}
                closest={v.closest}
              />
            );
          })}
        </Grid>
      )}
      <Modal onModal={createModal.on} closeModal={createModal.onOff} />
    </div>
  );
}

export default GameBox;
