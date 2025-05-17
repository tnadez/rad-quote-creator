
export interface Material {
  id: string;
  name: string;
  description: string;
  pricePerSquareInch: number;
  image: string;
}

export interface RadiatorSize {
  id: string;
  name: string;
  width: number;
  height: number;
  thickness: number;
  price: number;
  finType?: string;     // "straight" or "v-shaped"
  finDensity?: number;  // fins per inch
}

export interface AdditionalFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface RadiatorConfiguration {
  material: Material | null;
  size: RadiatorSize | null;
  features: AdditionalFeature[];
  finType?: string;
  finDensity?: number;
  capMaterial?: string;
  // Add prices for custom options
  finTypePrice?: number;
  finDensityPrice?: number;
  capMaterialPrice?: number;
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  configuration: RadiatorConfiguration;
  totalPrice: number;
}

export interface CarBrand {
  id: string;
  name: string;
  logo: string;
}

export interface CarModel {
  id: string;
  brandId: string;
  name: string;
  year: string;
  image: string;
}

export interface RadiatorPreset {
  id: string;
  modelId: string;
  size: {
    width: number;
    height: number;
    thickness: number;
  };
  finType: string;
  finDensity: number;
  recommendedMaterial: string;
  capType: string;
}
