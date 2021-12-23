import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { getPokemon, fetchPokemons } from "../services/pokemon";
import { LineProgressBar } from "@frogress/line";
import { ShimmerPostItem } from "react-shimmer-effects";
import { PokemonContext } from "../Helpers/PokemonContext";

export default function PokemonDetail() {
  const location = useLocation();
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const { capturedPokemons, release, capture, addPokemons } =
    useContext(PokemonContext);

  useEffect(() => {
    getPokemon(location.pathname).then((data) => {
      setPokemon(data);
      // console.log(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });

    fetchPokemons(location.pathname).then((data) => {
      addPokemons(data);
      // console.log("fetch poke", data);
    });

    fetchPokemons();
  }, [location.pathname]);

  const { id, name, height, weight, base_experience } = pokemon;
  // console.log("data new stats :", pokemon);
  // console.log(pokemon.types && pokemon.types[0].type["name"]);

  // const cek = () => {
  //   alert("hah");
  // };
  function tangkap(capture) {
    console.log(capture);
  }
  return (
    <div>
      {loading ? (
        <ShimmerPostItem card title text cta />
      ) : (
        <div
          className={`pokeCard pokeCard--${
            pokemon.types && pokemon.types[0].type["name"]
          }`}
        >
          <div className="pokeCard__header">
            <h2 className="pokeCard__name">{name}</h2>
            <div className="pokeCard__imgContainer">
              <img
                className="pokeCard__img"
                src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}
                alt={`pokemon-${name}`}
              />
            </div>
            <ul className="pokeCard__types">
              {pokemon.types &&
                pokemon.types.map((type, index) => {
                  return (
                    <li className="pokeCard__type" key={index}>
                      {type["type"]["name"]}
                    </li>
                  );
                })}
            </ul>

            <div className="pokeCard__basics">
              <span>NO. {id}</span>
              <span>Height: {height}</span>
              <span>Weight: {weight}</span>
              <span>Base XP:{base_experience}</span>
            </div>

            <div className="pokeCard__stats">
              {pokemon.stats &&
                pokemon.stats.map((stat, index) => {
                  return (
                    <p key={index}>
                      {stat["stat"]["name"]}:
                      <span className="pokeCard__item">
                        <LineProgressBar
                          percent={stat.base_stat}
                          rounded={36}
                          height={10}
                        />
                        <strong>{stat.base_stat}%</strong>
                      </span>
                    </p>
                  );
                })}
            </div>
          </div>
          <h5 className="title-pokeCard">Abilities</h5>
          <ul className="pokeCard__abilities">
            {pokemon.abilities &&
              pokemon.abilities.map((ability, index) => {
                return (
                  <li className="pokeCard__ability" key={index}>
                    {ability["ability"]["name"]}
                  </li>
                );
              })}
          </ul>
          <button
            className="button-gatcha"
            type="sumbit"
            onClick={() => {
              tangkap(capture);
            }}
          >
            Gatcha
          </button>
        </div>
      )}
    </div>
  );
}
