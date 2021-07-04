import Header from '../../Header';
import Layout from '../../Layout';
import MenuHeader from '../../MenuHeader';

import imgBg2 from '../../Assets/bg2.jpg'



const HomePage = ({ onChangePage }) => {

  const handleClickButton = (page) => {
    console.log("###: <HomePage />");
    onChangePage && onChangePage(page);
  }



  return (
    <>
      <MenuHeader />
      <Header
        title={'This is title'}
        desc={'This is Description!'}
        onClickButton={handleClickButton}
      />
      <Layout id={1} urlBg={imgBg2} >



      </Layout>
      <Layout id={2}>
{/* 
        <div className={s.flex}>
          {
            Pokemons.map(({id, name, img, type, values}) => <PokemonCard key={id}
              id={id}
              name={name}
              img={img}
              type={type}
              values={values}
            />)
          }
        </div> */}

      </Layout>

      
    </>
  )
}

export default HomePage;
