import Image from "next/image";
import Link from "next/link";

interface CardProps {
  name: string
}

export default function PokemonCard({ name }: CardProps) {
  const POKEMON_IMAGE_URL = `https://img.pokemondb.net/artwork/large/${name}.jpg`;

  return (
    <Link
      href={`/catalogue/${name}`}
      className="relative min-h-[100px] min-w-[100px] aspect-square sm:w-28 md:w-48
      flex items-center justify-center cursor-pointer p-2
      rounded-md shadow-md bg-gradient-to-b from-rose-100 to-teal-100 hover:scale-105"
    >
      <Image
        src={POKEMON_IMAGE_URL}
        fill
        alt="pokemon photo"
        className="mix-blend-multiply p-2 object-contain"
      />
    </Link>
  );
}
