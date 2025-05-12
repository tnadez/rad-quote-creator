
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadiatorSize } from '@/lib/types';
import { calculateBasePrice } from '@/lib/radiator-data';

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
  const [width, setWidth] = useState<number>(24);
  const [height, setHeight] = useState<number>(16);
  const [thickness, setThickness] = useState<number>(2.5);
  const [basePrice, setBasePrice] = useState<number>(0);
  
  // Initialize with custom size
  useEffect(() => {
    const customSize = sizes.find(s => s.id === 'custom');
    if (customSize && !selectedSize) {
      const initialSize = {
        ...customSize,
        width,
        height,
        thickness,
        price: calculateBasePrice(width, height, thickness)
      };
      onSelectSize(initialSize);
    }
  }, []);

  // Update price when dimensions change
  useEffect(() => {
    const calculatedPrice = calculateBasePrice(width, height, thickness);
    setBasePrice(calculatedPrice);
    
    if (selectedSize?.id === 'custom') {
      onUpdateCustomSize(width, height, thickness);
    }
  }, [width, height, thickness]);

  // Handle dimension changes
  const handleSizeChange = (dimension: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    
    if (dimension === 'width') {
      setWidth(numValue);
    } else if (dimension === 'height') {
      setHeight(numValue);
    } else if (dimension === 'thickness') {
      setThickness(numValue);
    }
    
    if (selectedSize?.id === 'custom') {
      const updatedWidth = dimension === 'width' ? numValue : width;
      const updatedHeight = dimension === 'height' ? numValue : height;
      const updatedThickness = dimension === 'thickness' ? numValue : thickness;
      
      onUpdateCustomSize(updatedWidth, updatedHeight, updatedThickness);
    }
  };

  return (
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-amber-300">กำหนดขนาด</CardTitle>
        <CardDescription className="text-amber-100">
          กำหนดขนาดของหม้อน้ำตามความต้องการของคุณ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-orange-950 rounded-lg p-5 border border-orange-700">
          <div className="mb-4">
            <h3 className="text-xl font-medium text-white mb-2">ขนาดกำหนดเอง</h3>
            <p className="text-amber-200 mb-4">กำหนดขนาดของหม้อน้ำตามความต้องการเฉพาะของคุณ</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="width" className="text-sm text-amber-200">กว้าง (นิ้ว)</Label>
                <Input 
                  id="width"
                  type="number"
                  min="8"
                  max="48"
                  value={width}
                  onChange={(e) => handleSizeChange('width', e.target.value)}
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
                  value={height}
                  onChange={(e) => handleSizeChange('height', e.target.value)}
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
                  value={thickness}
                  onChange={(e) => handleSizeChange('thickness', e.target.value)}
                  className="bg-orange-800 text-white border-orange-600"
                />
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-amber-900/40 rounded border border-amber-600">
              <div className="flex justify-between items-center">
                <span className="text-amber-200">ราคาพื้นฐาน:</span>
                <span className="text-lg font-semibold text-amber-300">฿{basePrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-amber-200 mt-2">
                *ราคาพื้นฐานคำนวนตามขนาดและความหนาของหม้อน้ำ ไม่รวมค่าวัสดุ
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium text-white mb-2">ตัวอย่างขนาด</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-amber-200 text-sm">
            <div className="p-3 bg-orange-950/60 rounded border border-orange-800">
              <p className="font-medium text-white">เล็ก (มาตรฐาน)</p>
              <p>18" × 12" × 2"</p>
              <p className="mt-1 text-xs">เหมาะสำหรับรถยนต์ทั่วไป</p>
            </div>
            <div className="p-3 bg-orange-950/60 rounded border border-orange-800">
              <p className="font-medium text-white">กลาง (สมรรถนะสูง)</p>
              <p>24" × 16" × 2.5"</p>
              <p className="mt-1 text-xs">เหมาะสำหรับรถยนต์แต่ง</p>
            </div>
            <div className="p-3 bg-orange-950/60 rounded border border-orange-800">
              <p className="font-medium text-white">ใหญ่ (แข่งขัน)</p>
              <p>30" × 18" × 3"</p>
              <p className="mt-1 text-xs">เหมาะสำหรับรถแข่ง</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SizeSelector;
