// Map better-auth's machine error codes/messages to human-friendly copy.
export function friendlyAuthError(codeOrMessage: string): string {
  const normalized = codeOrMessage.toUpperCase();

  if (normalized.includes("USER_ALREADY_EXISTS") || normalized.includes("ALREADY")) {
    return "An account with this email already exists. Try logging in instead.";
  }
  if (normalized.includes("INVALID_EMAIL_OR_PASSWORD")) {
    return "Incorrect email or password. Please try again.";
  }
  if (normalized.includes("USER_NOT_FOUND")) {
    return "No account found with this email. Create one first.";
  }
  if (normalized.includes("PASSWORD_TOO_SHORT") || normalized.includes("PASSWORD")) {
    return "Password must be at least 8 characters long.";
  }
  if (normalized.includes("INVALID_EMAIL")) {
    return "That email address doesn't look right. Please check it.";
  }

  return "Something went wrong. Please try again.";
}
