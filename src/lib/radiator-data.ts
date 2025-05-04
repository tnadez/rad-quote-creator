
import { Material, RadiatorSize, AdditionalFeature } from './types';

export const materials: Material[] = [
  {
    id: 'aluminum',
    name: 'Aluminum',
    description: 'Lightweight and offers excellent heat dissipation properties, ideal for most applications.',
    pricePerSquareInch: 0.5,
    image: '/placeholder.svg'
  },
  {
    id: 'copper',
    name: 'Copper',
    description: 'Superior thermal conductivity, provides optimal cooling for high-performance applications.',
    pricePerSquareInch: 0.8,
    image: '/placeholder.svg'
  },
  {
    id: 'brass',
    name: 'Brass',
    description: 'Excellent corrosion resistance and good heat transfer capabilities, suitable for harsh environments.',
    pricePerSquareInch: 0.7,
    image: '/placeholder.svg'
  }
];

export const sizes: RadiatorSize[] = [
  {
    id: 'small',
    name: 'Small (Standard)',
    width: 18,
    height: 12,
    thickness: 2,
    price: 120
  },
  {
    id: 'medium',
    name: 'Medium (Performance)',
    width: 24,
    height: 16,
    thickness: 2.5,
    price: 180
  },
  {
    id: 'large',
    name: 'Large (Racing)',
    width: 30,
    height: 18,
    thickness: 3,
    price: 250
  },
  {
    id: 'custom',
    name: 'Custom Size',
    width: 0,
    height: 0,
    thickness: 0,
    price: 0
  }
];

export const additionalFeatures: AdditionalFeature[] = [
  {
    id: 'fan',
    name: 'High-Flow Cooling Fan',
    description: 'Increases airflow through the radiator for improved cooling efficiency.',
    price: 85,
    image: '/placeholder.svg'
  },
  {
    id: 'shroud',
    name: 'Custom Fan Shroud',
    description: 'Directs airflow for maximum cooling efficiency and optimal performance.',
    price: 65,
    image: '/placeholder.svg'
  },
  {
    id: 'cap',
    name: 'High-Pressure Radiator Cap',
    description: 'Increases system pressure allowing for higher coolant temperatures without boiling.',
    price: 25,
    image: '/placeholder.svg'
  },
  {
    id: 'coating',
    name: 'Ceramic Coating',
    description: 'Adds thermal protection and a stylish finish to external radiator components.',
    price: 110,
    image: '/placeholder.svg'
  }
];

export const calculateTotalPrice = (
  material: Material | null, 
  size: RadiatorSize | null, 
  features: AdditionalFeature[]
): number => {
  if (!material || !size) return 0;
  
  let basePrice = 0;
  
  // Calculate material cost
  if (size.id !== 'custom') {
    // For standard sizes
    const area = size.width * size.height;
    const materialCost = area * material.pricePerSquareInch;
    basePrice = size.price + materialCost;
  } else {
    // For custom sizes
    const area = size.width * size.height;
    const materialCost = area * material.pricePerSquareInch;
    basePrice = materialCost + 150; // Base custom fee
  }
  
  // Add feature costs
  const featuresTotal = features.reduce((sum, feature) => sum + feature.price, 0);
  
  return Math.round((basePrice + featuresTotal) * 100) / 100;
};
