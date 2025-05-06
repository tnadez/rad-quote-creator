import { Material, RadiatorSize, AdditionalFeature } from './types';

export const materials: Material[] = [
  {
    id: 'aluminum',
    name: 'อะลูมิเนียม',
    description: 'น้ำหนักเบาและมีคุณสมบัติในการกระจายความร้อนที่ยอดเยี่ยม เหมาะสำหรับการใช้งานทั่วไป',
    pricePerSquareInch: 0.5,
    image: '/placeholder.svg'
  },
  {
    id: 'copper',
    name: 'ทองแดง',
    description: 'การนำความร้อนที่เหนือกว่า ให้การระบายความร้อนที่ดีที่สุดสำหรับการใช้งานแบบสมรรถนะสูง',
    pricePerSquareInch: 0.8,
    image: '/placeholder.svg'
  }
];

export const sizes: RadiatorSize[] = [
  {
    id: 'small',
    name: 'เล็ก (มาตรฐาน)',
    width: 18,
    height: 12,
    thickness: 2,
    price: 120
  },
  {
    id: 'medium',
    name: 'กลาง (สมรรถนะสูง)',
    width: 24,
    height: 16,
    thickness: 2.5,
    price: 180
  },
  {
    id: 'large',
    name: 'ใหญ่ (แข่งขัน)',
    width: 30,
    height: 18,
    thickness: 3,
    price: 250
  },
  {
    id: 'custom',
    name: 'ขนาดกำหนดเอง',
    width: 0,
    height: 0,
    thickness: 0,
    price: 0
  }
];

export const additionalFeatures: AdditionalFeature[] = [
  {
    id: 'fan',
    name: 'พัดลมระบายความร้อนแรงดันสูง',
    description: 'เพิ่มการไหลของอากาศผ่านหม้อน้ำเพื่อประสิทธิภาพการระบายความร้อนที่ดีขึ้น',
    price: 85,
    image: '/placeholder.svg'
  },
  {
    id: 'shroud',
    name: 'ฝาครอบพัดลมแบบกำหนดเอง',
    description: 'นำทางการไหลของอากาศเพื่อประสิทธิภาพการระบายความร้อนสูงสุดและสมรรถนะที่ดีที่สุด',
    price: 65,
    image: '/placeholder.svg'
  },
  {
    id: 'cap',
    name: 'ฝาหม้อน้ำแรงดันสูง',
    description: 'เพิ่มแรงดันระบบช่วยให้น้ำหล่อเย็นทนอุณหภูมิสูงโดยไม่เดือด',
    price: 25,
    image: '/placeholder.svg'
  },
  {
    id: 'coating',
    name: 'เคลือบเซรามิก',
    description: 'เพิ่มการป้องกันความร้อนและการตกแต่งที่สวยงามให้กับชิ้นส่วนภายนอกของหม้อน้ำ',
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
