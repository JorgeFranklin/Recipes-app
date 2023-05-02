import { getServerSession } from 'next-auth'

import { authOptions } from '@/src/app/api/auth/[...nextauth]/route'
import Menu from '@/src/components/Menu'

const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header>
      <Menu session={session} />
    </header>
  )
}

export default Header
