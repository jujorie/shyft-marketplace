'use client'

import { Network, ShyftSdk } from "@shyft-to/js";
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

export interface ShyftProviderData {
  shyft?: ShyftSdk
  marketplaceAddress?: string
}

const ShyftContext = createContext<ShyftProviderData>({
  shyft: undefined,
  marketplaceAddress: undefined
})

export const useShyft = () => useContext(ShyftContext) 

export interface ShyftProviderProperties extends PropsWithChildren {
  apiKey?: string
  network?: string
  marketplaceAddress?: string 
}

export const ShyftProvider: FC<ShyftProviderProperties> = ({children, apiKey, network, marketplaceAddress}) => {
  const [shyft, setShyft] = useState<ShyftSdk>()
  const [address, setAddress] = useState<string>()

  useEffect(() => {
    setAddress(marketplaceAddress)
  }, [marketplaceAddress])

  useEffect(() => {
    if(apiKey === undefined || network === undefined) return

    const instance = new ShyftSdk({
      network: network as Network,
      apiKey
    })
    setShyft(instance)
  }, [apiKey, network])

  return (
    <ShyftContext.Provider value={{shyft, marketplaceAddress: address}}>
      {children}
    </ShyftContext.Provider>
  )
}