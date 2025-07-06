
import RankingItem from "@/src/app/ranking/components/RankingItem";

interface ArticleProps {
  title: string,
  pokemonsList: any[],
  color: string,
  onVoteSuccess: () => void,
}

export default function RankingArticle({ title, pokemonsList, color, onVoteSuccess }: ArticleProps) {

  let rank = 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <span
        className={`text-xl sm:text-2xl italic font-extrabold rounded-t-2xl rounded-tl-2xl ${
          color
        } px-4 py-2 text-white`}
      >
        {title}
      </span>
      <article className="bg-white flex flex-col justify-start items-center h-max w-full max-w-sm rounded-2xl overflow-x-hidden border-[4px] border-black">
        {pokemonsList.map((pokemon: any) => {
          rank++;
          
          return (
            <RankingItem
              onVoteSuccess={onVoteSuccess}
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