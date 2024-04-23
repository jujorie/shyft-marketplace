import './MarketList.scss'

import { FC } from "react";
import { listingData } from "../MarketListContainer";
import { NFT } from "../NFT";
import { useUnList } from '@/hooks/use-un-list';
import { useBuy } from '@/hooks/use-buy';

export interface MarketListProperties {
  list?: listingData
}

export const MarketList: FC<MarketListProperties> = ({
  list
}) => {
  const { unList } = useUnList()
  const { buy } = useBuy()

  const onUnlistClick = (listState: string) => {
    return () => {
      unList(listState)
        .then((receipt) => {
          console.info(receipt)
        })
        .catch((error) => {
          console.error('MarketList.unlist:error', error.message)
        })
    }
  }

  const onBuyClick = (listState: string) => {
    return () => {
      buy(listState)
        .then((receipt) => {
          console.info(receipt)
        })
        .catch((error) => {
          console.error('MarketList.unlist:error', error.message)
        })
    }
  }

  return (
    <ul className='v-market-list'>
      {list && list.map((item) => (
        <li className='v-market-list__item' key={item.receipt}>
          <NFT nft={item.nft} />
          <div>
            <button onClick={onUnlistClick(item.list_state)}>
              UnList
            </button>
            <button onClick={onBuyClick(item.list_state)}>
              Buy
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}