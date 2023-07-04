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
    <div>
      <span>{pokemonsList.name}</span>
      <article className="bg-white h-max max-h-[66vh] w-[30rem] rounded-2xl overflow-x-hidden overflow-y-scroll border-[4px] border-black">
        {pokemonsList.map((pokemon:any, index:any)=>{
          rank++
          return <RankingCard rank={rank} pokemon={pokemon.pokemon.name} key={index} />
        })}
      </article>
    </div>
  )
}