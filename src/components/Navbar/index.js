import s from './style.module.css'
import cn from 'classnames'



const Navbar = ({ isOpen, bgActive = false, onClickHamburg }) => {

  const handleOpenMenu = () => {
    onClickHamburg()
  }

  return (
    <nav className={cn(s.root, { [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          LOGO
        </p>
        <div onClick={handleOpenMenu}
          className={cn(s.menuButton, { [s.active]: isOpen })} >

          <span />
        </div>
      </div>
    </nav >
  )
}


export default Navbar