'use client'

import { useShyft } from "@/providers/ShyftProvider"
import { ListedNftDetail } from "@shyft-to/js"
import { FC, useEffect, useState } from "react"
import { MarketList } from "../MarketList/MarketList";

export type listingData = Omit<ListedNftDetail, 'cancelled_at' | 'purchased_at' | 'purchase_receipt'>[];

export const MarketListContainer:FC = () => {
  const { shyft } = useShyft()
  const [list, setList] = useState<listingData>()

  useEffect(() => {
    if(shyft === undefined) return

    const getListings = async () => {
      const result = await shyft.marketplace.listing.active({
        marketplaceAddress: '9JZguLV4Y6Kfse4QzuhcicjS6bAJ5t2M8w2zX8xb4FRw',
        sortBy: 'price',
        sortOrder: 'desc',
        page: 1,
        size: 50
      })
  
      setList(result.data)
    }

    getListings().catch((error) => {
      console.info('MarketListContainer:errors', error.message)
    })
  }, [shyft])

  return (
    <MarketList list={list} />
  )
}