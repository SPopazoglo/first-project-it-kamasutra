export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
  if (value) return undefined
  return 'Field is required'
}

export const maxLengthCreator =
  (maxLength: number): FieldValidatorType =>
  (value) => {
    if (value && value.length > maxLength)
      return `max length is ${maxLength} symbols`
    return undefined
  }
