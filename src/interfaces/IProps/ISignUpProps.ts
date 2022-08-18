export interface ISignUpProps {
  onRegister: ({ email, password }: Record<string, string>) => void,
}
