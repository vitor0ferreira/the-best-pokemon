// src/components/modals/VoteCompletedModal.tsx
import Portal from '../Portal';

export default function VoteCompletedModal(props: any) {
  return (
    <Portal>
      <div className="bg-black/50 fixed inset-0 z-50" onClick={props.onclick}></div>
      <div className="fixed inset-0 z-50 m-auto h-max w-max rounded-xl bg-white p-6 flex justify-start items-center gap-4">
        <span className="text-4xl font-bold flex flex-col items-center gap-2">
          YOU VOTED IN:
          <span className="text-6xl text-green-600">
            {props.pokemonData.toUpperCase()}
          </span>
        </span>
      </div>
    </Portal>
  );
}