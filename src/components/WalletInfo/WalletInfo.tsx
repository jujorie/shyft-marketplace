'use client'

import { usePhantomWallet } from "@/providers/PhantomProvider"
import { useShyft } from "@/providers/ShyftProvider"
import { FC, useEffect, useState } from "react"

export const WalletInfo: FC = () => {
  const [balance, setBalance] = useState<number>()
  const { wallet } = usePhantomWallet()
  const { shyft } = useShyft()

  const getBalance = () => {
    if (wallet?.publicKey === undefined || shyft === undefined) {
      return
    }

    shyft.wallet
      .getBalance({
        wallet: wallet.publicKey?.toString() ?? ''
      })
      .then((value: number) => {
        setBalance(value)
      })
  }

  if (wallet === undefined || shyft === undefined) {
    return <div>Not Connected</div>
  }



  return (
    <div>
      <article>
        <div>
          <label>Wallet </label>
          <span>{wallet?.publicKey?.toString()}</span>
        </div>
        <div>
          <label>Balance </label>
          {balance === undefined && (
            <button onClick={getBalance}>Get Balance</button>
          )}
          {balance !== undefined && (
            <span>{balance}</span>
          )}
        </div>
      </article>
    </div>
  )
}