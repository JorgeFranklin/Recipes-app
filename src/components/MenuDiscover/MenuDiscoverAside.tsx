'use client'

import {
  BeefIcon,
  Croissant,
  EggFriedIcon,
  IceCream,
  IceCream2,
  Plus,
  SaladIcon,
  SandwichIcon,
  SoupIcon,
  UtensilsCrossedIcon,
  VeganIcon,
  X,
} from 'lucide-react'

import Link from 'next/link'
import { useState } from 'react'
import { MenuIcon } from 'lucide-react'

import { Button } from '@/src/components/ui/Button'
import { Transition } from '@headlessui/react'

const MenuDiscoverAside = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDiscoverAside = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button className="hidden max-lg:block" onClick={toggleDiscoverAside}>
        <MenuIcon />
      </Button>

      <Transition
        show={isOpen}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="bg-app-light fixed top-0 right-0 left-0 bottom-0 h-screen flex flex-col items-center justify-center">
          <Button
            variant="dangerous"
            className="absolute top-5 right-5"
            onClick={toggleDiscoverAside}
          >
            <X />
          </Button>

          <div className="flex flex-col gap-4 text-2xl">
            <Link
              href="/create"
              className="flex items-center gap-2"
              onClick={toggleDiscoverAside}
            >
              <Plus />
              Write recipe
            </Link>
            <Link
              href="/category/breakfast"
              className="flex items-center gap-2"
              onClick={toggleDiscoverAside}
            >
              <EggFriedIcon />
              Breakfast
            </Link>
            <Link
              href="/category/lunch"
              className="flex items-center gap-2"
              onClick={toggleDiscoverAside}
            >
              <BeefIcon />
              Lunch
            </Link>
            <Link
              href="/category/dinner"
              className="flex items-center gap-2"
              onClick={toggleDiscoverAside}
            >
              <UtensilsCrossedIcon />
              Dinner
            </Link>
            <Link
              href="/category/appetizer"
              className="flex items-center gap-2"
              onClick={toggleDiscoverAside}
            >
              <Croissant />
              Appetizer
            </Link>
            <Link
              href="/category/salad"
              className="flex items-center gap-2"
              onClick={toggleDiscoverAside}
            >
              <SaladIcon />
              Salad
            </Link>
            <Link
              href="/category/dessert"
              className="flex items-center gap-2"
              onClick={toggleDiscoverAside}
            >
              <IceCream2 />
              Dessert
            </Link>
            <Link
              href="/category/snack"
              className="flex items-center gap-2"
              onClick={toggleDiscoverAside}
            >
              <SandwichIcon />
              Snack
            </Link>
            <Link
              href="/category/soup"
              className="flex items-center gap-2"
              onClick={toggleDiscoverAside}
            >
              <SoupIcon />
              Soup
            </Link>
            <Link
              href="/category/holiday"
              className="flex items-center gap-2"
              onClick={toggleDiscoverAside}
            >
              <IceCream />
              Holiday
            </Link>
            <Link
              href="/category/vegetarian"
              className="flex items-center gap-2"
              onClick={toggleDiscoverAside}
            >
              <VeganIcon />
              Vegetarian
            </Link>
          </div>
        </div>
      </Transition>
    </>
  )
}

export default MenuDiscoverAside
