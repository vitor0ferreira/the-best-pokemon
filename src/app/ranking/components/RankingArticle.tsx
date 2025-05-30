import RankingCard from "@/app/ranking/components/RankingItem";

export default function RankingArticle(props: any) {
  const colorPicker: any = {
    fire: "bg-red-800",
    water: "bg-blue-700",
    flying: "bg-sky-500",
  };

  const pokemonTypes: any = {
    0: "fire",
    1: "water",
    2: "flying",
  };

  const pokemonsList = props.pokemonsList.slice(0, 20);
  let rank = 0;

  if (pokemonsList) {
    for (let i = pokemonsList.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let k = pokemonsList[i];
      pokemonsList[i] = pokemonsList[j];
      pokemonsList[j] = k;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <span
        className={`text-3xl italic font-extrabold rounded-t-2xl rounded-tl-2xl ${
          colorPicker[pokemonTypes[props.index]]
        } p-5 text-white`}
      >
        {pokemonTypes[props.index][0].toLocaleUpperCase() +
          pokemonTypes[props.index].slice(1)}{" "}
        Pokemons
      </span>
      <article className="bg-white flex flex-col justify-between h-fit max-h-[66vh] w-[30rem] rounded-2xl overflow-x-hidden overflow-y-scroll border-[4px] border-black">
        {pokemonsList.slice(0, 10).map((pokemon: any) => {
          rank++;
          const parts = pokemon.pokemon.url.split("/");
          const id = parts[parts.length - 2];
          return (
            <RankingCard
              rank={rank}
              pokemon={pokemon.pokemon.name}
              key={pokemon.pokemon.url}
              id={id}
            />
          );
        })}
      </article>
    </div>
  );
}
