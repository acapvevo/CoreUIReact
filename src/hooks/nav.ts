import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { UseState } from '@/types/store'

const useNav = (index: number) => {
  const [navIndex, setNavIndex] = useOutletContext<UseState<number>>()


  useEffect(() => {
    setNavIndex(index)
  }, [])
}

export default useNav
