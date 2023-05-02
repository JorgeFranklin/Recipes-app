'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Session } from 'next-auth'
import { useState } from 'react'
import { ArrowLeft, LogInIcon, Plus, SearchIcon, User } from 'lucide-react'

import { Button, buttonVariants } from '@/src/components/ui/Button'
import Container from '@/src/components/ui/Container'
import Search from '@/src/components/Search'
import { Paragraph } from '@/src/components/ui/Paragraph'
import MenuDiscover from '@/src/components/MenuDiscover/MenuDiscover'

export type MenuProps = {
  session: Session | null
}

const Menu = ({ session }: MenuProps) => {
  const [openSearch, setOpenSearch] = useState(false)

  const handleToggleSearch = () => {
    setOpenSearch(!openSearch)
  }

  return (
    <nav className="fixed top-0 right-0 left-0 w-full border-b-2 border-app-light bg-app-dark/50 backdrop-blur z-10">
      <Container className="relative flex items-center justify-between h-20 w-full">
        {openSearch ? (
          <div className="flex gap-4 w-full self-center">
            <div className="flex gap-4 mx-auto">
              <Button onClick={handleToggleSearch}>
                <ArrowLeft />
              </Button>
              <Search />
            </div>
          </div>
        ) : (
          <>
            <Link
              href="/"
              className="max-lg:absolute max-lg:left-0 max-lg:right-0 select-none flex items-center flex-grow"
            >
              <Image
                src="/logo.svg"
                width="60"
                height="60"
                alt="logo"
                className="max-lg:absolute max-lg:left-1/2 max-lg:transform max-lg:-translate-x-1/2"
              />
              <Paragraph className="text-app-light max-lg:hidden" size="large">
                recipes
              </Paragraph>
            </Link>

            <div className="flex w-full gap-4 max-lg:justify-between justify-end items-center">
              <div className="max-lg:hidden">
                <Search />
              </div>

              <MenuDiscover />

              <div className="flex items-center gap-4">
                <div className="hidden max-lg:block">
                  <Button onClick={handleToggleSearch}>
                    <SearchIcon />
                  </Button>
                </div>

                {!!session ? (
                  <div>
                    <Link
                      href="/account"
                      className={buttonVariants({ className: 'order-1' })}
                    >
                      <User />
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link
                      href="/sign-in"
                      className={buttonVariants({ className: 'order-1' })}
                    >
                      <LogInIcon />
                    </Link>
                  </div>
                )}

                <div className="max-md:hidden">
                  <Link href="/create" className={buttonVariants()}>
                    <Plus />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </nav>
  )
}

export default Menu
