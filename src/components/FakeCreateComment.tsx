'use client'

import Link from 'next/link'
import Image from 'next/image'

import { buttonVariants } from '@/src/components/ui/Button'
import { useRouter } from 'next/navigation'

const FakeCreateComment = () => {
  const router = useRouter()

  const redirectToSignIn = () => {
    router.push('/sign-in')
  }

  return (
    <div className="flex gap-4" onClick={redirectToSignIn}>
      <div className="flex h-full min-w-[44px]">
        <Link href={`/account`}>
          <Image
            src="/default-user.jpg"
            width={44}
            height={44}
            alt="user profile picture."
            quality={100}
            className="rounded-full"
          />
        </Link>
      </div>
      <div className="flex flex-col h-full w-full gap-2 max-md:max-w-[80%]">
        <div className="flex flex-col">
          <textarea
            disabled
            className={buttonVariants({
              className:
                'rounded-2xl resize-none bg-transparent text-white border-app-light border overflow-y-clip cursor-text disabled:opacity-100',
            })}
            placeholder="Comment here!"
          />
        </div>
      </div>
    </div>
  )
}

export default FakeCreateComment
