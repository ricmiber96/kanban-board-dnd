import React from 'react'
import { type Id, type Column } from '../types'
import TrashIcon from '../icons/TrashIcon'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  // TODO: Define the component props
  column: Column
  deleteColumn: (id: Id) => void
}

export const ColumnContainer: React.FC<Props> = (props: Props) => {
  const { column, deleteColumn } = props

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    }
  })

  const columnStyle = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  if (isDragging) {
    return (
      <>
        <div ref={setNodeRef} style={columnStyle} className='bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] opacity-40 border-2 border-purple-500 rounded-md flex flex-col shadow-md'>
        </div>
      </>)
  }

  return (
    <div
      ref={setNodeRef}
      style={columnStyle}
      className='bg-columnBackgroundColor  w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col shadow-md'>
      {/* Header */}
      <div
        {...attributes}
        {...listeners}
        className='flex flex-row items-center justify-between bg-appBackgroundColor border-columnBackgroundColor h-[60px] font-bold text-md cursor-grab border-4 rounded-lg gap-4 p-4 '>
        <p className='font-bold bg-columnBackgroundColor px-2 py-1 rounded-lg' >0</p>
        <p className='text-white font-bold'>{column.title}</p>
        <button
          onClick={() => { deleteColumn(column.id) }}
          className='h-[30px] w-[30px] rounded-full bg-appBackgroundColor stroke-gray-500  hover:stroke-purple-600 flex justify-center items-center'>
          <TrashIcon />
        </button>
      </div>

      {/* Task container */}
      <div className='flex flex-grow'>
        Content
      </div>
      {/* Footer */}
      <div className='flex flex-row justify-between items-center p-4'>
            Footer
      </div>
    </div>
  )
}

export default ColumnContainer
