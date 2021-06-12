
import s from './style.module.css'

const Layout = ({ title, desc, urlBg, clrBg }) => {

  const backgroundStyle = {
    background: urlBg && `url(${urlBg})`,
    backgroundColor: clrBg
  };

  // const backgroundStyle ={ 
  //   urlBg ? urlBg : clg
  // }

  return (
    <section className={s.root} style={backgroundStyle} >
      <div className={s.wrapper}>
        <article>
          {/* <img src={backgroundStyle} alt={'image'} /> */}
          <div className={s.title}>
            <h3>{title}</h3>
            <span className={s.separator}></span>
          </div>
          <div className={s.desc, s.full}>
            <p>{desc}</p>
          </div>
        </article>
      </div>
    </section>
  )
}


export default Layout