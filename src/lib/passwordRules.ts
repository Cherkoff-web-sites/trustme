/** Правила пароля: длина, регистр букв (латиница / кириллица), цифра. */

export type PasswordRuleChecks = {
  minLength: boolean;
  upperAndLower: boolean;
  hasDigit: boolean;
};

export function getPasswordRuleChecks(password: string): PasswordRuleChecks {
  const minLength = password.length >= 8;
  const hasUpper = /[A-ZА-ЯЁ]/.test(password);
  const hasLower = /[a-zа-яё]/.test(password);
  const upperAndLower = hasUpper && hasLower;
  const hasDigit = /\d/.test(password);
  return { minLength, upperAndLower, hasDigit };
}
