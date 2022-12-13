import { useState, createContext } from "react";
import { GameEntity } from "../types";
import { getInitGameBox } from "../utils";

export interface BoxType {
  position: string;
  type: "empty" | "source" | "tile";
  color: string;
  closest: boolean;
}

interface GameContextInterface {
  gameInfo: GameEntity | null;
  moveStep: number;
  closestColor: number[];
  boxColors: BoxType[];
  setMoveStep: (v: number) => void;
  setClosestColor: (v: number[]) => void;
  setGameInfo: (v: GameEntity | null) => void;
  setBoxColors: (v: BoxType[]) => void;
  initialGameData: (v: GameEntity) => void;
}

export const GameContext = createContext<GameContextInterface>({
  moveStep: 0,
  gameInfo: null,
  boxColors: [],
  closestColor: [0, 0, 0],
  setMoveStep: () => {},
  setClosestColor: () => {},
  setGameInfo: () => {},
  setBoxColors: () => {},
  initialGameData: () => {},
});

export const GameContextProvider = ({ children }: { children: any }) => {
  const [gameInfo, setGameInfo] = useState<GameEntity | null>(null);
  const [moveStep, setMoveStep] = useState(0);
  const [boxColors, setBoxColors] = useState<BoxType[]>([]);
  const [closestColor, setClosestColor] = useState([0, 0, 0]);

  const initialGameData = (data: GameEntity) => {
    setMoveStep(0);
    setGameInfo(data);
    const initGameBox = getInitGameBox(data.width, data.height);
    setBoxColors(initGameBox);
  };

  return (
    <GameContext.Provider
      value={{
        gameInfo,
        setGameInfo,
        moveStep,
        boxColors,
        setBoxColors,
        closestColor,
        setMoveStep,
        setClosestColor,
        initialGameData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
