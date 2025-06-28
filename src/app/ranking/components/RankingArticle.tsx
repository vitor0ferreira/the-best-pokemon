// src/app/ranking/components/RankingArticle.tsx
import RankingCard from "@/app/ranking/components/RankingItem";

// Recebendo as props com tipos definidos
export default function RankingArticle({ title, pokemonsList, color }: { title: string, pokemonsList: any[], color: string }) {
  let rank = 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <span
        className={`text-3xl italic font-extrabold rounded-t-2xl rounded-tl-2xl ${
          color // Usando a cor passada como prop
        } p-5 text-white`}
      >
        {title} {/* Usando o título passado como prop */}
      </span>
      <article className="bg-white flex flex-col justify-between h-fit max-h-[66vh] w-[30rem] rounded-2xl overflow-x-hidden overflow-y-scroll border-[4px] border-black">
        {pokemonsList.map((pokemon: any) => {
          rank++;
          // Agora os dados vêm do nosso banco
          return (
            <RankingCard
              rank={rank}
              pokemon={pokemon.name}
              key={pokemon.id}
              id={pokemon.id}
            />
          );
        })}
      </article>
    </div>
  );
}