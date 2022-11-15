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

export const regions = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
];

export const achievementsParams = [
  {
    bug: {
      40: "bronze",
      64: "silver",
      gold: 96,
    },
  },
  {
    dark: {
      bronze: 32,
      silver: 60,
      gold: 80,
    },
  },
  {
    dragon: {
      bronze: 30,
      silver: 65,
      gold: 83,
    },
  },
  {
    electric: {
      bronze: 38,
      silver: 75,
      gold: 94,
    },
  },
  {
    fairy: {
      bronze: 30,
      silver: 58,
      gold: 73,
    },
  },
  {
    fighting: {
      bronze: 32,
      silver: 60,
      gold: 81,
    },
  },
  {
    fire: {
      bronze: 36,
      silver: 65,
      gold: 91,
    },
  },
  {
    flying: {
      bronze: 55,
      silver: 110,
      gold: 139,
    },
  },
  {
    ghost: {
      bronze: 30,
      silver: 61,
      gold: 77,
    },
  },
  {
    grass: {
      bronze: 51,
      silver: 103,
      gold: 129,
    },
  },
  {
    ground: {
      bronze: 33,
      silver: 65,
      gold: 83,
    },
  },
  {
    ice: {
      bronze: 23,
      silver: 45,
      gold: 59,
    },
  },
  {
    normal: {
      bronze: 53,
      silver: 106,
      gold: 133,
    },
  },
  {
    poison: {
      bronze: 34,
      silver: 65,
      gold: 87,
    },
  },
  {
    psychic: {
      bronze: 50,
      silver: 99,
      gold: 124,
    },
  },
  {
    rock: {
      bronze: 36,
      silver: 65,
      gold: 92,
    },
  },
  {
    steel: {
      bronze: 32,
      silver: 64,
      gold: 80,
    },
  },
  {
    water: {
      bronze: 65,
      silver: 134,
      gold: 168,
    },
  },
  {
    shine: {
      bronze: 40,
      silver: 90,
      gold: 190,
    },
  },
  {
    legendary: {
      bronze: 23,
      silver: 45,
      gold: 59,
    },
  },
  {
    mitic: {
      bronze: 8,
      silver: 15,
      gold: 22,
    },
  },
  {
    atack: {
      bronze: 72,
      silver: 144,
      gold: 180,
    },
  },
  {
    defense: {
      bronze: 46,
      silver: 92,
      gold: 115,
    },
  },
  {
    hp: {
      bronze: 26,
      silver: 52,
      gold: 65,
    },
  },
  {
    speed: {
      bronze: 40,
      silver: 80,
      gold: 100,
    },
  },
  {
    ultra: {
      bronze: 5,
      silver: 8,
      gold: 11,
    },
  },
  {
    kanto: {
      bronze: 60,
      silver: 120,
      gold: 151,
    },
  },
  {
    johto: {
      bronze: 40,
      silver: 80,
      gold: 100,
    },
  },
  {
    hoenn: {
      bronze: 54,
      silver: 108,
      gold: 135,
    },
  },
  {
    sinnoh: {
      bronze: 45,
      silver: 85,
      gold: 107,
    },
  },
  {
    unova: {
      bronze: 62,
      silver: 124,
      gold: 156,
    },
  },
  {
    kalos: {
      bronze: 28,
      silver: 57,
      gold: 72,
    },
  },
  {
    alola: {
      bronze: 35,
      silver: 65,
      gold: 88,
    },
  },
  {
    galar: {
      bronze: 36,
      silver: 65,
      gold: 91,
    },
  },
  {
    collector: {
      bronze: 360,
      silver: 720,
      gold: 898,
    },
  },
];

export const achievementParams = [
  {
    achievement: "bug",
    maxValue: 96,
  },
  {
    achievement: "dark",
    maxValue: 80,
  },
  {
    achievement: "dragon",
    maxValue: 83,
  },
  {
    achievement: "electric",
    maxValue: 94,
  },
  {
    achievement: "fairy",
    maxValue: 73,
  },
  {
    achievement: "fighting",
    maxValue: 81,
  },
  {
    achievement: "fire",
    maxValue: 91,
  },
  {
    achievement: "flying",
    maxValue: 139,
  },
  {
    achievement: "ghost",
    maxValue: 77,
  },
  {
    achievement: "grass",
    maxValue: 129,
  },
  {
    achievement: "ground",
    maxValue: 83,
  },
  {
    achievement: "ice",
    maxValue: 59,
  },
  {
    achievement: "ice",
    maxValue: 59,
  },
  {
    achievement: "normal",
    maxValue: 133,
  },
  {
    achievement: "poison",
    maxValue: 87,
  },
  {
    achievement: "psychic",
    maxValue: 124,
  },
  {
    achievement: "rock",
    maxValue: 92,
  },
  {
    achievement: "steel",
    maxValue: 80,
  },
  {
    achievement: "water",
    maxValue: 168,
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
    achievement: "mitic",
    maxValue: 22,
  },
  {
    achievement: "atack",
    maxValue: 180,
  },
  {
    achievement: "atack",
    maxValue: 180,
  },
  {
    achievement: "defense",
    maxValue: 115,
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
    achievement: "hp",
    maxValue: 65,
  },
  {
    achievement: "speed",
    maxValue: 100,
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
    maxValue: 91,
  },
  {
    achievement: "collector",
    maxValue: 898,
  },
];
