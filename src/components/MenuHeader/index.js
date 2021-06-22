import { useState } from 'react'
import Menu from '../Menu'
import Navbar from '../Navbar'


const  MenuHeader = ({bgActive}) => {

  const [isOpen, setOpen] = useState(null)

  const handleClickHamburg = () => {
    setOpen(prevState => !prevState)

  }

  return (
    <div>
      <Menu isOpen={isOpen} />
      <Navbar isOpen={isOpen} bgActive={bgActive} onClickHamburg={handleClickHamburg} />
    </div>
  )
}


export default MenuHeader