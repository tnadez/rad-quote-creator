import { CarBrand, CarModel, RadiatorPreset } from './types';

export const carBrands: CarBrand[] = [
  {
    id: 'toyota',
    name: 'Toyota',
    logo: '/lovable-uploads/04f01520-5580-4849-b715-c88be484e603.png'
  },
  {
    id: 'honda',
    name: 'Honda',
    logo: '/lovable-uploads/8651bfd5-df8b-43eb-aa0c-67047f5e6edb.png'
  },
  {
    id: 'nissan',
    name: 'Nissan',
    logo: '/lovable-uploads/f70b2ccd-46e5-46dd-92dd-87496ff6787b.png'
  },
  {
    id: 'isuzu',
    name: 'Isuzu',
    logo: '/lovable-uploads/4c02e7fc-52bb-45bb-a2a5-f1c714790b8f.png'
  },
  {
    id: 'mazda',
    name: 'Mazda',
    logo: '/lovable-uploads/966178b3-5f83-4b92-b9e3-bcc4a42176d4.png'
  }
];

export const carModels: CarModel[] = [
  // Toyota models
  {
    id: 'camry',
    brandId: 'toyota',
    name: 'Camry',
    year: '2018-2023',
    image: '/lovable-uploads/b919c0e0-4a55-49fd-aa79-ea43733bbde2.png'
  },
  {
    id: 'corolla',
    brandId: 'toyota',
    name: 'Corolla',
    year: '2019-2023',
    image: '/lovable-uploads/0350fefc-1266-4975-9a8d-30f524af6951.png'
  },
  {
    id: 'fortuner',
    brandId: 'toyota',
    name: 'Fortuner',
    year: '2016-2023',
    image: '/lovable-uploads/2e1717a4-a928-4134-bdee-9235dee67b0f.png'
  },
  
  // Honda models
  {
    id: 'civic',
    brandId: 'honda',
    name: 'Civic',
    year: '2016-2022',
    image: '/images/honda-civic.jpg'
  },
  {
    id: 'crv',
    brandId: 'honda',
    name: 'CR-V',
    year: '2017-2023',
    image: '/images/honda-crv.jpg'
  },
  {
    id: 'accord',
    brandId: 'honda',
    name: 'Accord',
    year: '2018-2023',
    image: '/images/honda-accord.jpg'
  },
  
  // Nissan models
  {
    id: 'almera',
    brandId: 'nissan',
    name: 'Almera',
    year: '2020-2023',
    image: '/images/nissan-almera.jpg'
  },
  {
    id: 'kicks',
    brandId: 'nissan',
    name: 'Kicks',
    year: '2020-2023',
    image: '/images/nissan-kicks.jpg'
  },
  {
    id: 'navara',
    brandId: 'nissan',
    name: 'Navara',
    year: '2015-2022',
    image: '/images/nissan-navara.jpg'
  },
  
  // Isuzu models
  {
    id: 'dmax',
    brandId: 'isuzu',
    name: 'D-Max',
    year: '2019-2023',
    image: '/images/isuzu-dmax.jpg'
  },
  {
    id: 'mu-x',
    brandId: 'isuzu',
    name: 'MU-X',
    year: '2020-2023',
    image: '/images/isuzu-mu-x.jpg'
  },
  
  // Mazda models
  {
    id: 'mazda2',
    brandId: 'mazda',
    name: 'Mazda 2',
    year: '2019-2023',
    image: '/images/mazda-2.jpg'
  },
  {
    id: 'mazda3',
    brandId: 'mazda',
    name: 'Mazda 3',
    year: '2020-2023',
    image: '/images/mazda-3.jpg'
  },
  {
    id: 'cx-5',
    brandId: 'mazda',
    name: 'CX-5',
    year: '2017-2023',
    image: '/images/mazda-cx5.jpg'
  }
];

