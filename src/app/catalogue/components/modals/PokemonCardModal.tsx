'use client'

export default function PokemonCardModal (props:any) {
  const pokemon = props.pokemon
  const screenHeight = document.body.clientHeight

  return (
    <>
      <div id="bg" className={`fixed inset-0 bg-black/30 z-auto`} onClick={props.closeModal}></div>  
      <div className="bg-white text-black text-3xl font-bold rounded-md h-[60vh] w-[60vw] fixed flex flex-col items-center justify-center z-999">
        {pokemon.name.toUpperCase()}
      </div>
    </>
  )
}