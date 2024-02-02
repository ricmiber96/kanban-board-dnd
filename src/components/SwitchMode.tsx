import React, { useEffect, useState } from 'react'
import { Switch } from './ui/switch'
import MoonIcon from '@/icons/MoonIcon'
import SunIcon from '@/icons/SunIcon'

import { useTheme } from '@/components/themeProvider'

interface Props {
  // TODO: Define the component props
}

export const SwitchMode: React.FC<Props> = ({ }) => {
  const { theme, setTheme } = useTheme()
  const [isCheck, setIsCheck] = useState(true)

  const handleChange = (): void => {
    if (isCheck) {
      setIsCheck(!isCheck)
      setTheme('light')
    } else {
      setTheme('dark')
      setIsCheck(!isCheck)
    }
    console.log(theme)
  }

  return (
    <div className="flex space-x-2 mb-6 py-2 px-6 bg-gray-400 dark:bg-gray-700  rounded-lg mx-4">
      <div className='flex relative w-full items-center justify-center gap-2 stroke-black dark:stroke-white'>
        <SunIcon/>
        <Switch id="airplane-mode"
          checked={isCheck}
          onCheckedChange={handleChange}/>
        <MoonIcon />
      </div>
    </div>
  )
}

export default SwitchMode
