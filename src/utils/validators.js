export const requiredField = value => {
  if (value) return undefined;
  return "Обязательное поле"
}

export const maxLengthCreator = (maxLength) => (value) => {
  if (value.length > maxLength) {
    return `Максимальная длина строки ${maxLength} символов`;
  }
  return undefined
}

export const minLengthCreator = (minLength) => (value) => {
  if (value.length <= minLength) {
    return `Низкая надёжность пароля`;
  }
  return undefined;
};