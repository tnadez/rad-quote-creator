
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

  useEffect(() => {
    if (selectedSize?.id === 'custom') {
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
    
    if (selectedSize?.id === 'custom') {
      const updatedWidth = dimension === 'width' ? numValue : customWidth;
      const updatedHeight = dimension === 'height' ? numValue : customHeight;
      const updatedThickness = dimension === 'thickness' ? numValue : customThickness;
      
      onUpdateCustomSize(updatedWidth, updatedHeight, updatedThickness);
    }
  };

  return (
    <Card className="w-full border-2 border-slate-700 bg-slate-800 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-400">Select Size</CardTitle>
        <CardDescription className="text-gray-300">
          Choose the dimensions for your radiator
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
                      ? "border-blue-500 bg-blue-900/20" 
                      : "border-slate-700 bg-slate-900 hover:border-slate-500"
                  }`}
                >
                  <h3 className="text-xl font-medium text-white">{size.name}</h3>
                  <div className="mt-2 space-y-1 text-gray-300">
                    <p>Width: {size.width} inches</p>
                    <p>Height: {size.height} inches</p>
                    <p>Thickness: {size.thickness} inches</p>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-blue-400">
                    Base Price: ${size.price.toFixed(2)}
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
                    ? "border-blue-500 bg-blue-900/20" 
                    : "border-slate-700 bg-slate-900 hover:border-slate-500"
                }`}
              >
                <h3 className="text-xl font-medium text-white">Custom Size</h3>
                <p className="text-sm text-gray-300 mb-2">Define your own dimensions</p>
                
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <Label htmlFor="width" className="text-sm text-gray-300">Width (in)</Label>
                    <Input 
                      id="width"
                      type="number"
                      min="8"
                      max="48"
                      value={customWidth}
                      onChange={(e) => handleCustomSizeChange('width', e.target.value)}
                      disabled={selectedSize?.id !== 'custom'}
                      className="bg-slate-700 text-white border-slate-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height" className="text-sm text-gray-300">Height (in)</Label>
                    <Input 
                      id="height"
                      type="number"
                      min="8"
                      max="36"
                      value={customHeight}
                      onChange={(e) => handleCustomSizeChange('height', e.target.value)}
                      disabled={selectedSize?.id !== 'custom'}
                      className="bg-slate-700 text-white border-slate-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="thickness" className="text-sm text-gray-300">Thickness (in)</Label>
                    <Input 
                      id="thickness"
                      type="number"
                      min="1"
                      max="5"
                      step="0.5"
                      value={customThickness}
                      onChange={(e) => handleCustomSizeChange('thickness', e.target.value)}
                      disabled={selectedSize?.id !== 'custom'}
                      className="bg-slate-700 text-white border-slate-600"
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-300">
                  Custom sizing includes a $150 base fee + material costs
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
