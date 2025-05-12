
import { Material, RadiatorSize, AdditionalFeature } from './types';

export const materials: Material[] = [
  {
    id: 'copper',
    name: 'ทองแดง',
    description: 'การนำความร้อนที่เหนือกว่า ให้การระบายความร้อนที่ดีที่สุดสำหรับการใช้งานแบบสมรรถนะสูง',
    pricePerSquareInch: 15,
    image: '/images/copper-radiator.jpg'
  },
  {
    id: 'brass',
    name: 'ทองเหลือง',
    description: 'ทนทานและสวยงาม เหมาะกับการใช้งานทั่วไปและให้ความสวยงามแบบคลาสสิก',
    pricePerSquareInch: 10,
    image: '/images/brass-radiator.jpg'
  }
];

export const sizes: RadiatorSize[] = [
  {
    id: 'small',
    name: 'เล็ก (มาตรฐาน)',
    width: 18,
    height: 12,
    thickness: 2,
    price: 80
  },
  {
    id: 'medium',
    name: 'กลาง (สมรรถนะสูง)',
    width: 24,
    height: 16,
    thickness: 2.5,
    price: 120
  },
  {
    id: 'large',
    name: 'ใหญ่ (แข่งขัน)',
    width: 30,
    height: 18,
    thickness: 3,
    price: 180
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
    basePrice = materialCost + 100; // Reduced custom fee from 150 to 100
  }
  
  // Add feature costs
  const featuresTotal = features.reduce((sum, feature) => sum + feature.price, 0);
  
  return Math.round((basePrice + featuresTotal) * 100) / 100;
};
