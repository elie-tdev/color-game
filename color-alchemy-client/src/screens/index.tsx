import { useGameInfo } from '../hooks/use-data'
import { Hero } from '../components/Hero'
import { Layout } from '../components/layout'
import { Spinner } from '../components/Spinner'
import { GameBox } from '../components/GameBox'

function GameScreen() {
  const { isLoading, data, error } = useGameInfo()
  if (isLoading) return <Spinner />
  return (
    <Layout>
      {data && (
        <div className='flex flex-col gap-12'>
          <Hero title='RGB Alchemy' />
          <GameBox />
        </div>
      )}
      {error && <div className='text-lg text-red-900'>{error.message}</div>}
    </Layout>
  )
}

export default GameScreen
