import RankingCard from "@/app/ranking/components/RankingCard"

export default function RankingArticle (props:any) {
  
  const pokemonsList = props.pokemonsList;
  let rank = 0;

  if(pokemonsList){
    for (let i = pokemonsList.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      let k = pokemonsList[i];
      pokemonsList[i] = pokemonsList[j];
      pokemonsList[j] = k;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-3xl italic font-extrabold rounded-t-2xl rounded-tl-2xl bg-black p-5 text-white">{props.name} Pokemons</span>
      <article className="bg-white flex flex-col justify-between h-fit max-h-[66vh] w-[30rem] rounded-2xl overflow-x-hidden overflow-y-scroll border-[4px] border-black">
        {pokemonsList.map((pokemon:any)=>{
          rank++
          return <RankingCard rank={rank} pokemon={pokemon.pokemon.name} key={pokemon.pokemon.name} />
        })}
      </article>
    </div>
  )
}