export interface DailyBattleTheme {
  id: number;
  topic: string;
  pokemonIds: number[];
}

export const DAILY_BATTLE_THEMES: DailyBattleTheme[] = [
  { id: 1, topic: 'Qual o Pokémon mais fofo de todos?', pokemonIds: [39, 152, 175] }, // Jigglypuff vs Chikorita vs Togepi
  { id: 2, topic: 'Qual o melhor lendário supremo da Terceira Geração?', pokemonIds: [384, 382, 383] }, // Rayquaza vs Kyogre vs Groudon
  { id: 3, topic: 'Qual o inicial de Fogo definitivo?', pokemonIds: [6, 257, 392] }, // Charizard vs Blaziken vs Infernape
  { id: 4, topic: 'Qual a melhor Eevolution (evolução do Eevee)?', pokemonIds: [134, 197, 700] }, // Vaporeon vs Umbreon vs Sylveon
  { id: 5, topic: 'Qual o Fantasma mais aterrorizante e icônico?', pokemonIds: [94, 609, 778] }, // Gengar vs Chandelure vs Mimikyu
  { id: 6, topic: 'Qual o dragão mais intimidador da franquia?', pokemonIds: [149, 373, 445] }, // Dragonite vs Salamence vs Garchomp
  { id: 7, topic: 'Qual o inicial de Água mais forte em combate?', pokemonIds: [9, 260, 658] }, // Blastoise vs Swampert vs Greninja
  { id: 8, topic: 'Qual o Pokémon elétrico mais amado?', pokemonIds: [25, 405, 487] }, // Pikachu vs Luxray vs Pachirisu (Luxray/Pikachu/Ampharos -> 25, 181, 405)
  { id: 9, topic: 'Qual o Mewtwo ou seu clone psíquico supremo?', pokemonIds: [150, 151, 381] }, // Mewtwo vs Mew vs Latios
  { id: 10, topic: 'Qual o gigante titã de Aço inoxidável?', pokemonIds: [376, 483, 808] }, // Metagross vs Dialga vs Melmetal
  { id: 11, topic: 'Qual o Pokémon de Planta mais elegante?', pokemonIds: [3, 254, 407] }, // Venusaur vs Sceptile vs Roserade
  { id: 12, topic: 'Qual o lendário mais épico da Quarta Geração?', pokemonIds: [483, 484, 487] }, // Dialga vs Palkia vs Giratina
  { id: 13, topic: 'Qual o Pokémon inseto com o design mais incrível?', pokemonIds: [212, 637, 768] }, // Scizor vs Volcarona vs Golisopod
  { id: 14, topic: 'Qual a Ave Lendária mais marcante da Primeira Geração?', pokemonIds: [144, 145, 146] }, // Articuno vs Zapdos vs Moltres
  { id: 15, topic: 'Qual o Lutador mais imponente nas arenas?', pokemonIds: [68, 448, 534] }, // Machamp vs Lucario vs Conkeldurr
  { id: 16, topic: 'Qual o canino Pokémon mais leal e temido?', pokemonIds: [59, 229, 745] }, // Arcanine vs Houndoom vs Lycanroc
  { id: 17, topic: 'Qual o lendário da Sexta Geração tem o melhor conceito?', pokemonIds: [716, 717, 718] }, // Xerneas vs Yveltal vs Zygarde
  { id: 18, topic: 'Qual o mítico pequenino mais especial?', pokemonIds: [251, 385, 490] }, // Celebi vs Jirachi vs Manaphy
  { id: 19, topic: 'Qual o Pokémon Venenoso mais ameaçador?', pokemonIds: [34, 169, 454] }, // Nidoking vs Crobat vs Toxicroak
  { id: 20, topic: 'Qual o guardião dos Mares supremo?', pokemonIds: [131, 249, 321] }, // Lapras vs Lugia vs Wailord
  { id: 21, topic: 'Qual o Felino Pokémon com maior presença?', pokemonIds: [53, 196, 727] }, // Persian vs Espeon vs Incineroar
  { id: 22, topic: 'Qual a Ultra Beast com o design mais insano?', pokemonIds: [793, 794, 804] }, // Nihilego vs Buzzwole vs Naganadel
  { id: 23, topic: 'Qual a melhor mega-evolução da história?', pokemonIds: [6, 282, 448] }, // Mega Charizard X vs Mega Gardevoir vs Mega Lucario
  { id: 24, topic: 'Qual o mestre das ilusões e sombras?', pokemonIds: [197, 571, 807] }, // Umbreon vs Zoroark vs Zeraora
  { id: 25, topic: 'Qual o lendário da Quinta Geração mais impactante?', pokemonIds: [643, 644, 646] }, // Reshiram vs Zekrom vs Kyurem
  { id: 26, topic: 'Qual o melhor inicial de Planta de todas as gerações?', pokemonIds: [254, 450, 724] }, // Sceptile vs Torterra vs Decidueye
  { id: 27, topic: 'Qual o pokémon de pedra mais resistente?', pokemonIds: [248, 409, 526] }, // Tyranitar vs Rampardos vs Gigalith
  { id: 28, topic: 'Qual a criatura Noturna mais fascinante?', pokemonIds: [197, 491, 635] }, // Umbreon vs Darkrai vs Hydreigon
  { id: 29, topic: 'Qual o dinossauro / fóssil mais maneiro?', pokemonIds: [142, 348, 697] }, // Aerodactyl vs Armaldo vs Tyrantrum
  { id: 30, topic: 'Qual o Lendário Guardião de Johto mais majestoso?', pokemonIds: [243, 244, 245] }, // Raikou vs Entei vs Suicune
  { id: 31, topic: 'Qual o místico de psíquico com a história mais emocionante?', pokemonIds: [282, 381, 475] }, // Gardevoir vs Latios vs Gallade
  { id: 32, topic: 'Qual o supremo mestre de Gelo?', pokemonIds: [144, 461, 478] }, // Articuno vs Weavile vs Froslass
  { id: 33, topic: 'Qual o bebê pokémon mais carismático?', pokemonIds: [172, 175, 440] }, // Pichu vs Togepi vs Happiny
  { id: 34, topic: 'Qual a máquina futurista cibernética suprema?', pokemonIds: [137, 479, 773] }, // Porygon2 vs Rotom vs Silvally
  { id: 35, topic: 'Qual a raposa de Fogo mais lendária?', pokemonIds: [38, 136, 655] }, // Ninetales vs Flareon vs Delphox
  { id: 36, topic: 'Qual o Pokémon de Água mais gracioso?', pokemonIds: [134, 350, 419] }, // Vaporeon vs Milotic vs Floatzel
  { id: 37, topic: 'Qual o guerreiro lendário com espada de Galar?', pokemonIds: [888, 889, 892] }, // Zacian vs Zamazenta vs Urshifu
  { id: 38, topic: 'Qual o guardião das florestas mais místico?', pokemonIds: [251, 492, 787] }, // Celebi vs Shaymin vs Tapu Bulu
  { id: 39, topic: 'Qual o roedor elétrico regional mais adorável?', pokemonIds: [172, 417, 777] }, // Pichu vs Pachirisu vs Togedemaru
  { id: 40, topic: 'Qual o predador marinho mais feroz?', pokemonIds: [130, 319, 369] }, // Gyarados vs Sharpedo vs Relicanth
  { id: 41, topic: 'Qual o dragão lendário da Nona Geração com mais presença?', pokemonIds: [1007, 1008, 1017] }, // Koraidon vs Miraidon vs Ogerpon
  { id: 42, topic: 'Qual o Pokémon Voador supremo da Primeira Geração?', pokemonIds: [18, 149, 142] }, // Pidgeot vs Dragonite vs Aerodactyl
  { id: 43, topic: 'Qual a evolução final de inicial mais nostálgica?', pokemonIds: [6, 9, 3] }, // Charizard vs Blastoise vs Venusaur
  { id: 44, topic: 'Qual o lendário Divino mais onipotente?', pokemonIds: [493, 483, 484] }, // Arceus vs Dialga vs Palkia
  { id: 45, topic: 'Qual o mestre marcial de luta comPunhos de ferro?', pokemonIds: [107, 257, 448] }, // Hitmonchan vs Blaziken vs Lucario
  { id: 46, topic: 'Qual o Fantasma travesso mais divertido?', pokemonIds: [93, 355, 778] }, // Haunter vs Duskull vs Mimikyu
  { id: 47, topic: 'Qual o pokémon dragão psíquico da Terceira Geração?', pokemonIds: [380, 381, 384] }, // Latias vs Latios vs Rayquaza
  { id: 48, topic: 'Qual o guerreiro de Aço lendário de Johto / Kanto?', pokemonIds: [212, 227, 376] }, // Scizor vs Skarmory vs Metagross
  { id: 49, topic: 'Qual a fada mística mais poderosa?', pokemonIds: [36, 176, 716] }, // Clefable vs Togekiss vs Xerneas
  { id: 50, topic: 'Qual o colossal guardião das Montanhas?', pokemonIds: [143, 248, 486] }, // Snorlax vs Tyranitar vs Regigigas
];
