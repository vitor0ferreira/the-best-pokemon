import Image from "next/image";

interface PokemonProps {
  pokemon: string,
  id: number,
  rank: number,
  votes: number
}

export default function GeneralRanking({ pokemonsList }: { pokemonsList: any[] }){

    let rankingPosition = 0;

    return (
        <div className="w-full mx-8 p-2 min-h-60 h-max rounded-md bg-white">
            <h1 className="text-center w-full block mt-4 font-bold text-xl sm:text-2xl md:text-4xl">THE TOP POKEMONS OF ALL TIMES</h1>
            <section className="grid auto-rows-max grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2 pb-4 text-2xl font-semibold text-blue-900 justify-center">
                {pokemonsList.map((pokemon)=>{
                    const imageUrl = `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`
                    rankingPosition++;

                    return (
                        <div key={pokemon.id} className="relative min-h-max h-16 sm:h-24 md:h-40 w-full p-2">
                            <span className="absolute top-0 lef-0 z-[5] bg-red-500 text-white text-sm sm:text-base md:text-lg px-1 rounded-md">{rankingPosition}</span>
                            <Image 
                                src={imageUrl}
                                fill
                                className="object-contain overflow-hidden p-1"
                                alt="pokemon photo"
                                unoptimized
                            />
                        </div>
                    )
                })}
            </section>
        </div>
    )
}