
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadiatorSize } from '@/lib/types';
import { calculateCustomBasePrice } from '@/lib/radiator-data';

interface SizeSelectorProps {
  sizes: RadiatorSize[];
  selectedSize: RadiatorSize | null;
  onSelectSize: (size: RadiatorSize) => void;
  onUpdateCustomSize: (width: number, height: number, thickness: number) => void;
  selectedMaterial: { id: string, pricePerSquareInch: number } | null;
}

const SizeSelector = ({ 
  sizes, 
  selectedSize, 
  onSelectSize, 
  onUpdateCustomSize,
  selectedMaterial
}: SizeSelectorProps) => {
  const [customWidth, setCustomWidth] = useState<number>(24);
  const [customHeight, setCustomHeight] = useState<number>(16);
  const [customThickness, setCustomThickness] = useState<number>(2.5);
  const [customBasePrice, setCustomBasePrice] = useState<number>(0);
  const [materialCost, setMaterialCost] = useState<number>(0);
  
  // Size image for custom
  const customSizeImage = '/images/custom-radiator.jpg';
  
  useEffect(() => {
    if (sizes.length > 0) {
      const customSize = sizes[0]; // There should only be one size now
      onSelectSize(customSize);
      onUpdateCustomSize(customWidth, customHeight, customThickness);
      const newBasePrice = calculateCustomBasePrice(customWidth, customHeight, customThickness);
      setCustomBasePrice(newBasePrice);
      
      // Calculate material cost if material is selected
      if (selectedMaterial) {
        const area = customWidth * customHeight;
        const newMaterialCost = area * selectedMaterial.pricePerSquareInch;
        setMaterialCost(newMaterialCost);
      }
    }
  }, []);

  const handleCustomSizeChange = (dimension: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    
    if (dimension === 'width') {
      setCustomWidth(numValue);
    } else if (dimension === 'height') {
      setCustomHeight(numValue);
    } else if (dimension === 'thickness') {
      setCustomThickness(numValue);
    }
    
    const updatedWidth = dimension === 'width' ? numValue : customWidth;
    const updatedHeight = dimension === 'height' ? numValue : customHeight;
    const updatedThickness = dimension === 'thickness' ? numValue : customThickness;
    
    onUpdateCustomSize(updatedWidth, updatedHeight, updatedThickness);
    const newBasePrice = calculateCustomBasePrice(updatedWidth, updatedHeight, updatedThickness);
    setCustomBasePrice(newBasePrice);
    
    // Update material cost when dimensions change
    if (selectedMaterial) {
      const area = updatedWidth * updatedHeight;
      const newMaterialCost = area * selectedMaterial.pricePerSquareInch;
      setMaterialCost(newMaterialCost);
    }
  };

  // Update material cost when material changes
  useEffect(() => {
    if (selectedMaterial) {
      const area = customWidth * customHeight;
      const newMaterialCost = area * selectedMaterial.pricePerSquareInch;
      setMaterialCost(newMaterialCost);
    } else {
      setMaterialCost(0);
    }
  }, [selectedMaterial, customWidth, customHeight]);

  return (
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-amber-300">กำหนดขนาด</CardTitle>
        <CardDescription className="text-amber-100">
          กำหนดขนาดสำหรับหม้อน้ำของคุณ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <div className="flex flex-col p-4 rounded-lg border-2 border-orange-700 bg-orange-950">
              <div className="w-full h-32 mb-3 rounded overflow-hidden bg-orange-800">
                <img 
                  src={customSizeImage} 
                  alt="Custom size radiator example"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-white">ขนาดกำหนดเอง</h3>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div>
                  <Label htmlFor="width" className="text-sm text-amber-200">กว้าง (นิ้ว)</Label>
                  <Input 
                    id="width"
                    type="number"
                    min="8"
                    max="48"
                    value={customWidth}
                    onChange={(e) => handleCustomSizeChange('width', e.target.value)}
                    className="bg-orange-800 text-white border-orange-600"
                  />
                </div>
                <div>
                  <Label htmlFor="height" className="text-sm text-amber-200">สูง (นิ้ว)</Label>
                  <Input 
                    id="height"
                    type="number"
                    min="8"
                    max="36"
                    value={customHeight}
                    onChange={(e) => handleCustomSizeChange('height', e.target.value)}
                    className="bg-orange-800 text-white border-orange-600"
                  />
                </div>
                <div>
                  <Label htmlFor="thickness" className="text-sm text-amber-200">หนา (นิ้ว)</Label>
                  <Input 
                    id="thickness"
                    type="number"
                    min="1"
                    max="5"
                    step="0.5"
                    value={customThickness}
                    onChange={(e) => handleCustomSizeChange('thickness', e.target.value)}
                    className="bg-orange-800 text-white border-orange-600"
                  />
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-orange-900/50 rounded border border-orange-600">
                  <p className="text-sm text-amber-200">ราคาพื้นฐาน:</p>
                  <p className="text-lg font-semibold text-amber-300">฿{(customBasePrice * 30).toFixed(2)}</p>
                </div>
                
                <div className="p-3 bg-orange-900/50 rounded border border-orange-600">
                  <p className="text-sm text-amber-200">ค่าวัสดุ ({selectedMaterial ? selectedMaterial.id === 'copper' ? 'ทองแดง' : 'ทองเหลือง' : 'ไม่ได้เลือก'}):</p>
                  <p className="text-lg font-semibold text-amber-300">฿{(materialCost * 30).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SizeSelector;
