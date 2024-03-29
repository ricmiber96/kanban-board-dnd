import React, { useState } from 'react'
import { type Id, type Task } from '../types'
import TrashIcon from '../icons/TrashIcon'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  // TODO: Define the component props
  task: Task
  deleteTask: (id: Id) => void
  updateTask: (id: Id, content: string) => void
}

export const TaskCard: React.FC<Props> = (props: Props) => {
  const { task, deleteTask, updateTask } = props
  const [mouseOver, setMouseOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

  console.log(task.id)

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    },
    disabled: editMode
  })

  const taskStyle = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const toggleEditMode = (): void => {
    setEditMode(!editMode)
    setMouseOver(!mouseOver)
  }

  console.log(editMode, mouseOver)

  if (isDragging) {
    return (
      <div className='h-[100px] min-h-[100px] relative items-center text-left flex  bg-appBackgroundColor text-white p-4 rounded-lg my-1.5 mx-1 opacity-30 border-2 border-purple-600'>
        <p className='my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap'>
          {task.content}
        </p>
      </div>
    )
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={taskStyle}
        {...attributes}
        {...listeners}
        key={task.id}
        className='h-[100px] min-h-[100px] relative items-center text-left flex  bg-appBackgroundColor text-white p-4 rounded-lg my-1.5 mx-1 hover:ring-2 hover:ring-inset hover:ring-purple-700 cursor-grab'>
        <textarea
          className='w-full h-90%  text-white p-4 resize-none border-none rounded bg-transparent focus:outline-none'
          value={task.content}
          autoFocus
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              toggleEditMode()
            }
          }}
          onChange={(e) => { updateTask(task.id, e.target.value) }}
        />
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={taskStyle}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => { setMouseOver(true) }}
      onMouseLeave={() => { setMouseOver(false) }}
      key={task.id}
      className='h-[100px] min-h-[100px] relative items-center text-left flex  bg-appBackgroundColor text-white p-4 rounded-lg my-1.5 mx-1 hover:ring-2 hover:ring-inset hover:ring-purple-700 cursor-grab'>
      <p className='my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap'>
        {task.content}
      </p>
      {mouseOver && (
        <button onClick={() => { deleteTask(task.id) }} className='stroke-gray-400 absolute right-4 top1/2  bg-columnBackgroundColor p-2 rounded-md hover:stroke-white'>
          <TrashIcon />
        </button>)
      }
    </div>
  )
}

export default TaskCard
