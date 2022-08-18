export interface ITextFieldProps {
  label: string,
  pattern: string,
  name: string,
  placeholder: string,
  onChange: () => void,
  minLength: number,
  maxLength: number,
  required: boolean,
  errors: any,
  type: string,
  id: string,
  autoComplete: string,
  value: string,
  className: string,
}
