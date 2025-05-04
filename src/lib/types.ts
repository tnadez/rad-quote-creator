
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
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  configuration: RadiatorConfiguration;
  totalPrice: number;
}
