'use client'

import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom"
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

export interface PhantomProviderContextData {
    wallet?: PhantomWalletAdapter
}

const PhantomProviderContext = createContext<PhantomProviderContextData>({
  wallet: undefined
})

export const usePhantomWallet = () => useContext(PhantomProviderContext)

export const PhantomProvider: FC<PropsWithChildren> = ({
  children
}) => {
  const [wallet, setWallet] = useState<PhantomWalletAdapter>()

  useEffect(() => {
    const connect = async () => {
      const newWallet = new PhantomWalletAdapter()
      await newWallet.connect()
      setWallet(newWallet)
    }
    connect().catch((error) => {
      console.error('PhantomProvider.connect:ERROR', error.message)
    })
  }, [])

  return (
    <PhantomProviderContext.Provider value={{wallet}}>
      {children}
    </PhantomProviderContext.Provider>
  )
}
