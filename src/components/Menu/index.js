import {Link} from 'react-router-dom'


import s from './style.module.css'
import cn from 'classnames'



const Menu = ({ isOpen, onClickHamburg}) => {
  const MENU = [
    {
      title: "HOME",
      to: "/home"
    },
    {
      title: "GAME",
      to: "game"
    },
    {
      title: "ABOUT",
      to: "about"
    },
    {
      title: "CONTACT",
      to: "contact"
    }
  ]

  return (
    <div className={cn(s.menuContainer,
      { [s.active]: isOpen === true },
      { [s.deActive]: isOpen === false })}>
      <div className={s.overlay} />
      <div className={s.menuItems} >
        <ul>
          {
            MENU.map(({ title, to }, index) => (
              <li key={index}>
                <Link to={to} onClick={onClickHamburg}>{title}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Menu