/* eslint-disable @next/next/no-img-element */
import './NFT.scss'

import { FC } from "react";
import { NFTData } from "../NFTList";


export interface NFTProperties {
  nft?: NFTData
}

export const NFT: FC<NFTProperties> = ({ nft }) => {
  if(nft === undefined) {
    return null
  }
  return (
    <article className="v-nft">
      <header>
        <h3>{nft.name}</h3>
      </header>
      <div>
        <img className="v-nft__image" src={nft.image_uri} alt={nft.name} />
      </div>
    </article>
  )
}