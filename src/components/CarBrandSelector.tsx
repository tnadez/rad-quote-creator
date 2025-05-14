
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CarFront } from "lucide-react";
import { CarBrand } from '@/lib/types';

interface CarBrandSelectorProps {
  brands: CarBrand[];
  selectedBrand: CarBrand | null;
  onSelectBrand: (brand: CarBrand) => void;
}

const CarBrandSelector = ({ brands, selectedBrand, onSelectBrand }: CarBrandSelectorProps) => {
  return (
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-amber-300">เลือกยี่ห้อรถยนต์</CardTitle>
        <CardDescription className="text-amber-100">
          เลือกยี่ห้อรถยนต์เพื่อดูขนาดหม้อน้ำที่เหมาะสม
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedBrand?.id || ""} 
          onValueChange={(value) => {
            const brand = brands.find(b => b.id === value);
            if (brand) onSelectBrand(brand);
          }}
        >
          <div className="flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl">
              {brands.map((brand) => (
                <div key={brand.id} className="relative">
                  <RadioGroupItem
                    value={brand.id}
                    id={`brand-${brand.id}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`brand-${brand.id}`}
                    className={`brand-option flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer ${
                      selectedBrand?.id === brand.id 
                        ? "border-amber-500 bg-amber-900/60" 
                        : "border-orange-700 bg-orange-950 hover:border-orange-500"
                    }`}
                  >
                    <div className="w-16 h-16 mb-2 rounded overflow-hidden bg-white/10 flex items-center justify-center p-2">
                      {brand.logo ? (
                        <img 
                          src={brand.logo} 
                          alt={brand.name} 
                          className="object-contain w-full h-full" 
                        />
                      ) : (
                        <CarFront className="w-8 h-8 text-amber-300" />
                      )}
                    </div>
                    <h3 className="text-md font-medium text-white text-center">{brand.name}</h3>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default CarBrandSelector;
