
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadiatorSize } from '@/lib/types';

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

  // Auto-select the custom size on component mount
  useEffect(() => {
    if (sizes.length > 0 && !selectedSize) {
      const customSize = sizes[0];
      onSelectSize({
        ...customSize,
        width: customWidth,
        height: customHeight,
        thickness: customThickness
      });
    }
  }, [sizes, selectedSize, onSelectSize, customWidth, customHeight, customThickness]);

  // Update custom size when dimensions change
  useEffect(() => {
    if (selectedSize) {
      onUpdateCustomSize(customWidth, customHeight, customThickness);
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
    
    if (selectedSize) {
      const updatedWidth = dimension === 'width' ? numValue : customWidth;
      const updatedHeight = dimension === 'height' ? numValue : customHeight;
      const updatedThickness = dimension === 'thickness' ? numValue : customThickness;
      
      onUpdateCustomSize(updatedWidth, updatedHeight, updatedThickness);
    }
  };

  return (
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-amber-300">กำหนดขนาด</CardTitle>
        <CardDescription className="text-amber-100">
          กำหนดขนาดหม้อน้ำตามความต้องการของคุณ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="relative">
            <div className="w-full p-4 rounded-lg border-2 border-amber-500 bg-amber-900/60">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="w-full md:w-1/3 h-48 rounded overflow-hidden bg-orange-800 mb-4 md:mb-0">
                  <img 
                    src="/images/custom-radiator.jpg"
                    alt="Custom size radiator example"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-full md:w-2/3 space-y-4">
                  <h3 className="text-xl font-medium text-white">ขนาดกำหนดเอง</h3>
                  <p className="text-sm text-amber-200 mb-2">กำหนดขนาดของคุณเพื่อให้ได้หม้อน้ำที่เหมาะสำหรับรถของคุณโดยเฉพาะ</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  
                  <p className="text-sm text-amber-200">
                    ราคาพื้นฐานคำนวณจากขนาดของหม้อน้ำ ระบบจะคำนวณราคาให้โดยอัตโนมัติ
                  </p>
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
