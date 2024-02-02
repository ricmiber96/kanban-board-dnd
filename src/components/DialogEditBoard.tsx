import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import EditIcon from '@/icons/EditIcon'

interface Props {
  // TODO: Define the component props
}

export const DialogEditBoard: React.FC<Props> = ({ }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <EditIcon/>
          Edit Board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit board</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Board Name
            </Label>
            <Input
              id="board-name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Board Columns
            </Label>
            <Input
              id="board-column"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <Button variant={'outline'}>Add New Column</Button>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
          <Button variant="destructive">Delete Board</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogEditBoard
