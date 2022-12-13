import { useContext } from "react";
import Hero from "../components/Hero";
import Layout from "../components/layout";
import { Spinner } from "../components/Spinner";
import { GameBox } from "../components/GameBox";
import { useGameInfo } from "../hooks/use-data";
import { GameContext } from "../context/game.context";

function GameScreen() {
  const { initialGameData } = useContext(GameContext);
  const { isLoading, data } = useGameInfo({ initialGameData });

  return isLoading ? (
    <Spinner />
  ) : (
    <Layout>
      {data && (
        <div className="flex flex-col gap-12">
          <Hero title="RGB Alchemy" />
          <GameBox />
        </div>
      )}
    </Layout>
  );
}

export default GameScreen;
