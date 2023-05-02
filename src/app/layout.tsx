import { Poppins } from 'next/font/google'

import '@/src/styles/globals.css'
import Container from '@/src/components/ui/Container'
import Footer from '@/src/components/Footer'
import Providers from '@/src/components/Providers'
import Header from '@/src/components/Header'

export const metadata = {
  title: 'Recipes App',
  description: 'Recipes App',
}

const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <Providers>
        <body className="min-h-screen bg-app-dark antialiased selection:bg-app-green-dark">
          {/* @ts-expect-error Server Component */}
          <Header />
          <Container>
            <div className="pt-28">{children}</div>
          </Container>
          <Footer />
        </body>
      </Providers>
    </html>
  )
}
