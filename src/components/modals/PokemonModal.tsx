
import Portal from '../Portal';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface pokemonModal {
  isVoting: Boolean,
  pokemonName: string,
  onConfirmVote: () => void,
  onDeclineVote: () => void,
}

export default function PokemonModal({pokemonName, isVoting, onConfirmVote, onDeclineVote}:pokemonModal) {
  return (
    <Portal>
      <div className="bg-black/50 fixed inset-0 z-50" onClick={isVoting ? undefined : onDeclineVote}></div>
      {
        !isVoting ? 
        (<div className="fixed inset-0 z-50 m-auto h-max w-max rounded-xl bg-white p-6 flex justify-start items-center gap-4">
          <span className="text-4xl font-bold">
            Confirm vote to: {pokemonName.toUpperCase()}
          </span>
          <button className="font-bold text-3xl text-white bg-green-700 p-2 rounded-md hover:scale-105" onClick={onConfirmVote}>YES</button>
          <button className="font-bold text-3xl text-white bg-red-600 p-2 rounded-md hover:scale-105" onClick={onDeclineVote}>NO</button>
        </div>) 
        : 
        (<div className="fixed inset-0 z-50 m-auto h-max w-max bg-white rounded-xl p-6 text-2xl font-semibold flex items-center justify-center gap-6">
          Processing vote...
          <AiOutlineLoading3Quarters className='animate-spin' color='blue'/>
        </div>)
      }
      
    </Portal>
  );
}