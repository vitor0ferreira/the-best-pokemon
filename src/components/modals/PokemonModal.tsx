// src/components/modals/PokemonModal.tsx
import Portal from '../Portal';

export default function PokemonModal(props: any) {
  return (
    <Portal>
      <div className="bg-black/50 fixed inset-0 z-50" onClick={props.onclick}></div>
      <div className="fixed inset-0 z-50 m-auto h-max w-max rounded-xl bg-white p-6 flex justify-start items-center gap-4">
        <span className="text-4xl font-bold">
          Confirm vote to: {props.pokemonData.toUpperCase()}
        </span>
        <button className="font-bold text-3xl text-white bg-green-700 p-2 rounded-md hover:scale-105" onClick={props.onyesclick}>YES</button>
        <button className="font-bold text-3xl text-white bg-red-600 p-2 rounded-md hover:scale-105" onClick={props.onclick}>NO</button>
      </div>
    </Portal>
  );
}