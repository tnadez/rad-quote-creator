
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CarModel, RadiatorPreset, RadiatorSize, Material } from '@/lib/types';
import { getPresetByModelId } from '@/lib/car-data';
import { materials } from '@/lib/radiator-data';

interface RadiatorPresetInfoProps {
  selectedModel: CarModel | null;
  onApplyPreset: (size: RadiatorSize, recommendedMaterialId: string) => void;
}

const RadiatorPresetInfo = ({ selectedModel, onApplyPreset }: RadiatorPresetInfoProps) => {
  if (!selectedModel) return null;
  
  const preset = getPresetByModelId(selectedModel.id);
  
  if (!preset) return (
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-amber-300">ข้อมูลหม้อน้ำ</CardTitle>
        <CardDescription className="text-amber-100">
          ไม่พบข้อมูลหม้อน้ำสำหรับรุ่นรถยนต์ที่เลือก
        </CardDescription>
      </CardHeader>
    </Card>
  );

  // Find the recommended material
  const recommendedMaterial = materials.find(m => m.id === preset.recommendedMaterial);

  // Create a size object based on the preset
  const presetSize: RadiatorSize = {
    id: `preset_${selectedModel.id}`,
    name: `หม้อน้ำสำหรับ ${selectedModel.name}`,
    width: preset.size.width,
    height: preset.size.height,
    thickness: preset.size.thickness,
    price: 0 // Price will be calculated based on material and size
  };

  return (
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-amber-300">ข้อมูลหม้อน้ำแนะนำ</CardTitle>
        <CardDescription className="text-amber-100">
          ข้อมูลหม้อน้ำที่เหมาะสมสำหรับ {selectedModel.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-orange-950 p-4 rounded-lg border border-amber-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">ขนาด</h3>
              <div className="space-y-1 text-amber-100">
                <p><span className="font-medium">กว้าง:</span> {preset.size.width} นิ้ว</p>
                <p><span className="font-medium">สูง:</span> {preset.size.height} นิ้ว</p>
                <p><span className="font-medium">หนา:</span> {preset.size.thickness} นิ้ว</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">ข้อมูลครีบระบายความร้อน</h3>
              <div className="space-y-1 text-amber-100">
                <p><span className="font-medium">รูปแบบครีบ:</span> {preset.finType}</p>
                <p><span className="font-medium">ความหนาแน่นครีบ:</span> {preset.finDensity} ครีบต่อนิ้ว</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">วัสดุแนะนำ</h3>
              <div className="space-y-1 text-amber-100">
                <p><span className="font-medium">ชนิด:</span> {recommendedMaterial?.name || preset.recommendedMaterial}</p>
                {recommendedMaterial && (
                  <p className="text-xs text-amber-200">{recommendedMaterial.description}</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">ฝาหม้อน้ำ</h3>
              <div className="space-y-1 text-amber-100">
                <p><span className="font-medium">ประเภท:</span> {preset.capType}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              onClick={() => onApplyPreset(presetSize, preset.recommendedMaterial)}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              ใช้การตั้งค่านี้
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RadiatorPresetInfo;
