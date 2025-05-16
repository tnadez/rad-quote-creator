import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadiatorSize } from '@/lib/types';
import { calculateCustomBasePrice } from '@/lib/radiator-data';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SizeSelectorProps {
  sizes: RadiatorSize[];
  selectedSize: RadiatorSize | null;
  onSelectSize: (size: RadiatorSize) => void;
  onUpdateCustomSize: (width: number, height: number, thickness: number, finType: string, finDensity: number) => void;
  onUpdateCapMaterial: (capMaterial: string) => void;
  selectedMaterial: { id: string, pricePerSquareInch: number } | null;
  capMaterial: string;
}

const SizeSelector = ({ 
  sizes, 
  selectedSize, 
  onSelectSize, 
  onUpdateCustomSize,
  onUpdateCapMaterial,
  selectedMaterial,
  capMaterial
}: SizeSelectorProps) => {
  const [customWidth, setCustomWidth] = useState<number>(24);
  const [customHeight, setCustomHeight] = useState<number>(16);
  const [customThickness, setCustomThickness] = useState<number>(2.5);
  const [finType, setFinType] = useState<string>("straight");
  const [finDensity, setFinDensity] = useState<number>(14);
  const [customBasePrice, setCustomBasePrice] = useState<number>(0);
  const [materialCost, setMaterialCost] = useState<number>(0);
  
  // Updated image for custom size radiator with the new image
  const customSizeImage = '/lovable-uploads/a2d7ea54-6ab8-4c84-8c55-38e113602459.png';
  
  useEffect(() => {
    if (sizes.length > 0) {
      const customSize = sizes[0]; // There should only be one size now
      customSize.finType = finType;
      customSize.finDensity = finDensity;
      onSelectSize(customSize);
      onUpdateCustomSize(customWidth, customHeight, customThickness, finType, finDensity);
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
    
    onUpdateCustomSize(updatedWidth, updatedHeight, updatedThickness, finType, finDensity);
    const newBasePrice = calculateCustomBasePrice(updatedWidth, updatedHeight, updatedThickness);
    setCustomBasePrice(newBasePrice);
    
    // Update material cost when dimensions change
    if (selectedMaterial) {
      const area = updatedWidth * updatedHeight;
      const newMaterialCost = area * selectedMaterial.pricePerSquareInch;
      setMaterialCost(newMaterialCost);
    }
  };

  const handleFinTypeChange = (value: string) => {
    setFinType(value);
    onUpdateCustomSize(customWidth, customHeight, customThickness, value, finDensity);
  };

  const handleFinDensityChange = (value: string) => {
    const numValue = parseInt(value);
    setFinDensity(numValue);
    onUpdateCustomSize(customWidth, customHeight, customThickness, finType, numValue);
  };

  const handleCapMaterialChange = (value: string) => {
    onUpdateCapMaterial(value);
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
              {/* Use AspectRatio to maintain proper ratio and fill the container */}
              <div className="w-full mb-3 rounded overflow-hidden bg-black">
                <AspectRatio ratio={16/9} className="bg-black">
                  <img 
                    src={customSizeImage} 
                    alt="Custom size radiator example"
                    className="w-full h-full object-contain"
                  />
                </AspectRatio>
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

              {/* Fin Type Selection */}
              <div className="mt-4">
                <Label htmlFor="fin-type" className="text-lg text-amber-300 mb-2 block">รูปแบบครีบระบายความร้อน</Label>
                <RadioGroup id="fin-type" value={finType} onValueChange={handleFinTypeChange} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="straight" id="fin-straight" className="border-amber-400 text-amber-400" />
                    <Label htmlFor="fin-straight" className="text-amber-100">ครีบแบบตรง</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="v-shaped" id="fin-v" className="border-amber-400 text-amber-400" />
                    <Label htmlFor="fin-v" className="text-amber-100">ครีบแบบตัววี</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Fin Density Selection */}
              <div className="mt-4">
                <Label htmlFor="fin-density" className="text-lg text-amber-300 mb-2 block">ความถี่ของครีบ (ครีบต่อนิ้ว)</Label>
                <Select value={finDensity.toString()} onValueChange={handleFinDensityChange}>
                  <SelectTrigger className="w-full bg-orange-800 text-white border-orange-600">
                    <SelectValue placeholder="เลือกความถี่ของครีบ" />
                  </SelectTrigger>
                  <SelectContent className="bg-orange-800 text-white border-orange-700">
                    <SelectItem value="10">10 ครีบต่อนิ้ว</SelectItem>
                    <SelectItem value="12">12 ครีบต่อนิ้ว</SelectItem>
                    <SelectItem value="14">14 ครีบต่อนิ้ว</SelectItem>
                    <SelectItem value="16">16 ครีบต่อนิ้ว</SelectItem>
                    <SelectItem value="18">18 ครีบต่อนิ้ว</SelectItem>
                    <SelectItem value="20">20 ครีบต่อนิ้ว</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cap Material Selection */}
              <div className="mt-4">
                <Label htmlFor="cap-material" className="text-lg text-amber-300 mb-2 block">วัสดุฝาหม้อน้ำ</Label>
                <Select value={capMaterial} onValueChange={handleCapMaterialChange}>
                  <SelectTrigger className="w-full bg-orange-800 text-white border-orange-600">
                    <SelectValue placeholder="เลือกวัสดุฝาหม้อน้ำ" />
                  </SelectTrigger>
                  <SelectContent className="bg-orange-800 text-white border-orange-700">
                    <SelectItem value="plastic">พลาสติก</SelectItem>
                    <SelectItem value="copper">ทองแดง</SelectItem>
                    <SelectItem value="brass">ทองเหลือง</SelectItem>
                  </SelectContent>
                </Select>
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
