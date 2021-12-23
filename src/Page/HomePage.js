import React from "react";
import { useEffect, useState } from "react";
import { getMorePokemons, getPokemons } from "../services/pokemons";
import { Link } from "react-router-dom";
import { ShimmerTable } from "react-shimmer-effects";

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);

  // const detailPokemon = "https://pokeapi.co/api/v2/pokemon/";
  useEffect(() => {
    const getPokemon = async () => {
      try {
        getPokemons().then((data) => {
          // console.log("data pokemon :", data);
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

  const morePokemon = (event) => {
    // event.preventDefault();

    getMorePokemons(count + 19).then((data) => {
      setPokemons(data);
      setCount((prevCount) => {
        return prevCount + 20;
      });
    });
  };

  // const lessPokemon = () => {
  //   getMorePokemons(count - 21).then((data) => {
  //     setPokemons(data);
  //     setCount((prevCount) => {
  //       return prevCount - 20;
  //     });
  //   });
  // };
  const lessPokemon = () => {
    if (getMorePokemons(count) <= 1) {
      setCount((prevCount) => {
        return <p>Habbis</p>;
      });
    } else {
      getMorePokemons(count - 21).then((data) => {
        setPokemons(data);
        console.log(count);
        setCount((prevCount) => {
          return prevCount - 20;
        });
      });
    }
  };

  return (
    <div className="container">
      <h4> List Pokomen </h4>
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
                  className="card-button"
                  type="sumbit"
                >
                  Detail
                </Link>
              </div>
            );
          })}

          <div className="footer">
            <div className="btn" onClick={lessPokemon}>
              <p className="btn_text">Back</p>
            </div>
            <div className="btn" onClick={morePokemon}>
              <p className="btn_text">Next</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
