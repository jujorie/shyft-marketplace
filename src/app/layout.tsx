import { WalletInfo } from '@/components/WalletInfo'
import { ConnectionProvider } from '@/providers/ConnectionProvider'
import { PhantomProvider } from '@/providers/PhantomProvider'
import { ShyftProvider } from '@/providers/ShyftProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SHYFT Marketplace Sample',
  description: 'Shyft Marketplace for NFT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PhantomProvider>
          <ConnectionProvider 
            network={process.env.SHYFT_NETWORK}
          >
          <ShyftProvider
            apiKey={process.env.SHYFT_API_KEY}
            network={process.env.SHYFT_NETWORK}
            marketplaceAddress={process.env.MARKETPLACE_ADDRESS}
          >
            <main>
              <header>
                <h1>Trade Place</h1>
                <WalletInfo />
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/marketplace">Marketplace</Link>
                  </li>
                </ul>
                <hr />
              </header>
              <div>
                {children}
              </div>

            </main>
          </ShyftProvider>
          </ConnectionProvider>
        </PhantomProvider>
      </body>
    </html>
  )
}
