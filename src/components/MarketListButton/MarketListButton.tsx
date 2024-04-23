import { useList } from "@/hooks/use-list";
import { ComponentProps, FC, PropsWithChildren } from "react";


export interface MarketListButtonProperties extends PropsWithChildren<ComponentProps<'button'>> {
  nftAddress: string
}

export const MarketListButton: FC<MarketListButtonProperties> = ({
  children,
  nftAddress,
  ...rest
}) => {
  const { list } = useList()
 
  const onClickHandler = () => {
    list(nftAddress, 0.5).catch((error) => {
      console.error("MarketListButton:Error", error.message)
    })
  }
  return (
    <button type='button' onClick={onClickHandler} {...rest}>
      {children}
    </button>
  )
}