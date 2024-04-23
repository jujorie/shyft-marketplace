/* eslint-disable @next/next/no-img-element */
import { MarketListButton } from "../MarketListButton/MarketListButton";
import { NFT } from "../NFT/NTF";
import "./NFTList.scss"

import { FC, PropsWithChildren } from "react";

export interface NFTData {
  metadata_uri: string
  image_uri: string
  name: string
  mint: string
}

export interface NFTListProperties {
  list?: NFTData[]
}

export const NFTList: FC<NFTListProperties> = ({
  list
}) => {
  return (
    <ul className="v-ntf-list">
      {list && list.map((item) => (
        <li key={item.mint} className="v-ntf-list__item">
          <NFT nft={item} />
          <MarketListButton nftAddress={item.mint}>
            List
          </MarketListButton>
        </li>
      ))}
    </ul>
  )
}