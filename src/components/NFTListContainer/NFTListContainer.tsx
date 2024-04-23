'use client'

import { usePhantomWallet } from "@/providers/PhantomProvider";
import { useShyft } from "@/providers/ShyftProvider";
import { FC, useEffect, useState } from "react";
import { NFTList } from "../NFTList/NFTList";
import { Nft } from "@shyft-to/js";


export const NFTListContainer: FC = () => {
  const { shyft } = useShyft()
  const { wallet } = usePhantomWallet()
  const [nfts, setNfts] = useState<Nft[]>()

  useEffect(() => {
    const load = async () => {
      if(shyft === undefined || wallet === undefined) {
        return
      }
      const result = await shyft?.nft.getNftsByOwnerV2({
        owner: wallet?.publicKey?.toString() ?? ''
      })
      setNfts(result.nfts)
      console.info('NFTS', result.nfts)
    }
    load().catch((error) => {
      console.error('NFTListContainer: ERROR', error.message)
    })
  }, [shyft, wallet])
  

  return (
    <NFTList list={nfts} />
  )
}