
export default function PokemonCardModal (props:any) {
  const pokemon = props.pokemonData?.name

  return (
    <>
      <div id="bg" className="absolute top-0 left-0 min-w-full w-full min-h-[full] h-full bg-black/30 z-auto"></div>  
      <div className="bg-white rounded-md h-[60vh] w-[60vw] absolute bottom-0 top-0 z-999">
        {props && pokemon}
      </div>
    </>
  )
}