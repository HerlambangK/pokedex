import React, { createContext } from "react";
import { usePokemonReducer } from "./usePokemonReducer";
import { CAPTURE, RELEASE, ADD_POKEMON, ADD_POKEMONS } from "./actions";

const PokemonContext = createContext();

const PokemonProvider = (props) => {
  console.log("context props", props);
  const [state, dispatch] = usePokemonReducer();
  const { pokemons, capturedPokemons } = state;
  console.log("pokemons", pokemons);
  console.log("capturedPokemons", capturedPokemons);

  const capture = (pokemon) => () => dispatch({ type: CAPTURE, pokemon });
  const release = (pokemon) => () => dispatch({ type: RELEASE, pokemon });
  const addPokemon = (pokemon) => dispatch({ type: ADD_POKEMON, pokemon });
  const addPokemons = (pokemons) => dispatch({ type: ADD_POKEMONS, pokemons });

  console.log("capture", capture);
  console.log(state);

  const providerValue = {
    pokemons,
    capturedPokemons,
    capture,
    release,
    addPokemon,
    addPokemons,
  };

  // console.log(props.children);
  return (
    <PokemonContext.Provider value={providerValue}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
