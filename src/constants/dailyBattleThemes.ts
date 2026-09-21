export interface DailyBattleTheme {
  id: number;
  topic: {
    pt: string;
    en: string;
  };
  pokemonIds: number[];
}

export const DAILY_BATTLE_THEMES: DailyBattleTheme[] = [
  {
    id: 1,
    topic: {
      pt: 'Qual o Pokémon mais fofo de todos?',
      en: 'Which is the cutest Pokémon of all?',
    },
    pokemonIds: [39, 152, 175], // Jigglypuff vs Chikorita vs Togepi
  },
  {
    id: 2,
    topic: {
      pt: 'Qual o melhor lendário supremo da Terceira Geração?',
      en: 'Who is the supreme Legendary of Gen 3?',
    },
    pokemonIds: [384, 382, 383], // Rayquaza vs Kyogre vs Groudon
  },
  {
    id: 3,
    topic: {
      pt: 'Qual o inicial de Fogo definitivo?',
      en: 'Who is the definitive Fire starter?',
    },
    pokemonIds: [6, 257, 392], // Charizard vs Blaziken vs Infernape
  },
  {
    id: 4,
    topic: {
      pt: 'Qual a melhor Eeveelution (evolução do Eevee)?',
      en: 'Which is the best Eeveelution?',
    },
    pokemonIds: [134, 197, 700], // Vaporeon vs Umbreon vs Sylveon
  },
  {
    id: 5,
    topic: {
      pt: 'Qual o Fantasma mais aterrorizante e icônico?',
      en: 'Which is the most terrifying and iconic Ghost?',
    },
    pokemonIds: [94, 609, 778], // Gengar vs Chandelure vs Mimikyu
  },
  {
    id: 6,
    topic: {
      pt: 'Qual o dragão mais intimidador da franquia?',
      en: 'Which is the most intimidating Dragon in the franchise?',
    },
    pokemonIds: [149, 373, 445], // Dragonite vs Salamence vs Garchomp
  },
  {
    id: 7,
    topic: {
      pt: 'Qual o inicial de Água mais forte em combate?',
      en: 'Which is the strongest Water starter in battle?',
    },
    pokemonIds: [9, 260, 658], // Blastoise vs Swampert vs Greninja
  },
  {
    id: 8,
    topic: {
      pt: 'Qual o Pokémon elétrico mais amado?',
      en: 'Which is the most beloved Electric Pokémon?',
    },
    pokemonIds: [25, 405, 487], // Pikachu vs Luxray vs Giratina/Pachirisu
  },
  {
    id: 9,
    topic: {
      pt: 'Qual o Mewtwo ou clone psíquico supremo?',
      en: 'Who is the supreme Psychic titan?',
    },
    pokemonIds: [150, 151, 381], // Mewtwo vs Mew vs Latios
  },
  {
    id: 10,
    topic: {
      pt: 'Qual o gigante titã de Aço inoxidável?',
      en: 'Who is the ultimate giant Steel titan?',
    },
    pokemonIds: [376, 483, 808], // Metagross vs Dialga vs Melmetal
  },
  {
    id: 11,
    topic: {
      pt: 'Qual o Pokémon de Planta mais elegante?',
      en: 'Which is the most elegant Grass Pokémon?',
    },
    pokemonIds: [3, 254, 407], // Venusaur vs Sceptile vs Roserade
  },
  {
    id: 12,
    topic: {
      pt: 'Qual o lendário mais épico da Quarta Geração?',
      en: 'Who is the most epic Legendary of Gen 4?',
    },
    pokemonIds: [483, 484, 487], // Dialga vs Palkia vs Giratina
  },
  {
    id: 13,
    topic: {
      pt: 'Qual o Pokémon inseto com o design mais incrível?',
      en: 'Which Bug Pokémon has the most incredible design?',
    },
    pokemonIds: [212, 637, 768], // Scizor vs Volcarona vs Golisopod
  },
  {
    id: 14,
    topic: {
      pt: 'Qual a Ave Lendária mais marcante da Primeira Geração?',
      en: 'Which Legendary Bird from Gen 1 is the most iconic?',
    },
    pokemonIds: [144, 145, 146], // Articuno vs Zapdos vs Moltres
  },
  {
    id: 15,
    topic: {
      pt: 'Qual o Lutador mais imponente nas arenas?',
      en: 'Who is the most imposing Fighting Pokémon in the arena?',
    },
    pokemonIds: [68, 448, 534], // Machamp vs Lucario vs Conkeldurr
  },
  {
    id: 16,
    topic: {
      pt: 'Qual o canino Pokémon mais leal e temido?',
      en: 'Which canine Pokémon is the most loyal and fearsome?',
    },
    pokemonIds: [59, 229, 745], // Arcanine vs Houndoom vs Lycanroc
  },
  {
    id: 17,
    topic: {
      pt: 'Qual o lendário da Sexta Geração tem o melhor conceito?',
      en: 'Which Gen 6 Legendary has the best concept?',
    },
    pokemonIds: [716, 717, 718], // Xerneas vs Yveltal vs Zygarde
  },
  {
    id: 18,
    topic: {
      pt: 'Qual o mítico pequenino mais especial?',
      en: 'Which small Mythical Pokémon is the most special?',
    },
    pokemonIds: [251, 385, 490], // Celebi vs Jirachi vs Manaphy
  },
  {
    id: 19,
    topic: {
      pt: 'Qual o Pokémon Venenoso mais ameaçador?',
      en: 'Which is the most menacing Poison Pokémon?',
    },
    pokemonIds: [34, 169, 454], // Nidoking vs Crobat vs Toxicroak
  },
  {
    id: 20,
    topic: {
      pt: 'Qual o guardião dos Mares supremo?',
      en: 'Who is the supreme Guardian of the Seas?',
    },
    pokemonIds: [131, 249, 321], // Lapras vs Lugia vs Wailord
  },
  {
    id: 21,
    topic: {
      pt: 'Qual o Felino Pokémon com maior presença?',
      en: 'Which feline Pokémon has the greatest presence?',
    },
    pokemonIds: [53, 196, 727], // Persian vs Espeon vs Incineroar
  },
  {
    id: 22,
    topic: {
      pt: 'Qual a Ultra Beast com o design mais insano?',
      en: 'Which Ultra Beast has the craziest design?',
    },
    pokemonIds: [793, 794, 804], // Nihilego vs Buzzwole vs Naganadel
  },
  {
    id: 23,
    topic: {
      pt: 'Qual a melhor mega-evolução da história?',
      en: 'Which is the best Mega Evolution in history?',
    },
    pokemonIds: [6, 282, 448], // Mega Charizard X vs Mega Gardevoir vs Mega Lucario
  },
  {
    id: 24,
    topic: {
      pt: 'Qual o mestre das ilusões e sombras?',
      en: 'Who is the master of illusions and shadows?',
    },
    pokemonIds: [197, 571, 807], // Umbreon vs Zoroark vs Zeraora
  },
  {
    id: 25,
    topic: {
      pt: 'Qual o lendário da Quinta Geração mais impactante?',
      en: 'Who is the most impactful Gen 5 Legendary?',
    },
    pokemonIds: [643, 644, 646], // Reshiram vs Zekrom vs Kyurem
  },
  {
    id: 26,
    topic: {
      pt: 'Qual o melhor inicial de Planta de todas as gerações?',
      en: 'Who is the best Grass starter across all generations?',
    },
    pokemonIds: [254, 450, 724], // Sceptile vs Torterra vs Decidueye
  },
  {
    id: 27,
    topic: {
      pt: 'Qual o Pokémon de pedra mais resistente?',
      en: 'Which Rock Pokémon is the most resilient?',
    },
    pokemonIds: [248, 409, 526], // Tyranitar vs Rampardos vs Gigalith
  },
  {
    id: 28,
    topic: {
      pt: 'Qual a criatura Noturna mais fascinante?',
      en: 'Which creature of the night is the most fascinating?',
    },
    pokemonIds: [197, 491, 635], // Umbreon vs Darkrai vs Hydreigon
  },
  {
    id: 29,
    topic: {
      pt: 'Qual o dinossauro fóssil mais maneiro?',
      en: 'Which fossil dinosaur is the coolest?',
    },
    pokemonIds: [142, 348, 697], // Aerodactyl vs Armaldo vs Tyrantrum
  },
  {
    id: 30,
    topic: {
      pt: 'Qual o Lendário Guardião de Johto mais majestoso?',
      en: 'Who is the most majestic Legendary Beast of Johto?',
    },
    pokemonIds: [243, 244, 245], // Raikou vs Entei vs Suicune
  },
  {
    id: 31,
    topic: {
      pt: 'Qual o Psíquico com a história mais emocionante?',
      en: 'Which Psychic Pokémon has the most touching story?',
    },
    pokemonIds: [282, 381, 475], // Gardevoir vs Latios vs Gallade
  },
  {
    id: 32,
    topic: {
      pt: 'Qual o supremo mestre de Gelo?',
      en: 'Who is the supreme Master of Ice?',
    },
    pokemonIds: [144, 461, 478], // Articuno vs Weavile vs Froslass
  },
  {
    id: 33,
    topic: {
      pt: 'Qual o bebê Pokémon mais carismático?',
      en: 'Which baby Pokémon is the most charismatic?',
    },
    pokemonIds: [172, 175, 440], // Pichu vs Togepi vs Happiny
  },
  {
    id: 34,
    topic: {
      pt: 'Qual a máquina futurista cibernética suprema?',
      en: 'Which futuristic cyber-machine Pokémon reigns supreme?',
    },
    pokemonIds: [137, 479, 773], // Porygon2 vs Rotom vs Silvally
  },
  {
    id: 35,
    topic: {
      pt: 'Qual a raposa de Fogo mais lendária?',
      en: 'Which Fire fox is the most legendary?',
    },
    pokemonIds: [38, 136, 655], // Ninetales vs Flareon vs Delphox
  },
  {
    id: 36,
    topic: {
      pt: 'Qual o Pokémon de Água mais gracioso?',
      en: 'Which Water Pokémon is the most graceful?',
    },
    pokemonIds: [134, 350, 419], // Vaporeon vs Milotic vs Floatzel
  },
  {
    id: 37,
    topic: {
      pt: 'Qual o guerreiro lendário com espada de Galar?',
      en: 'Who is the ultimate warrior of Galar?',
    },
    pokemonIds: [888, 889, 892], // Zacian vs Zamazenta vs Urshifu
  },
  {
    id: 38,
    topic: {
      pt: 'Qual o guardião das florestas mais místico?',
      en: 'Who is the most mystical Guardian of the Forest?',
    },
    pokemonIds: [251, 492, 787], // Celebi vs Shaymin vs Tapu Bulu
  },
  {
    id: 39,
    topic: {
      pt: 'Qual o roedor elétrico regional mais adorável?',
      en: 'Which regional electric rodent is the most adorable?',
    },
    pokemonIds: [172, 417, 777], // Pichu vs Pachirisu vs Togedemaru
  },
  {
    id: 40,
    topic: {
      pt: 'Qual o predador marinho mais feroz?',
      en: 'Which marine predator is the most ferocious?',
    },
    pokemonIds: [130, 319, 369], // Gyarados vs Sharpedo vs Relicanth
  },
  {
    id: 41,
    topic: {
      pt: 'Qual o dragão lendário da Nona Geração com mais presença?',
      en: 'Which Gen 9 Legendary Dragon has the greatest presence?',
    },
    pokemonIds: [1007, 1008, 1017], // Koraidon vs Miraidon vs Ogerpon
  },
  {
    id: 42,
    topic: {
      pt: 'Qual o Pokémon Voador supremo da Primeira Geração?',
      en: 'Who is the supreme Flying Pokémon of Gen 1?',
    },
    pokemonIds: [18, 149, 142], // Pidgeot vs Dragonite vs Aerodactyl
  },
  {
    id: 43,
    topic: {
      pt: 'Qual a evolução final de inicial mais nostálgica?',
      en: 'Which final starter evolution is the most nostalgic?',
    },
    pokemonIds: [6, 9, 3], // Charizard vs Blastoise vs Venusaur
  },
  {
    id: 44,
    topic: {
      pt: 'Qual o lendário Divino mais onipotente?',
      en: 'Which Divine Legendary is the most omnipotent?',
    },
    pokemonIds: [493, 483, 484], // Arceus vs Dialga vs Palkia
  },
  {
    id: 45,
    topic: {
      pt: 'Qual o mestre marcial com punhos de ferro?',
      en: 'Who is the ultimate martial arts champion?',
    },
    pokemonIds: [107, 257, 448], // Hitmonchan vs Blaziken vs Lucario
  },
  {
    id: 46,
    topic: {
      pt: 'Qual o Fantasma travesso mais divertido?',
      en: 'Which mischievous Ghost Pokémon is the most fun?',
    },
    pokemonIds: [93, 355, 778], // Haunter vs Duskull vs Mimikyu
  },
  {
    id: 47,
    topic: {
      pt: 'Qual o dragão psíquico da Terceira Geração?',
      en: 'Who is the best dragon of Hoenn?',
    },
    pokemonIds: [380, 381, 384], // Latias vs Latios vs Rayquaza
  },
  {
    id: 48,
    topic: {
      pt: 'Qual o guerreiro de Aço lendário mais marcante?',
      en: 'Which Steel warrior is the most legendary?',
    },
    pokemonIds: [212, 227, 376], // Scizor vs Skarmory vs Metagross
  },
  {
    id: 49,
    topic: {
      pt: 'Qual a Fada mística mais poderosa?',
      en: 'Which mystical Fairy Pokémon is the most powerful?',
    },
    pokemonIds: [36, 176, 716], // Clefable vs Togekiss vs Xerneas
  },
  {
    id: 50,
    topic: {
      pt: 'Qual o colossal guardião das Montanhas?',
      en: 'Who is the colossal Guardian of the Mountains?',
    },
    pokemonIds: [143, 248, 486], // Snorlax vs Tyranitar vs Regigigas
  },
];
