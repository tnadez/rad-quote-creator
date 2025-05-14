
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CarModel, CarBrand } from '@/lib/types';
import { getModelsByBrandId } from '@/lib/car-data';

interface CarModelSelectorProps {
  selectedBrand: CarBrand | null;
  selectedModel: CarModel | null;
  onSelectModel: (model: CarModel) => void;
}

const CarModelSelector = ({ selectedBrand, selectedModel, onSelectModel }: CarModelSelectorProps) => {
  if (!selectedBrand) return null;
  
  const models = getModelsByBrandId(selectedBrand.id);
  
  if (models.length === 0) return (
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-amber-300">เลือกรุ่นรถยนต์</CardTitle>
        <CardDescription className="text-amber-100">
          ไม่พบรุ่นรถยนต์สำหรับยี่ห้อที่เลือก
        </CardDescription>
      </CardHeader>
    </Card>
  );

  return (
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-amber-300">เลือกรุ่นรถยนต์</CardTitle>
        <CardDescription className="text-amber-100">
          เลือกรุ่นรถยนต์เพื่อดูข้อมูลหม้อน้ำที่เหมาะสม
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedModel?.id || ""} 
          onValueChange={(value) => {
            const model = models.find(m => m.id === value);
            if (model) onSelectModel(model);
          }}
        >
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">
              {models.map((model) => (
                <div key={model.id} className="relative">
                  <RadioGroupItem
                    value={model.id}
                    id={`model-${model.id}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`model-${model.id}`}
                    className={`model-option flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer ${
                      selectedModel?.id === model.id 
                        ? "border-amber-500 bg-amber-900/60" 
                        : "border-orange-700 bg-orange-950 hover:border-orange-500"
                    }`}
                  >
                    <div className="w-full h-36 mb-3 rounded overflow-hidden bg-orange-800 flex items-center justify-center">
                      <img 
                        src={model.image} 
                        alt={model.name} 
                        className="object-cover w-full h-full" 
                      />
                    </div>
                    <h3 className="text-lg font-medium text-white">{model.name}</h3>
                    <p className="text-sm text-amber-200">{model.year}</p>
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

export default CarModelSelector;
