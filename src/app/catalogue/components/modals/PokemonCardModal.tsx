import Image from "next/image"

export default function PokemonCardModal (props:any) {
  const pokemon = props.pokemon

  return (
    <>
      <div id="bg" className="fixed inset-0 bg-black/30 z-auto" onClick={props.closeModal}></div>  
      <div className="bg-white rounded-xl shadow-black shadow-3xl h-max max-h-[90%] w-[60vw] overflow-y-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap items-start justify-center z-999 p-4">

        <Image 
        src={pokemon.sprites.other.dream_world.front_default ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_default }
        className="overflow-hidden p-2 h-full"
        height={500}
        width={500}
        alt="pokemon photo"/>

        <section className="flex-1 flex flex-col items-start justify-start h-full px-4">

          <span className="font-bold text-6xl self-center">{pokemon.name.toUpperCase()}</span>
          <span className="font-bold text-4xl self-center">ID: {pokemon.id}</span>

          {/* Pokemons Moves */}
          <section className="text-3xl font-bold flex flex-wrap justify-start items-center my-2">
            Abilities:
          {pokemon.abilities.map((ability:any)=>{
            return <p className="font-semibold text-lg flex justify-center py-1 px-1.5 rounded-sm bg-emerald-600 text-white m-1 flex-auto" key={ability.ability.url}>
              {ability.ability.name.toUpperCase()}</p>
          })}
          </section>

          {/* Pokemons Stats */}
          <section className="text-3xl font-bold flex flex-wrap justify-start items-center my-2">
            Stats:
            {pokemon.stats.map((stats:any)=>{
              return <p className="font-semibold text-lg flex justify-center py-1 px-1.5 rounded-sm bg-red-600 text-white m-1" key={stats.stat.url}>
              {stats.stat.name.toUpperCase()}: {stats.base_stat}</p>
            })}
          </section>

        </section>
      </div>
    </>
  )
}