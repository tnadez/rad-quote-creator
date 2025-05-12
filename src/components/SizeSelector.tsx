
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadiatorSize } from '@/lib/types';
import { calculateCustomBasePrice } from '@/lib/radiator-data';

interface SizeSelectorProps {
  sizes: RadiatorSize[];
  selectedSize: RadiatorSize | null;
  onSelectSize: (size: RadiatorSize) => void;
  onUpdateCustomSize: (width: number, height: number, thickness: number) => void;
}

const SizeSelector = ({ 
  sizes, 
  selectedSize, 
  onSelectSize, 
  onUpdateCustomSize 
}: SizeSelectorProps) => {
  const [customWidth, setCustomWidth] = useState<number>(24);
  const [customHeight, setCustomHeight] = useState<number>(16);
  const [customThickness, setCustomThickness] = useState<number>(2.5);
  const [customBasePrice, setCustomBasePrice] = useState<number>(0);

  // Size images mappings for examples
  const sizeImages = {
    'small': '/images/small-radiator.jpg',
    'medium': '/images/medium-radiator.jpg',
    'large': '/images/large-radiator.jpg',
    'custom': '/images/custom-radiator.jpg'
  };

  useEffect(() => {
    if (selectedSize?.id === 'custom') {
      onUpdateCustomSize(customWidth, customHeight, customThickness);
      const newBasePrice = calculateCustomBasePrice(customWidth, customHeight, customThickness);
      setCustomBasePrice(newBasePrice);
    }
  }, [customWidth, customHeight, customThickness, selectedSize, onUpdateCustomSize]);

  const handleCustomSizeChange = (dimension: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    
    if (dimension === 'width') {
      setCustomWidth(numValue);
    } else if (dimension === 'height') {
      setCustomHeight(numValue);
    } else if (dimension === 'thickness') {
      setCustomThickness(numValue);
    }
    
    if (selectedSize?.id === 'custom') {
      const updatedWidth = dimension === 'width' ? numValue : customWidth;
      const updatedHeight = dimension === 'height' ? numValue : customHeight;
      const updatedThickness = dimension === 'thickness' ? numValue : customThickness;
      
      onUpdateCustomSize(updatedWidth, updatedHeight, updatedThickness);
      const newBasePrice = calculateCustomBasePrice(updatedWidth, updatedHeight, updatedThickness);
      setCustomBasePrice(newBasePrice);
    }
  };

  return (
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-amber-300">เลือกขนาด</CardTitle>
        <CardDescription className="text-amber-100">
          เลือกขนาดสำหรับหม้อน้ำของคุณ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedSize?.id || ""} 
          onValueChange={(value) => {
            const size = sizes.find(s => s.id === value);
            if (size) {
              onSelectSize(size);
              if (size.id === 'custom') {
                onUpdateCustomSize(customWidth, customHeight, customThickness);
                const newBasePrice = calculateCustomBasePrice(customWidth, customHeight, customThickness);
                setCustomBasePrice(newBasePrice);
              }
            }
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {sizes.filter(s => s.id !== 'custom').map((size) => (
              <div key={size.id} className="relative">
                <RadioGroupItem
                  value={size.id}
                  id={size.id}
                  className="sr-only"
                />
                <Label
                  htmlFor={size.id}
                  className={`radiator-option flex flex-col p-4 rounded-lg border-2 cursor-pointer ${
                    selectedSize?.id === size.id 
                      ? "border-amber-500 bg-amber-900/60" 
                      : "border-orange-700 bg-orange-950 hover:border-orange-500"
                  }`}
                >
                  <div className="w-full h-32 mb-3 rounded overflow-hidden bg-orange-800">
                    <img 
                      src={sizeImages[size.id as keyof typeof sizeImages] || '/placeholder.svg'} 
                      alt={`${size.name} radiator example`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-white">{size.name}</h3>
                  <div className="mt-2 space-y-1 text-amber-200">
                    <p>กว้าง: {size.width} นิ้ว</p>
                    <p>สูง: {size.height} นิ้ว</p>
                    <p>หนา: {size.thickness} นิ้ว</p>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-amber-300">
                    ราคาพื้นฐาน: ฿{(size.price * 30).toFixed(2)}
                  </p>
                </Label>
              </div>
            ))}
            
            {/* Custom Size Option */}
            <div className="relative">
              <RadioGroupItem
                value="custom"
                id="custom"
                className="sr-only"
              />
              <Label
                htmlFor="custom"
                className={`radiator-option flex flex-col p-4 rounded-lg border-2 cursor-pointer ${
                  selectedSize?.id === 'custom' 
                    ? "border-amber-500 bg-amber-900/60" 
                    : "border-orange-700 bg-orange-950 hover:border-orange-500"
                }`}
              >
                <div className="w-full h-32 mb-3 rounded overflow-hidden bg-orange-800">
                  <img 
                    src={sizeImages.custom}
                    alt="Custom size radiator example"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium text-white">ขนาดกำหนดเอง</h3>
                <p className="text-sm text-amber-200 mb-2">กำหนดขนาดของคุณเอง</p>
                
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <Label htmlFor="width" className="text-sm text-amber-200">กว้าง (นิ้ว)</Label>
                    <Input 
                      id="width"
                      type="number"
                      min="8"
                      max="48"
                      value={customWidth}
                      onChange={(e) => handleCustomSizeChange('width', e.target.value)}
                      disabled={selectedSize?.id !== 'custom'}
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
                      disabled={selectedSize?.id !== 'custom'}
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
                      disabled={selectedSize?.id !== 'custom'}
                      className="bg-orange-800 text-white border-orange-600"
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-amber-200">
                  ราคาพื้นฐาน: ฿{(customBasePrice * 30).toFixed(2)} (คำนวณตามขนาด)
                </p>
              </Label>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default SizeSelector;
