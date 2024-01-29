import React from 'react'
import PlusIcon from '../icons/PlusIcon'

interface Props {
  // TODO: Define the component props
}

export const KanbanBoard: React.FC<Props> = ({ }) => {
  const createNewColumn = () => {
    console.log('createNewColumn')
  }

  return (
    <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]'>
      <div className='m-auto'>
        <button
          onClick={() => { createNewColumn() }}
          className='h-[60px] w-[350px] min-w-[350px] flex flex-row gap-4 border-2 hover:border-purple-600 border-columnBackgroundColor bg-appBackgroundColor text-white font-bold p-4 rounded-lg cursor-pointer'>
          <PlusIcon/> Add Column
        </button>
      </div>
    </div>
  )
}

export default KanbanBoard
