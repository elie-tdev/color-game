import Tooltip from "../Tooltip";
import { getDifferenceTargetColorPercent, toStringHexColor } from "../../utils";
import { useContext } from "react";
import { GameContext } from "../../context/game.context";

interface HeroProps {
  title: string;
}

export function Hero({ title }: HeroProps) {
  const { closestColor, gameInfo, moveStep } = useContext(GameContext);
  return (
    <div>
      {gameInfo && (
        <>
          <h1 className="text-2xl py-4">{title}</h1>
          <p className="text-base py-1">User ID: {gameInfo.userId}</p>
          <p className="text-base py-1">
            Moves Left: {gameInfo.maxMoves - moveStep}
          </p>
          <div className="flex gap-2 py-1">
            <div>Target Color:</div>
            <Tooltip
              text={`${gameInfo.target[0]},${gameInfo.target[1]},${gameInfo.target[2]}`}
            >
              <div
                className={`border-2 rounded border-gray-400 w-6 h-6`}
                style={{
                  backgroundColor: `#${toStringHexColor(gameInfo.target)}`,
                }}
              />
            </Tooltip>
          </div>

          <div className="flex gap-6 py-1">
            <div className="flex gap-2">
              <div>Closest Color:</div>
              <Tooltip
                text={`${closestColor[0]},${closestColor[1]},${closestColor[2]}`}
              >
                <div
                  className={`border-2 rounded border-gray-400 w-6 h-6`}
                  style={{
                    backgroundColor: `#${toStringHexColor(closestColor)}`,
                  }}
                />
              </Tooltip>
            </div>
            <div>
              Δ ={" "}
              {getDifferenceTargetColorPercent(gameInfo.target, closestColor)}%
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Hero;
