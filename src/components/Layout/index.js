import s from './style.module.css'

import cn from 'classnames'

const Layout = ({ id, title, urlBg, clrBg, children }) => {
  const backgroundStyle = {
    background: urlBg && `url(${urlBg})`,
    backgroundColor: clrBg
  };

  return (
    <section className={s.root} style={backgroundStyle} id={id}>
      <div className={s.wrapper}>
        <article>
          <div className={s.title}>
            <h3>{title}</h3>
            <span className={s.separator}></span>
          </div>
          <div className={cn(s.desc, s.full)}>
            <p>{children}</p>
          </div>
        </article>
      </div>
    </section>
  )
};


export default Layout;