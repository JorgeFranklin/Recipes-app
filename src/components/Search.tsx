'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

import { Button, buttonVariants } from '@/src/components/ui/Button'
import Input from '@/src/components/ui/Input'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()

    if (searchTerm.length > 0) {
      router.push(`/results?q=${searchTerm}`)
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className={buttonVariants() + 'flex pr-4 pl-0 h-12'}
    >
      <Input
        className="hover:brightness-100 outline-none placeholder:text-black"
        placeholder="Find recipes..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button className="hover:brightness-100 px-0">
        <SearchIcon />
      </Button>
    </form>
  )
}

export default Search