export const radiatorPresets: RadiatorPreset[] = [
  // Toyota presets
  {
    id: 'camry_standard',
    modelId: 'camry',
    size: { width: 26, height: 16, thickness: 2.2 },
    finType: 'ครีบแบบคลื่น',
    finDensity: 14,
    recommendedMaterial: 'brass',
    capType: 'แรงดันมาตรฐาน (1.1 บาร์)'
  },
  {
    id: 'corolla_standard',
    modelId: 'corolla',
    size: { width: 24, height: 14, thickness: 2 },
    finType: 'ครีบแบบตรง',
    finDensity: 12,
    recommendedMaterial: 'brass',
    capType: 'แรงดันมาตรฐาน (1.1 บาร์)'
  },
  {
    id: 'fortuner_standard',
    modelId: 'fortuner',
    size: { width: 28, height: 19, thickness: 2.5 },
    finType: 'ครีบแบบคลื่น',
    finDensity: 16,
    recommendedMaterial: 'copper',
    capType: 'แรงดันสูง (1.3 บาร์)'
  },
  
  // Honda presets
  {
    id: 'civic_standard',
    modelId: 'civic',
    size: { width: 25, height: 15, thickness: 2.2 },
    finType: 'ครีบแบบคลื่น',
    finDensity: 14,
    recommendedMaterial: 'brass',
    capType: 'แรงดันมาตรฐาน (1.1 บาร์)'
  },
  {
    id: 'crv_standard',
    modelId: 'crv',
    size: { width: 27, height: 17, thickness: 2.5 },
    finType: 'ครีบแบบคลื่น',
    finDensity: 16,
    recommendedMaterial: 'copper',
    capType: 'แรงดันสูง (1.3 บาร์)'
  },
  {
    id: 'accord_standard',
    modelId: 'accord',
    size: { width: 26, height: 16, thickness: 2.2 },
    finType: 'ครีบแบบคลื่น',
    finDensity: 14,
    recommendedMaterial: 'brass',
    capType: 'แรงดันสูง (1.3 บาร์)'
  },
  
  // Nissan presets
  {
    id: 'almera_standard',
    modelId: 'almera',
    size: { width: 23, height: 14, thickness: 2 },
    finType: 'ครีบแบบตรง',
    finDensity: 12,
    recommendedMaterial: 'brass',
    capType: 'แรงดันมาตรฐาน (1.1 บาร์)'
  },
  {
    id: 'kicks_standard',
    modelId: 'kicks',
    size: { width: 24, height: 15, thickness: 2.2 },
    finType: 'ครีบแบบคลื่น',
    finDensity: 14,
    recommendedMaterial: 'brass',
    capType: 'แรงดันมาตรฐาน (1.1 บาร์)'
  },
  {
    id: 'navara_standard',
    modelId: 'navara',
    size: { width: 29, height: 20, thickness: 2.8 },
    finType: 'ครีบแบบเอียง',
    finDensity: 18,
    recommendedMaterial: 'copper',
    capType: 'แรงดันสูง (1.3 บาร์)'
  },
  
  // Isuzu presets
  {
    id: 'dmax_standard',
    modelId: 'dmax',
    size: { width: 28, height: 20, thickness: 2.8 },
    finType: 'ครีบแบบเอียง',
    finDensity: 18,
    recommendedMaterial: 'copper',
    capType: 'แรงดันสูง (1.3 บาร์)'
  },
  {
    id: 'mu-x_standard',
    modelId: 'mu-x',
    size: { width: 27, height: 19, thickness: 2.6 },
    finType: 'ครีบแบบเอียง',
    finDensity: 16,
    recommendedMaterial: 'copper',
    capType: 'แรงดันสูง (1.3 บาร์)'
  },
  
  // Mazda presets
  {
    id: 'mazda2_standard',
    modelId: 'mazda2',
    size: { width: 23, height: 14, thickness: 2 },
    finType: 'ครีบแบบตรง',
    finDensity: 12,
    recommendedMaterial: 'brass',
    capType: 'แรงดันมาตรฐาน (1.1 บาร์)'
  },
  {
    id: 'mazda3_standard',
    modelId: 'mazda3',
    size: { width: 25, height: 15, thickness: 2.2 },
    finType: 'ครีบแบบคลื่น',
    finDensity: 14,
    recommendedMaterial: 'brass',
    capType: 'แรงดันมาตรฐาน (1.1 บาร์)'
  },
  {
    id: 'cx-5_standard',
    modelId: 'cx-5',
    size: { width: 26, height: 17, thickness: 2.5 },
    finType: 'ครีบแบบคลื่น',
    finDensity: 16,
    recommendedMaterial: 'copper',
    capType: 'แรงดันสูง (1.3 บาร์)'
  }
];

// Helper function to get car models by brand ID
export const getModelsByBrandId = (brandId: string): CarModel[] => {
  return carModels.filter(model => model.brandId === brandId);
};

// Helper function to get radiator preset by model ID
export const getPresetByModelId = (modelId: string): RadiatorPreset | undefined => {
  return radiatorPresets.find(preset => preset.modelId === modelId);
};
