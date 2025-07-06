import Image from "next/image";

interface PokemonProps {
  pokemon: string,
  id: number,
  rank: number,
  votes: number
}

export default function GeneralRanking({ pokemonsList }: { pokemonsList: any[] }){


    return (
        <div className="w-full mx-8 p-2 min-h-60 h-max rounded-md bg-white">
            <h1 className="text-center w-full block mt-4 font-bold text-4xl">THE TOP POKEMONS OF ALL</h1>
            <section className="grid auto-rows-max grid-cols-2 md:grid-cols-4 gap-2 p-2 text-2xl font-semibold text-blue-900 justify-center">
                {pokemonsList.map((pokemon)=>{
                    const imageUrl = `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`

                    return (
                        <div key={pokemon.id} className="relative flex h-full w-full p-2 border-2">
                            <Image 
                                src={imageUrl}
                                fill
                                className="object-contain overflow-hidden p-1"
                                alt="pokemon photo"
                                sizes="80px"
                            />
                            <span className="">{pokemon.name}</span>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}