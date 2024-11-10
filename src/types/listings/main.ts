import { Dispatch, SetStateAction } from "react"
  
export interface ListingProps {
  counter: number
  setID: Dispatch<SetStateAction<number | undefined>>
  setViewing: Dispatch<SetStateAction<boolean>>
  setVisible: Dispatch<SetStateAction<boolean>>
}