import { useConnection } from "@/providers/ConnectionProvider"
import { usePhantomWallet } from "@/providers/PhantomProvider"
import { useShyft } from "@/providers/ShyftProvider"
import { getRawTransaction } from "@/utils/get-raw-transaction"
import { signTransaction } from "@/utils/sign-transaction"

export interface UseBuyReturn {
  buy(listState: string): Promise<string>
}

export function useBuy(): UseBuyReturn {
  const { shyft, marketplaceAddress } = useShyft()
  const { wallet } = usePhantomWallet()
  const { connection } = useConnection()

  const buy = async (listState: string): Promise<string> => {
    if (marketplaceAddress === undefined || shyft === undefined || wallet === undefined || connection === undefined) {
      throw new Error('Cannot Buy list')
    }
    const detail = await shyft.marketplace.listing.detail({
      marketplaceAddress,
      listState
    })

    const response = await shyft.marketplace.listing.buy({
      marketplaceAddress,
      sellerWallet: detail.seller_address,
      price: detail.price,
      nftAddress: detail.nft_address,
      buyerWallet: wallet.publicKey?.toString() ?? ''
    })

    return await signTransaction(response.encoded_transaction, wallet, connection)
  }

  return { buy }
}