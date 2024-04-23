import { useConnection } from "@/providers/ConnectionProvider"
import { usePhantomWallet } from "@/providers/PhantomProvider"
import { useShyft } from "@/providers/ShyftProvider"
import { signTransaction } from "@/utils/sign-transaction"

export interface UseListReturn {
  list(nftAddress: string, price: number): Promise<string>
}

export function useList(): UseListReturn {
  const { shyft, marketplaceAddress } = useShyft()
  const { wallet } = usePhantomWallet()
  const { connection } = useConnection()

  const list = async (nftAddress: string, price: number): Promise<string> => {
    if (marketplaceAddress === undefined || shyft === undefined || wallet === undefined || connection === undefined) {
      throw new Error('Cannot list')
    }
    const result = await shyft.marketplace.listing.list({
      marketplaceAddress,
      nftAddress,
      price,
      sellerWallet: wallet.publicKey?.toString() ?? ''
    })
    return await signTransaction(result.encoded_transaction, wallet, connection)
  }

  return { list }
}