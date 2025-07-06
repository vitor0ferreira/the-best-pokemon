'use client'

import { ALL_POKEMON_LIST } from "@/src/constants/allPokemonList";
import { useState, useEffect, useRef } from "react";
import PokemonCard from "./components/PokemonCard";

interface Pokemon {
  name: string;
  url: string;
}

export default function Catalogue () {

  const [searchValue, setSearchValue] = useState('');
  const initialOffset = 27;
  const [offset, setOffset] = useState<number>(initialOffset);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observerTarget = useRef(null);


  const filteredPokemonsList = ALL_POKEMON_LIST.filter((pokemon: Pokemon) => {
    const pokemonName = pokemon.name.toLowerCase();
    const searchedPokemon = searchValue.toLowerCase();
    return pokemonName.includes(searchedPokemon);
  });

  const pokemonList = filteredPokemonsList.slice(0, offset);

  useEffect(() => {
    setOffset(initialOffset);
  }, [searchValue]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          if (offset < filteredPokemonsList.length) {
            setIsLoading(true);
            setOffset((prevOffset) => prevOffset + 20);
            setTimeout(() => setIsLoading(false), 300);
          } else if (offset >= filteredPokemonsList.length && filteredPokemonsList.length > 0) {
            alert('All pokemons for this search have been displayed');
          }
        }
      },
      { threshold: 1.0 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isLoading, offset, filteredPokemonsList.length]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 gap-10">
      <input
        type="text"
        placeholder="Type a pokemon name..."
        className="p-2 text-lg mt-4 rounded-sm focus:outline-none focus:placeholder:invisible"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <section className="w-full flex flex-wrap items-center justify-center gap-2 z-10">
        {pokemonList.map((pokemon: Pokemon) => {
          const pokemonURLparts = pokemon.url.split('/')
          const pokemonID = Number(pokemonURLparts[pokemonURLparts.length - 2])
          return (<PokemonCard name={pokemon.name} id={pokemonID} key={pokemon.url} />)
        })}
      </section>


      {!isLoading && offset < filteredPokemonsList.length && (
        <div ref={observerTarget} style={{ height: '50px', width: '100%' }}>
          
        </div>
      )}

      {offset >= filteredPokemonsList.length && filteredPokemonsList.length > 0 && pokemonList.length > 0 && (
         <p className="text-white text-center my-4">Todos os Pokémon para esta busca foram exibidos.</p>
      )}
    </main>
  )
}