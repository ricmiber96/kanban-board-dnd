import React, { useState } from 'react'
import { type Id, type Column, type Task } from '../types'
import TrashIcon from '../icons/TrashIcon'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import PlusIcon from '../icons/PlusIcon'
import TaskCard from './TaskCard'

interface Props {
  // TODO: Define the component props
  column: Column
  tasks: Task[]
  deleteColumn: (id: Id) => void
  updateColumnTitle: (id: Id, title: string) => void
  createNewTask: (columnId: Id) => void
}

export const ColumnContainer: React.FC<Props> = (props: Props) => {
  const { column, deleteColumn, updateColumnTitle, createNewTask, tasks } = props
  const [editMode, setEditMode] = useState(false)

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    },
    disabled: editMode
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
        onClick={() => { setEditMode(!editMode) }}
        className='flex flex-row items-center justify-between bg-appBackgroundColor border-columnBackgroundColor h-[60px] font-bold text-md cursor-grab border-4 rounded-lg gap-4 p-4 '>
        <p className='font-bold bg-columnBackgroundColor px-2 py-1 rounded-lg' >0</p>
        <p className='text-white font-bold'>
          {!editMode && column.title}
          {editMode &&
           <input
             type='text'
             className='bg-appBackgroundColor text-white font-bold'
             value={column.title}
             onChange={(e) => { updateColumnTitle(column.id, e.target.value) }}
             autoFocus onBlur={() => { setEditMode(!editMode) }}
             onKeyDown={(e) => {
               if (e.key === 'Enter') {
                 setEditMode(!editMode)
               }
             }
             }
           />}
        </p>
        <button
          onClick={() => { deleteColumn(column.id) }}
          className='h-[30px] w-[30px] rounded-full bg-appBackgroundColor stroke-gray-500  hover:stroke-purple-600 flex justify-center items-center'>
          <TrashIcon />
        </button>
      </div>

      {/* Task container */}
      <div className='flex flex-grow flex-col  p-2 overflow-x-hidden overflow-y-auto'>
        {
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        }
      </div>
      {/* Footer */}
      <button
        onClick={() => { createNewTask(column.id) }}
        className='rounded-md hover:bg-appBackgroundColor p-4 gap-2 text-white hover:text-purple-600 flex justify-center items-center my-1 mx-1'>
        <PlusIcon />  Add Task
      </button>
    </div>
  )
}

export default ColumnContainer
