
export default function VoteCompletedModal (props:any) {

  return (
      <>
        <div className="bg-black/50 absolute top-0 left-0 w-full min-w-full h-full min-h-full z-auto" onClick={props.onclick}></div>
        <div className="bg-white absolute top-0 left-0 bottom-0 right-0 m-auto h-max w-max rounded-xl z-999 p-6 flex justify-start items-center gap-4" onClick={(e)=>{e}}>
          <span className="text-4xl font-bold flex flex-col items-center gap-2">
            YOU VOTED IN:
            <span className="text-6xl text-green-600">
              {props.pokemonData.name.toUpperCase()}
            </span>
          </span>
        </div>
      </>
  )
}