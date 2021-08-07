import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">&copy; {1900 + new Date().getYear()} | Mount Zonah Medical Center</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Developed by </span>
        <a href="https://twitter.com/rere_jpeg" target="_blank" rel="noopener noreferrer">rere</a>
      </div>
    </CFooter>
  )
}
export default React.memo(TheFooter)
