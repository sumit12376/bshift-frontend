import { PASSWORD_REQUIREMENTS } from '../constants/password-requirements';

export const getPasswordStrength = (password: string) => {
  let strength = 0;

  PASSWORD_REQUIREMENTS.forEach((requirement) => {
    if (requirement.regex.test(password)) {
      strength = strength + 1;
    }
  });

  return strength;
};
