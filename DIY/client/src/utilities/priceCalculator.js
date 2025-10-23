import { carOptions, BASE_PRICE } from './carOptions'

// Calculate total price based on selected options
export const calculateTotalPrice = (selections) => {
  let total = BASE_PRICE

  // Add price for exterior color
  const exteriorOption = carOptions.exteriorColor.find(
    (option) => option.value === selections.exterior_color
  )
  if (exteriorOption) total += exteriorOption.price

  // Add price for wheels
  const wheelsOption = carOptions.wheels.find(
    (option) => option.value === selections.wheels
  )
  if (wheelsOption) total += wheelsOption.price

  // Add price for interior
  const interiorOption = carOptions.interior.find(
    (option) => option.value === selections.interior
  )
  if (interiorOption) total += interiorOption.price

  // Add price for roof
  const roofOption = carOptions.roof.find(
    (option) => option.value === selections.roof
  )
  if (roofOption) total += roofOption.price

  return total
}

// Format price with commas
export const formatPrice = (price) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

