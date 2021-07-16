import { Route, Switch, useRouteMatch } from "react-router-dom";
import { PokemonContext } from '../../../context/pokemonContext'

import StartPage from './routes/StartPage';
import BoardPage from './routes/BoardPage';
import FinishPage from './routes/FinishPage';
import { useState } from "react";


const GamePage = () => {
  const [selectedPokemon, setSelectedPokmons] = useState({})
  const match = useRouteMatch();

  const handleSelecdetPokemons = (key, pokemon) => {

    setSelectedPokmons(prevState => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];

        return copyState;
      }
      
      
      return {
        ...prevState,
        [key]: pokemon
      }

    })
  }
  return (
    <PokemonContext.Provider value={{
      pokemons: selectedPokemon,
      onSelectedPokemons: handleSelecdetPokemons
    }}>
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>

  );
};

export default GamePage;