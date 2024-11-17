import { IconProps } from '@/types/components/icon'
import { Icon as Iconify } from '@iconify/react'

const Icon = ({ className, ...rest }: {} & IconProps) => {
  return <Iconify {...rest} className={`icon ${className}`} />
}

export default Icon
