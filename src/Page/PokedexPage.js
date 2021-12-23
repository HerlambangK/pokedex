import React from "react";
import { useEffect, useState } from "react";
import { getMorePokemons, getPokemons } from "../services/pokemons";
import { Link } from "react-router-dom";
import { ShimmerTable } from "react-shimmer-effects";
import { PokemonContext } from "../Helpers/PokemonContext";
import { useContext } from "react/cjs/react.development";

export default function PokedexPage() {
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const { capturedPokemons, release } = useContext(PokemonContext);
  console.log("capture", capturedPokemons);
  console.log("relese: ", release);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        getPokemons().then((data) => {
          setPokemons(data);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          return data;
        });
      } catch (err) {
        // throw err;
        console.log(err);
      }
    };
    getPokemon();
  }, []);

  const capturedPokemonss = (props) => {
    console.log(props);
  };
  const morePokemon = (event) => {
    getMorePokemons(count + 19).then((data) => {
      setPokemons(data);
      setCount((prevCount) => {
        return prevCount + 20;
      });
    });
  };

  return (
    <div className="container">
      <h4> My Pokomen </h4>
      {loading ? (
        <ShimmerTable row={10} />
      ) : (
        <div className="section">
          {pokemons["results"].map((pokemon, index) => {
            return (
              <div className="card" key={pokemon.url}>
                <img
                  className="card-image"
                  src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                  alt={pokemon.name}
                />
                <div className="card-title">{pokemon.name}</div>
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className="card-button-edit"
                  type="sumbit"
                >
                  Edit
                </Link>
                <button
                  className="card-button-hapus"
                  type="sumbit"
                  onClick={() => {
                    capturedPokemonss();
                  }}
                >
                  Relese
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
