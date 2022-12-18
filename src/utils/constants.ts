export const PACKAGE_TIMOUT =
  Number(process.env.NEXT_PUBLIC_PACKAGE_TIMOUT) || 5;
export const POKEMON_QTD = 898;
export const SHINY_PROBABILITY =
  Number(process.env.NEXT_PUBLIC_SHINY_PROBABILITY) || 40;
export const CARD_QTD_PER_PACKAGE = 5;
export const MIN_QTD_TO_TRADE = 5;

type IErrors = {
  [key: string]: unknown;
};

export const errors: IErrors = {
  Signin: "Tente fazer login com uma conta diferente.",
  OAuthSignin: "Tente fazer login com uma conta diferente.",
  OAuthCallback: "Tente fazer login com uma conta diferente.",
  OAuthCreateAccount: "Tente fazer login com uma conta diferente.",
  EmailCreateAccount: "Tente fazer login com uma conta diferente.",
  Callback: "Tente fazer login com uma conta diferente.",
  OAuthAccountNotLinked:
    "Parece que já existe uma conta com seu e-mail, faça login com o método utilizado originalmente.",
  EmailSignin: "Verifique seu endereço de e-mail.",
  CredentialsSignin:
    "Falha no Login. Verifique se os dados fornecidos estão corretos.",
  default: "Não foi possível fazer login.",
};

export const pokemonTypes = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

export const achievementsLocale = {
  bug: "Inseto",
  dark: "Sombrio",
  dragon: "Dragão",
  electric: "Elétrico",
  fairy: "Fada",
  fighting: "Lutador",
  fire: "Fogo",
  flying: "Voador",
  ghost: "Fantasma",
  grass: "Grama",
  ground: "Terra",
  ice: "Gelo",
  normal: "Normal",
  poison: "Venenoso",
  psychic: "Psíquico",
  rock: "Pedra",
  steel: "Aço",
  water: "Água",
  shine: "Brilhante",
  legendary: "Lendários",
  mitic: "Mítico",
  attack: "Atacante",
  defense: "Defensivo",
  hp: "HP",
  speed: "Velocista",
  ultra: "Ultra Beasts",
  kanto: "Kanto",
  johto: "Johto",
  hoenn: "Hoenn",
  sinnoh: "Sinnoh",
  unova: "Unova",
  kalos: "Kalos",
  alola: "Alola",
  galar: "Galar",
  collector: "Colecionador",
};
export type IAchievements = keyof typeof achievementsLocale;

export const achievementParams = [
  {
    achievement: "bug",
    maxValue: 84,
  },
  {
    achievement: "dark",
    maxValue: 55,
  },
  {
    achievement: "dragon",
    maxValue: 56,
  },
  {
    achievement: "electric",
    maxValue: 57,
  },
  {
    achievement: "fairy",
    maxValue: 54,
  },
  {
    achievement: "fighting",
    maxValue: 61,
  },
  {
    achievement: "fire",
    maxValue: 71,
  },
  {
    achievement: "flying",
    maxValue: 102,
  },
  {
    achievement: "ghost",
    maxValue: 51,
  },
  {
    achievement: "grass",
    maxValue: 107,
  },
  {
    achievement: "ground",
    maxValue: 67,
  },
  {
    achievement: "ice",
    maxValue: 41,
  },
  {
    achievement: "normal",
    maxValue: 115,
  },
  {
    achievement: "poison",
    maxValue: 69,
  },
  {
    achievement: "psychic",
    maxValue: 90,
  },
  {
    achievement: "rock",
    maxValue: 65,
  },
  {
    achievement: "steel",
    maxValue: 54,
  },
  {
    achievement: "water",
    maxValue: 141,
  },
  {
    achievement: "shine",
    maxValue: 190,
  },
  {
    achievement: "legendary",
    maxValue: 59,
  },
  {
    achievement: "mitic",
    maxValue: 22,
  },
  {
    achievement: "attack",
    maxValue: 180,
  },
  {
    achievement: "defense",
    maxValue: 115,
  },
  {
    achievement: "hp",
    maxValue: 65,
  },
  {
    achievement: "speed",
    maxValue: 100,
  },
  {
    achievement: "ultra",
    maxValue: 11,
  },
  {
    achievement: "kanto",
    maxValue: 151,
  },
  {
    achievement: "johto",
    maxValue: 100,
  },
  {
    achievement: "hoenn",
    maxValue: 135,
  },
  {
    achievement: "sinnoh",
    maxValue: 107,
  },
  {
    achievement: "unova",
    maxValue: 156,
  },
  {
    achievement: "kalos",
    maxValue: 72,
  },
  {
    achievement: "alola",
    maxValue: 88,
  },
  {
    achievement: "galar",
    maxValue: 89,
  },
  {
    achievement: "collector",
    maxValue: 898,
  },
];

export const legendaries = [
  144, 145, 146, 150, 243, 244, 245, 249, 250, 377, 378, 379, 380, 381, 382,
  383, 384, 480, 481, 482, 483, 484, 485, 486, 487, 488, 638, 639, 640, 641,
  642, 643, 644, 645, 646, 716, 717, 718, 772, 773, 785, 786, 787, 788, 789,
  790, 791, 792, 800, 888, 889, 890, 891, 892, 894, 895, 896, 897, 898,
];

export const mitics = [
  151, 251, 385, 386, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720,
  721, 801, 802, 807, 808, 809, 893,
];

export const ultraBeasts = [
  793, 794, 795, 796, 797, 798, 799, 803, 804, 805, 806,
];

export const statsParam = ["attack", "defense", "speed", "hp"];

export type IRegionsParam = typeof regionsParam[0];

export const regionsParam = [
  {
    name: "kanto",
    start: 0,
    ends: 151,
  },
  {
    name: "johto",
    start: 151,
    ends: 251,
  },
  {
    name: "hoenn",
    start: 251,
    ends: 386,
  },
  {
    name: "sinnoh",
    start: 386,
    ends: 493,
  },
  {
    name: "unova",
    start: 493,
    ends: 649,
  },
  {
    name: "kalos",
    start: 649,
    ends: 721,
  },
  {
    name: "alola",
    start: 721,
    ends: 809,
  },
  {
    name: "galar",
    start: 809,
    ends: 898,
  },
];
