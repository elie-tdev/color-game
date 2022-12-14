import { useContext } from 'react'
import { GameContext } from '../../context/game.context'
import { getDifferenceTargetColorPercent, winPercent } from '../../utils'
import { useGameInfoById } from '../../hooks/use-data'

export interface ModalProps {
  onModal: boolean
  closeModal: () => void
}

export default function Modal({ onModal, closeModal }: ModalProps) {
  const { gameInfo, closestColor } = useContext(GameContext)

  const { refetch } = useGameInfoById({
    id: gameInfo?.userId,
  })

  const restartGame = () => {
    refetch()
    closeModal()
  }

  if (!onModal) return <></>

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div
        className='fixed inset-0 w-full h-full bg-black opacity-40'
        onClick={() => closeModal()}
      ></div>
      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relative w-full max-w-sm p-4 mx-auto bg-white rounded-md shadow-lg'>
          <div className='mt-3 sm:flex w-full'>
            <div className='mt-2 text-center sm:ml-4 sm:text-left w-full'>
              {gameInfo && (
                <h4 className='text-lg font-lg text-gray-800'>
                  {+getDifferenceTargetColorPercent(
                    gameInfo.target,
                    closestColor,
                  ) < winPercent
                    ? 'Success! Do you want to try again?'
                    : 'Failed! Do you want to try again?'}
                </h4>
              )}

              <div className='items-end gap-2 mt-3 flex w-full text-sm'>
                <button
                  className='w-full mt-2 py-2 px-5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2'
                  onClick={() => closeModal()}
                >
                  Cancel
                </button>
                <button
                  className='w-full mt-2 py-2 px-5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2'
                  onClick={() => restartGame()}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
