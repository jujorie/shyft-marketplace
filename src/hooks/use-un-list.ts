import { useConnection } from "@/providers/ConnectionProvider"
import { usePhantomWallet } from "@/providers/PhantomProvider"
import { useShyft } from "@/providers/ShyftProvider"
import { getRawTransaction } from "@/utils/get-raw-transaction"
import { signTransaction } from "@/utils/sign-transaction"

export interface UseUnListReturn {
  unList(listState: string): Promise<string>
}

export function useUnList(): UseUnListReturn {
  const { shyft, marketplaceAddress } = useShyft()
  const { wallet } = usePhantomWallet()
  const { connection } = useConnection()

  const unList = async (listState: string): Promise<string> => {
    if (marketplaceAddress === undefined || shyft === undefined || wallet === undefined || connection === undefined) {
      throw new Error('Cannot unlist list')
    }
    const encoded_transaction = await shyft.marketplace.listing.unlist({
      marketplaceAddress,
      listState,
      sellerWallet: wallet.publicKey?.toString() ?? ''
    })
    return await signTransaction(encoded_transaction, wallet, connection)
  }

  return { unList }
}