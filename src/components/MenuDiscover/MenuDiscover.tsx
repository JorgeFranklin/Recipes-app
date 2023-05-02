import {
  BeefIcon,
  Croissant,
  EggFriedIcon,
  IceCream,
  IceCream2,
  SaladIcon,
  SandwichIcon,
  SoupIcon,
  UtensilsCrossedIcon,
  VeganIcon,
} from 'lucide-react'
import Link from 'next/link'

import MenuDiscoverDropdown from '@/src/components/MenuDiscover/MenuDiscoverDropDown'
import MenuDiscoverAside from '@/src/components/MenuDiscover/MenuDiscoverAside'

const MenuDiscover = () => {
  return (
    <div>
      <MenuDiscoverAside />

      <MenuDiscoverDropdown>
        <div className="grid grid-cols-2 w-full h-full">
          <Link
            href="/category/breakfast"
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <EggFriedIcon />
            Breakfast
          </Link>
          <Link
            href="/category/lunch"
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <BeefIcon />
            Lunch
          </Link>
          <Link
            href="/category/dinner"
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <UtensilsCrossedIcon />
            Dinner
          </Link>
          <Link
            href="/category/appetizer"
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <Croissant />
            Appetizer
          </Link>
          <Link
            href="/category/salad"
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <SaladIcon />
            Salad
          </Link>
          <Link
            href="/category/dessert"
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <IceCream2 />
            Dessert
          </Link>
          <Link
            href="/category/snack"
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <SandwichIcon />
            Snack
          </Link>
          <Link
            href="/category/soup"
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <SoupIcon />
            Soup
          </Link>
          <Link
            href="/category/holiday"
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <IceCream />
            Holiday
          </Link>
          <Link
            href="/category/vegetarian"
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <VeganIcon />
            Vegetarian
          </Link>
        </div>
      </MenuDiscoverDropdown>
    </div>
  )
}

export default MenuDiscover
