import React from 'react'
import { type Task } from '../types'

interface Props {
  // TODO: Define the component props
  task: Task
}

export const TaskCard: React.FC<Props> = (props: Props) => {
  const { task } = props
  return (
    <div
      key={task.id}
      className='h-[100px] min-h-[100px] items-center text-left flex  bg-appBackgroundColor text-white p-4 rounded-lg my-1.5 mx-1 hover:ring-2 hover:ring-inset hover:ring-purple-700'>
      {task.content}
    </div>
  )
}

export default TaskCard
