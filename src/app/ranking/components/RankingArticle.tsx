import RankingCard from "@/components/RankingCard"

export default function RankingArticle (props:any) {
  
  const pokemonsList = props.pokemonsList;
  
  if(pokemonsList){
    for (let i = pokemonsList.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      let k = pokemonsList[i];
      pokemonsList[i] = pokemonsList[j];
      pokemonsList[j] = k;
    }
  }
  



  return (
    <article className="bg-white h-max w-[30rem] rounded-2xl overflow-x-hidden overflow-y-hidden border-[3px] border-black">
      {pokemonsList && <RankingCard rank='1'/>}
      <RankingCard rank='2'/>
      <RankingCard rank='3'/>
      <RankingCard rank='4'/>
      <RankingCard rank='5'/>
      <RankingCard rank='6'/>
      <RankingCard rank='7'/>
      <RankingCard rank='8'/>
      <RankingCard rank='9'/>
      <RankingCard rank='10'/>
    </article>
  )
}