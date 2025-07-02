import type{ PasswordRequirement } from '@/features/authentication/types/password-requirements';

export const PASSWORD_REQUIREMENTS: PasswordRequirement = [
  { label: 'At least 12 characters', regex: /^.{12,}$/ },
  {
    label: 'Uppercase and lowercase letters included',
    regex: /^(?=.*[a-z])(?=.*[A-Z])/,
  },
  { label: 'Letters and numbers included', regex: /^(?=.*[A-Za-z])(?=.*\d)/ },
  {
    label: 'At least one special character, e.g. @[#',
    regex: /^(?=.*[\W_])/,
  },
];
