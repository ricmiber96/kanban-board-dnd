import React, { useMemo, useState } from 'react'
import PlusIcon from '../icons/PlusIcon'
import { type Id, type Column, type Columns, type Task } from '../types'
import ColumnContainer from './ColumnContainer'
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent, useSensors, useSensor, PointerSensor, type DragOverEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import TaskCard from './TaskCard'
import { Button } from './ui/button'
import Navbar from './NavBar'
import Sidebar from './SideBar'

export const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const columnsId = useMemo(() => columns.map((column) => column.id), [columns])
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
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
    const newTasks = tasks.filter((task) => task.columnId !== id)
    setTasks(newTasks)
  }

  const onDragStart = (event: DragStartEvent) => {
    console.log(event)
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column as Column)
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task as Task)
    }
  }

  // const onDragEnd = (event: DragEndEvent) => {
  //   setActiveColumn(null)
  //   setActiveTask(null)
  //   const { active, over } = event
  //   if (over === null) {
  //     return
  //   }
  //   const activeColumnId = active.id
  //   const overColumnId = over.id
  //   if (activeColumnId === overColumnId) {
  //     return
  //   }
  //   setColumns((columns) => {
  //     const activeColumnIndex = columns.findIndex((column) => column.id === activeColumnId)
  //     const overColumnIndex = columns.findIndex((column) => column.id === overColumnId)

  //     return arrayMove(columns, activeColumnIndex, overColumnIndex)
  //   })
  // }

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveAColumn = active.data.current?.type === 'Column'
    if (!isActiveAColumn) return

    console.log('DRAG END')

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId)

      const overColumnIndex = columns.findIndex((col) => col.id === overId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  // const onDragOver = (event: DragOverEvent) => {
  //   const { active, over } = event
  //   if (over === null) {
  //     return
  //   }
  //   const activeColumnId = active.id
  //   const overColumnId = over.id
  //   if (activeColumnId === overColumnId) return

  //   const isActiveTask = active.data.current?.type === 'Task'
  //   const isOverTask = over.data.current?.type === 'Task'

  //   if (!isActiveTask) return

  //   // Im droppin the task in another task
  //   if (isActiveTask && isOverTask) {
  //     setTasks((tasks) => {
  //       const activeTaskIndex = tasks.findIndex((task) => task.id === activeColumnId)
  //       const overTaskIndex = tasks.findIndex((task) => task.id === overColumnId)

  //       tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId

  //       return arrayMove(tasks, activeTaskIndex, overTaskIndex)
  //     })
  //   }
  //   // Im droppin the task in another column
  //   const isOverColumn = over.data.current?.type === 'Column'
  //   if (isActiveTask && isOverColumn) {
  //     setTasks((tasks) => {
  //       const activeTaskIndex = tasks.findIndex((task) => task.id === activeColumnId)

  //       tasks[activeTaskIndex].columnId = overColumnId

  //       return arrayMove(tasks, activeTaskIndex, activeTaskIndex)
  //     })
  //   }
  // }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'

    if (!isActiveATask) return

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)

        tasks[activeIndex].columnId = overId
        console.log('DROPPING TASK OVER COLUMN', { activeIndex })
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  const updateColumnTitle = (id: Id, title: string) => {
    const newColumns = columns.map((column) => {
      if (column.id === id) {
        return {
          ...column,
          title
        }
      }
      return column
    })
    setColumns(newColumns)
  }

  const createNewTask = (columnId: Id) => {
    const newTask: Task = {
      id: window.crypto.randomUUID(),
      columnId,
      content: `Task ${tasks.length + 1}`
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id: Id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id)
    setTasks(filteredTasks)
  }

  const updateTask = (id: Id, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          content
        }
      }
      return task
    })
    setTasks(newTasks)
  }

  // This function make the drag and drop and click events works
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    })
  )

  return (
    <>
      <Navbar/>
      <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]'>
        <div className='m-auto'>
          <Sidebar/>
          <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
            <div className='flex gap-4 ml-60 relative'>
              <SortableContext items={columnsId}>
                {columns.map((column) => (
                  <ColumnContainer
                    key={column.id}
                    column={column}
                    deleteColumn={deleteColumn}
                    updateColumnTitle={updateColumnTitle}
                    createNewTask={createNewTask}
                    tasks={tasks.filter((task) => task.columnId === column.id)}
                    deleteTask={deleteTask}
                    updateTask={updateTask}/>
                ))
                }
              </SortableContext>
              <button
                onClick={() => { createNewColumn() }}
                className='h-[60px] w-[350px] min-w-[350px] flex flex-row gap-4 border-2 hover:border-purple-600 border-columnBackgroundColor bg-appBackgroundColor text-white font-bold p-4 rounded-lg cursor-pointer'>
                <PlusIcon/> Add Column
              </button>
            </div>
            {
              createPortal(
                <DragOverlay>
                  { activeColumn !== null && (
                    <ColumnContainer
                      tasks={tasks.filter(
                        (task) => task.columnId === activeColumn.id
                      )}
                      column={activeColumn}
                      deleteColumn={deleteColumn}
                      updateColumnTitle={updateColumnTitle}
                      createNewTask={createNewTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask} />
                  )}
                  {
                    activeTask !== null && (
                      <TaskCard
                        task={activeTask}
                        deleteTask={deleteTask}
                        updateTask={updateTask} />
                    )
                  }
                </DragOverlay>, document.body)
            }
          </DndContext>
        </div>
      </div>
    </>
  )
}

export default KanbanBoard
