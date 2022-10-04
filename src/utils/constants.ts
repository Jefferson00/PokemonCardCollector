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
