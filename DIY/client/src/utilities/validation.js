// Validate car configuration for incompatible combinations
export const validateCarConfiguration = (selections) => {
  const errors = []

  // Chrome wheels cannot be paired with cloth interior
  if (selections.wheels === 'chrome' && selections.interior === 'cloth') {
    errors.push('Chrome wheels cannot be paired with cloth interior. Please choose a premium interior.')
  }

  // Glass roof requires leather or premium interior
  if (selections.roof === 'glass' && selections.interior === 'cloth') {
    errors.push('Glass roof requires a leather or premium interior.')
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  }
}

