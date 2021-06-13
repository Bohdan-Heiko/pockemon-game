import { useState } from 'react'
import Menu from '../Menu'
import Navbar from '../Navbar'


const  MenuHeader = () => {

  const [isActiveNavbar, changeNavbar] = useState(false)

  const changeMenu = () => {
    changeNavbar(!isActiveNavbar)

  }

  return (
    <div>
      {/* <button onClick={changeMenu}>sssssss</button> */}
      <Menu deActive={!isActiveNavbar} />
      <Navbar isActive={isActiveNavbar} changeMenu={changeMenu} />
    </div>
  )
}


export default MenuHeader