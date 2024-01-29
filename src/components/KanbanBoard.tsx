import React, { useMemo, useState } from 'react'
import PlusIcon from '../icons/PlusIcon'
import { type Id, type Column, type Columns } from '../types'
import ColumnContainer from './ColumnContainer'
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent, useSensors, useSensor, PointerSensor } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'

export const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([])
  const columnsId = useMemo(() => columns.map((column) => column.id), [columns])
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
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

  const onDragStart = (event: DragStartEvent) => {
    console.log(event)
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) {
      return
    }
    const activeColumnId = active.id
    const overColumnId = over.id
    if (activeColumnId === overColumnId) {
      return
    }
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((column) => column.id === activeColumnId)
      const overColumnIndex = columns.findIndex((column) => column.id === overColumnId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
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
    <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]'>
      <div className='m-auto'>
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <div className='flex gap-4'>
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer key={column.id} column={column} deleteColumn={deleteColumn} />
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
                  <ColumnContainer column={activeColumn} deleteColumn={deleteColumn} />
                )}
              </DragOverlay>, document.body)
          }
        </DndContext>
      </div>
    </div>
  )
}

export default KanbanBoard
