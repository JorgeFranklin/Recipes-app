'use client'

import React, { useState } from 'react'

import { Button } from '@/src/components/ui/Button'
import { signOut } from 'next-auth/react'
import { Loader2 } from 'lucide-react'

const SignOutButton = () => {
  const [loading, setLoading] = useState(false)
  const logout = async () => {
    setLoading(true)
    try {
      await signOut({ redirect: true, callbackUrl: '/' })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      className="text-white"
      variant="dangerous"
      onClick={logout}
      isLoading={loading}
      iconForLoading={<Loader2 className="animate-spin mr-2" />}
    >
      Sign out
    </Button>
  )
}

export default SignOutButton
