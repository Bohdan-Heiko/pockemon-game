import PokemonCard from '../../PokemonCard';
import database from '../../service/firebase'

import { useHistory } from 'react-router-dom';
import s from './style.module.css'
import { useEffect, useState, useContext } from 'react';
import { FireBaseContext } from '../../../context/firebaseContext';

const DATA = {
  "abilities": [
    "keen-eye",
    "tangled-feet",
    "big-pecks"
  ],
  "base_experience": 122,
  "height": 11,
  "weight": 300,
  "id": 17,
  "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
  "name": "pidgeotto",
  "stats": {
    "hp": 63,
    "attack": 60,
    "defense": 55,
    "special-attack": 50,
    "special-defense": 50,
    "speed": 71
  },
  "type": "normal",
  "values": {
    "top": 7,
    "right": 5,
    "bottom": 1,
    "left": 2

  }
}

const GamePage = () => {
  const history = useHistory()
  const handleClickButton = () => {
    history.push('/')
  }
  const firebase = useContext(FireBaseContext)
  const [currentPokemons, setActivePokemons] = useState({})


  
  useEffect(() => {
    firebase.getPokemonSoket((pokemon) => {
      setActivePokemons(pokemon)
    })
  }, [])

  const revertPokemons = (id) => {
    setActivePokemons(prevState => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] };
        if (pokemon.id === id) {
          pokemon.active = !pokemon.active;
        };

        acc[item[0]] = pokemon;
        firebase.postPokemon(item[0], pokemon)

        return acc;
      }, {});
    });
  }


  const handleAddPokemon = () => {
    const data = DATA;
    firebase.addPokemon(data)
      //  async () => {
      // await getPokemons();
    // })

  }


  return (
    <>
      <div className={s.flex}>
        <button onClick={handleAddPokemon}>
          Add New Pokemon
        </button>

        {
          Object.entries(currentPokemons).map(([key, { id, name, img, type, values, active }]) => <PokemonCard
            key={key}
            id={id}
            name={name}
            img={img}
            type={type}
            values={values}
            isActive={active}
            revertPokemon={revertPokemons}
          />)
        }

      </div>
      {/* <button onClick={handleClickButton}>Back to Home</button> */}
    </>
  )

}

export default GamePage