'use client'

import { ReactNode, useState } from 'react'
import { buttonVariants } from '../ui/Button'
import { ChevronDownIcon } from 'lucide-react'
import { Transition } from '@headlessui/react'

export type MenuDiscoverDropdown = {
  children: ReactNode
}

const MenuDiscoverDropdown = ({ children }: MenuDiscoverDropdown) => {
  const [openDiscover, setOpenDiscover] = useState(false)

  const toggleOpenDiscover = () => {
    setOpenDiscover(!openDiscover)
  }

  return (
    <div>
      <div
        className={buttonVariants({
          className: 'relative max-lg:hidden z-20 cursor-pointer',
        })}
        onClick={toggleOpenDiscover}
      >
        Discover <ChevronDownIcon />
        <Transition
          show={openDiscover}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute -bottom-[325px] pt-2 -left-[80%] transform -translate-x-1/2">
            <div
              className={buttonVariants({
                className:
                  'max-lg:hidden hover:filter-none flex flex-col px-0 w-[600px] h-[300px]',
              })}
            >
              {children}
            </div>
          </div>
        </Transition>
      </div>
      <Transition
        show={openDiscover}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed z-10 bg-black/50 h-screen w-screen top-0 right-0 bottom-0 left-0"
          onClick={toggleOpenDiscover}
        />
      </Transition>
    </div>
  )
}

export default MenuDiscoverDropdown
