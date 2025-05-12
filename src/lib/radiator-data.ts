import { Material, RadiatorSize, AdditionalFeature } from './types';

export const materials: Material[] = [
  {
    id: 'copper',
    name: 'ทองแดง',
    description: 'การนำความร้อนที่เหนือกว่า ให้การระบายความร้อนที่ดีที่สุดสำหรับการใช้งานแบบสมรรถนะสูง',
    pricePerSquareInch: 0.8,
    image: '/images/copper-radiator.jpg'
  },
  {
    id: 'brass',
    name: 'ทองเหลือง',
    description: 'ทนทานและสวยงาม เหมาะกับการใช้งานทั่วไปและให้ความสวยงามแบบคลาสสิก',
    pricePerSquareInch: 0.65,
    image: '/images/brass-radiator.jpg'
  }
];

// Only keeping custom size option
export const sizes: RadiatorSize[] = [
  {
    id: 'custom',
    name: 'ขนาดกำหนดเอง',
    width: 24,
    height: 16,
    thickness: 2.5,
    price: 0 // Base price will be calculated dynamically
  }
];

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

// Calculate dynamic base price based on dimensions
const calculateBasePriceFromDimensions = (width: number, height: number, thickness: number): number => {
  // Base formula for calculating price based on dimensions
  const area = width * height;
  const volumeFactor = thickness / 2;
  
  // Base price scaling factors
  const basePrice = 50; // Starting price
  const areaPriceFactor = 0.15; // Price per square inch
  const thicknessPriceFactor = 15; // Price factor for thickness
  
  // Calculate components of the price
  const areaPrice = area * areaPriceFactor;
  const thicknessPrice = volumeFactor * thicknessPriceFactor;
  
  // Return the calculated base price (rounded to 2 decimal places)
  return Math.round((basePrice + areaPrice + thicknessPrice) * 100) / 100;
};

export const calculateTotalPrice = (
  material: Material | null, 
  size: RadiatorSize | null, 
  features: AdditionalFeature[]
): number => {
  if (!material || !size) return 0;
  
  // Calculate area and material cost
  const area = size.width * size.height;
  const materialCost = area * material.pricePerSquareInch;
  
  // Calculate dynamic base price based on dimensions
  const basePriceFee = calculateBasePriceFromDimensions(size.width, size.height, size.thickness);
  
  // Calculate total price
  const basePrice = materialCost + basePriceFee;
  
  // Add feature costs
  const featuresTotal = features.reduce((sum, feature) => sum + feature.price, 0);
  
  return Math.round((basePrice + featuresTotal) * 100) / 100;
};
