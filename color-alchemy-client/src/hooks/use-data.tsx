import { useApi } from "../api/use-api";
import { GameEntity } from "../types";

const baseUrl = `http://localhost:9876`;

export function useGameInfo({
  initialGameData,
}: {
  initialGameData: (v: GameEntity) => void;
}) {
  const getGameInfoEndpoint = `${baseUrl}/init`;
  return useApi<GameEntity>(getGameInfoEndpoint, {
    onSuccess: (data) => {
      if (data) {
        initialGameData(data);
      }
    },
  });
}

export function useGameInfoById({
  id,
  initialGameData,
}: {
  id?: string;
  initialGameData: (v: GameEntity) => void;
}) {
  const getGameInfoEndpointById = `${baseUrl}/init/user/${id}`;
  return useApi<GameEntity>(getGameInfoEndpointById, {
    onSuccess: (data) => {
      if (data) {
        initialGameData(data);
      }
    },
    enabled: false,
  });
}
