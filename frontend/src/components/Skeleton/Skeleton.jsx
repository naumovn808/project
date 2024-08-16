import React from 'react'
import './sлeleton.css'
import Skeletoner, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Skeleton = () => {
  return (
    <>
        <SkeletonTheme baseColor="#202020" highlightColor="#444" className='sceleton-theme'  count={5}>
            <Skeletoner className='skeleton-card'/> 
            <Skeletoner className='skeleton'/> 
        </SkeletonTheme>
    </>
  )
}

export default Skeleton