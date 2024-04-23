'use client'

import { Cluster, Connection, clusterApiUrl } from "@solana/web3.js";
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

export interface ConnectionData {
  connection?: Connection
}

const ConnectionContext = createContext<ConnectionData>({})

export const useConnection = () => useContext(ConnectionContext)

export interface ConnectionProviderProperties extends PropsWithChildren {
  network?: string
}

export const ConnectionProvider: FC<ConnectionProviderProperties> = ({
  children,
  network
}) => {
  const [connection, setConnection] = useState<Connection>()

  useEffect(() => {
    if (network === undefined) return

    const rpcUrl = clusterApiUrl(network as Cluster)
    const newConnection = new Connection(rpcUrl, 'confirmed')
    setConnection(newConnection)
  }, [network])

  return (
    <ConnectionContext.Provider value={{ connection }}>
      {children}
    </ConnectionContext.Provider>
  )
}
