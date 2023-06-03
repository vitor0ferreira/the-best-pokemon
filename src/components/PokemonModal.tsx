import { useState } from "react"

export default function PokemonModal (props:any) {

  return (
      <>
        <div className="bg-black/50 absolute top-0 left-0 w-full min-w-full h-full min-h-full z-auto" onClick={props.onclick}></div>
        <div className="bg-white absolute top-0 left-0 bottom-0 right-0 m-auto h-max w-max rounded-xl z-999 p-6 flex justify-start items-center gap-4" onClick={(e)=>{e}}>
          <span className="text-4xl font-bold">
            Confirm vote to: {props.pokemonData.name.toUpperCase()}
          </span>
          <button className="font-bold text-3xl text-white bg-green-700 p-2 rounded-md hover:scale-105" onClick={props.onclick}>YES</button>
          <button className="font-bold text-3xl text-white bg-red-600 p-2 rounded-md hover:scale-105" onClick={props.onclick}>NO</button>
        </div>
      </>
  )
}