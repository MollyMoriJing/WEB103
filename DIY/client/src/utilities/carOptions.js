// Car customization options with prices
export const carOptions = {
  exteriorColor: [
    { value: 'red', label: 'Red', price: 0, icon: '🔴' },
    { value: 'blue', label: 'Blue', price: 0, icon: '🔵' },
    { value: 'black', label: 'Black', price: 500, icon: '⚫' },
    { value: 'white', label: 'White', price: 0, icon: '⚪' },
    { value: 'silver', label: 'Silver', price: 300, icon: '⚪' },
  ],
  wheels: [
    { value: 'standard', label: 'Standard', price: 0, icon: '⚙️' },
    { value: 'sport', label: 'Sport', price: 5000, icon: '🏁' },
    { value: 'chrome', label: 'Chrome', price: 8000, icon: '✨' },
  ],
  interior: [
    { value: 'cloth', label: 'Cloth', price: 0, icon: '🪑' },
    { value: 'leather', label: 'Leather', price: 10000, icon: '💺' },
    { value: 'premium', label: 'Premium Leather', price: 15000, icon: '👑' },
  ],
  roof: [
    { value: 'solid', label: 'Solid', price: 0, icon: '🏠' },
    { value: 'glass', label: 'Glass Roof', price: 5000, icon: '🪟' },
  ],
}

// Base price of the car
export const BASE_PRICE = 40000

