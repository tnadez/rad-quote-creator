
import { Material, RadiatorSize, AdditionalFeature } from './types';

export const materials: Material[] = [
  {
    id: 'copper',
    name: 'ทองแดง',
    description: 'การนำความร้อนที่เหนือกว่า ให้การระบายความร้อนที่ดีที่สุดสำหรับการใช้งานแบบสมรรถนะสูง',
    pricePerSquareInch: 0.8,
    image: '/lovable-uploads/44680307-25f9-4100-9490-20b14e74eb08.png'
  },
  {
    id: 'brass',
    name: 'ทองเหลือง',
    description: 'ทนทานและสวยงาม เหมาะกับการใช้งานทั่วไปและให้ความสวยงามแบบคลาสสิก',
    pricePerSquareInch: 0.65,
    image: '/lovable-uploads/68e68488-0fdb-4145-a20c-2815432369c8.png'
  }
];

export const sizes: RadiatorSize[] = [
  {
    id: 'custom',
    name: 'ขนาดกำหนดเอง',
    width: 24,
    height: 16,
    thickness: 2.5,
    price: 0
  }
];

// Pricing configuration for custom options
export const finTypePrices = {
  'straight': 0,      // Standard option (no additional cost)
  'v-shaped': 250     // Premium option (additional cost)
};

export const finDensityPrices = {
  '10': 0,            // Low density (no additional cost)
  '12': 50,           // Medium-low density
  '14': 100,          // Medium density (standard)
  '16': 150,          // Medium-high density
  '18': 200,          // High density
  '20': 250           // Very high density
};

export const capMaterialPrices = {
  'plastic': 0,       // Standard option (no additional cost)
  'copper': 350,      // Premium option (high additional cost)
  'brass': 250        // Mid-tier option (medium additional cost)
};

export const additionalFeatures: AdditionalFeature[] = [
  {
    id: 'fan',
    name: 'พัดลมระบายความร้อนแรงดันสูง',
    description: 'เพิ่มการไหลของอากาศผ่านหม้อน้ำเพื่อประสิทธิภาพการระบายความร้อนที่ดีขึ้น',
    price: 85,
    image: '/images/cooling-fan.jpg'
  },
  {
    id: 'shroud',
    name: 'ฝาครอบพัดลมแบบกำหนดเอง',
    description: 'นำทางการไหลของอากาศเพื่อประสิทธิภาพการระบายความร้อนสูงสุดและสมรรถนะที่ดีที่สุด',
    price: 65,
    image: '/images/fan-shroud.jpg'
  },
  {
    id: 'cap',
    name: 'ฝาหม้อน้ำแรงดันสูง',
    description: 'เพิ่มแรงดันระบบช่วยให้น้ำหล่อเย็นทนอุณหภูมิสูงโดยไม่เดือด',
    price: 25,
    image: '/images/radiator-cap.jpg'
  },
  {
    id: 'coating',
    name: 'เคลือบเซรามิก',
    description: 'เพิ่มการป้องกันความร้อนและการตกแต่งที่สวยงามให้กับชิ้นส่วนภายนอกของหม้อน้ำ',
    price: 110,
    image: '/images/ceramic-coating.jpg'
  }
];

// This function calculates the base price for custom radiators based on dimensions
export const calculateCustomBasePrice = (width: number, height: number, thickness: number): number => {
  // Calculate area in square inches
  const area = width * height;
  
  // Base calculation: area impacts price the most
  let basePrice = area * 0.15;
  
  // Thickness factor: thicker radiators cost more (exponential relationship)
  const thicknessFactor = Math.pow(thickness, 1.5);
  
  // Complexity factor: larger and thicker radiators are more complex to build
  const complexityFactor = Math.sqrt(area) * thicknessFactor * 0.2;
  
  // Minimum price threshold for small radiators
  const minBasePrice = 100;
  
  // Final price calculation with minimum threshold
  const finalBasePrice = Math.max(basePrice + complexityFactor, minBasePrice);
  
  // Round to 2 decimal places
  return Math.round(finalBasePrice * 100) / 100;
};

export const calculateTotalPrice = (
  material: Material | null, 
  size: RadiatorSize | null, 
  features: AdditionalFeature[],
  finType: string = 'straight',
  finDensity: number = 14,
  capMaterial: string = 'plastic'
): number => {
  if (!material || !size) return 0;
  
  let basePrice = 0;
  
  // Calculate material cost
  const area = size.width * size.height;
  const materialCost = area * material.pricePerSquareInch;
  
  // For custom size
  const customBasePrice = calculateCustomBasePrice(size.width, size.height, size.thickness);
  basePrice = materialCost + customBasePrice;
  
  // Add feature costs
  const featuresTotal = features.reduce((sum, feature) => sum + feature.price, 0);
  
  // Add fin type cost
  const finTypePrice = finTypePrices[finType as keyof typeof finTypePrices] || 0;
  
  // Add fin density cost
  const finDensityPrice = finDensityPrices[finDensity.toString() as keyof typeof finDensityPrices] || 0;
  
  // Add cap material cost
  const capMaterialPrice = capMaterialPrices[capMaterial as keyof typeof capMaterialPrices] || 0;
  
  return Math.round((basePrice + featuresTotal + finTypePrice + finDensityPrice + capMaterialPrice) * 100) / 100;
};
