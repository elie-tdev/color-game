import { useContext } from 'react'
import { GameContext } from '../context/game.context'
import { useApi } from '../api/use-api'
import { GameEntity } from '../types'

const baseUrl = 'http://localhost:9876'

export function useGameInfo() {
  const getGameInfoEndpoint = `${baseUrl}/init`
  const { initialGameData } = useContext(GameContext)
  return useApi<GameEntity>(getGameInfoEndpoint, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data) {
        initialGameData(data)
      }
    },
  })
}

export function useGameInfoById({ id }: { id?: string }) {
  const getGameInfoEndpointById = `${baseUrl}/init/user/${id}`
  const { initialGameData } = useContext(GameContext)
  return useApi<GameEntity>(getGameInfoEndpointById, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data) {
        initialGameData(data)
      }
    },
    enabled: false,
  })
}
