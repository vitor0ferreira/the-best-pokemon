
import RankingItem from "@/src/app/ranking/components/RankingItem";


export default function RankingArticle({ title, pokemonsList, color }: { title: string, pokemonsList: any[], color: string }) {
  let rank = 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <span
        className={`text-3xl italic font-extrabold rounded-t-2xl rounded-tl-2xl ${
          color
        } px-4 py-2 text-white`}
      >
        {title}
      </span>
      <article className="bg-white flex flex-col justify-start items-center h-min max-h-[66vh] w-[24rem] rounded-2xl overflow-x-hidden overflow-y-scroll border-[4px] border-black">
        {pokemonsList.map((pokemon: any) => {
          rank++;
          
          return (
            <RankingItem
              rank={rank}
              pokemon={pokemon.name}
              key={pokemon.id}
              id={pokemon.id}
              votes={pokemon.votes}
            />
          );
        })}
      </article>
    </div>
  );
}