import { memo, useEffect, useRef } from 'react'
import ItemsSlides from '../ItemsSlides'
import {links} from '../Search'

export default memo(function ItemContainer({
  isActive, 
  title, 
  i, 
  searchTerm, 
}: {
  isActive: boolean,
  title: string,
  i: number,
  searchTerm: string,
}) {

  const itemsContainerParentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const elem = itemsContainerParentRef.current
    if (!elem) return

    if (isActive) {
      // elem.scrollIntoView()
      // elem.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
      // elem.scrollIntoView({behavior: 'smooth'})
      elem.style.zIndex = '1'
      elem.style.visibility = 'visible'
    } else {
      elem.style.zIndex = '0'
      elem.style.visibility = 'hidden'
    }
  }, [isActive])

  return (
    <div 
        ref={itemsContainerParentRef}
        className={`w-full h-fullp absolute left-0 top-0 bottom-0 bg-[#4c4848] h-full  overflow-y-auto overflow-hidden`} 
        style={isActive
          ? {} 
          : {}
        }>
        <ItemsSlides 
          links={links[i]} 
          title={title} 
          searchTerm={searchTerm}
          itemsContainerParentRef={itemsContainerParentRef}
        />
    </div>
  )
})
