export interface ISignInProps {
  onLogin: ({ email, password }: Record<string, string>) => void,
}
