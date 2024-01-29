import React, { useState } from 'react'
import PlusIcon from '../icons/PlusIcon'
import { type Id, type Column } from '../types'
import ColumnContainer from './ColumnContainer'

interface Props {
  // TODO: Define the component props
}

export const KanbanBoard: React.FC<Props> = () => {
  const [columns, setColumns] = useState<Column>([])
  console.log(columns)

  const createNewColumn = (): void => {
    const newColumn: Column = {
      id: window.crypto.randomUUID(),
      title: `Column ${columns.length + 1}`
    }
    setColumns([...columns, newColumn])
  }

  const deleteColumn = (id: Id): void => {
    const filteredColumns = columns.filter((column) => column.id !== id)
    setColumns(filteredColumns)
  }

  return (
    <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]'>
      <div className='m-auto'>
        <div className='flex gap-4'>
          {columns.map((column) => (
            <ColumnContainer key={column.id} column={column} deleteColumn={deleteColumn} />
          ))
          }
          <button
            onClick={() => { createNewColumn() }}
            className='h-[60px] w-[350px] min-w-[350px] flex flex-row gap-4 border-2 hover:border-purple-600 border-columnBackgroundColor bg-appBackgroundColor text-white font-bold p-4 rounded-lg cursor-pointer'>
            <PlusIcon/> Add Column
          </button>
        </div>
      </div>
    </div>
  )
}

export default KanbanBoard
