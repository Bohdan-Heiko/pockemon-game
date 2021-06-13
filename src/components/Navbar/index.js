import s from './style.module.css'
import cn from 'classnames'



const Navbar = ({ isActive, changeMenu }) => {

  const handleOpenMenu = () => {
    changeMenu && changeMenu()
  }

  return (
    <nav className={s.root}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          LOGO
        </p>
        <a className={cn(s.menuButton), { [s.active]: isActive }}>
          {/* <button onClick={handleOpenMenu}></button> */}
          <span onClick={handleOpenMenu} >Change Menu</span>
        </a>
      </div>
    </nav>
  )
}


export default Navbar