import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom"
import { Connection } from "@solana/web3.js"
import { getRawTransaction } from "./get-raw-transaction"

export async function signTransaction(encoded_transaction: string, wallet: PhantomWalletAdapter, connection: Connection): Promise<string> {
  const recoveredTransaction = getRawTransaction(encoded_transaction)
  const signedTransaction = await wallet.signTransaction(recoveredTransaction) 
  const signature = await connection.sendRawTransaction(signedTransaction.serialize())
  console.info(signature)
  return signature
}