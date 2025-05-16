
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Material } from '@/lib/types';

interface MaterialSelectorProps {
  materials: Material[];
  selectedMaterial: Material | null;
  onSelectMaterial: (material: Material) => void;
}

const MaterialSelector = ({ materials, selectedMaterial, onSelectMaterial }: MaterialSelectorProps) => {
  return (
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-amber-300">เลือกวัสดุ</CardTitle>
        <CardDescription className="text-amber-100">
          เลือกวัสดุสำหรับหม้อน้ำแบบกำหนดเองของคุณ (ราคาสะท้อนอัตราตลาดปัจจุบัน)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedMaterial?.id || ""} 
          onValueChange={(value) => {
            const material = materials.find(m => m.id === value);
            if (material) onSelectMaterial(material);
          }}
        >
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
              {materials.map((material) => (
                <div key={material.id} className="relative">
                  <RadioGroupItem
                    value={material.id}
                    id={material.id}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={material.id}
                    className={`radiator-option flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer ${
                      selectedMaterial?.id === material.id 
                        ? "border-amber-500 bg-amber-900/60" 
                        : "border-orange-700 bg-orange-950 hover:border-orange-500"
                    }`}
                  >
                    <div className="w-full h-60 mb-4 rounded overflow-hidden flex items-center justify-center">
                      <img 
                        src={material.image} 
                        alt={material.name} 
                        className="object-cover w-full h-full" 
                      />
                    </div>
                    <h3 className="text-xl font-medium text-white">{material.name}</h3>
                    <p className="text-sm text-amber-200 mt-2 text-center">{material.description}</p>
                    <p className="mt-3 text-lg font-semibold text-amber-300">
                      ฿{(material.pricePerSquareInch * 30).toFixed(2)}/ตร.นิ้ว
                      {material.id === 'copper' && (
                        <span className="ml-2 text-xs px-2 py-0.5 bg-amber-800 rounded-full">ตามราคาตลาด</span>
                      )}
                      {material.id === 'brass' && (
                        <span className="ml-2 text-xs px-2 py-0.5 bg-amber-800 rounded-full">ตามราคาตลาด</span>
                      )}
                    </p>
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

export default MaterialSelector;
