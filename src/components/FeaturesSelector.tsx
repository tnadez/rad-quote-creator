
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AdditionalFeature } from '@/lib/types';

interface FeaturesSelectorProps {
  features: AdditionalFeature[];
  selectedFeatures: AdditionalFeature[];
  onToggleFeature: (feature: AdditionalFeature) => void;
}

const FeaturesSelector = ({ features, selectedFeatures, onToggleFeature }: FeaturesSelectorProps) => {
  const isSelected = (featureId: string) => {
    return selectedFeatures.some(f => f.id === featureId);
  };

  return (
    <Card className="w-full border border-gray-200 bg-white text-gray-800 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-gray-700">คุณสมบัติเพิ่มเติม</CardTitle>
        <CardDescription className="text-gray-500">
          ปรับแต่งหม้อน้ำของคุณด้วยอุปกรณ์เสริมระดับพรีเมียม
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`radiator-option flex items-start p-4 rounded-md border cursor-pointer ${
                isSelected(feature.id) 
                  ? "border-amber-300 bg-amber-50" 
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
              onClick={() => onToggleFeature(feature)}
            >
              <div className="flex items-center h-5 mr-3 mt-1">
                <Checkbox 
                  id={feature.id} 
                  checked={isSelected(feature.id)}
                  onCheckedChange={() => onToggleFeature(feature)}
                  className="data-[state=checked]:bg-amber-400 data-[state=checked]:text-white"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <Label 
                    htmlFor={feature.id} 
                    className="font-medium text-gray-700 cursor-pointer"
                  >
                    {feature.name}
                  </Label>
                  <span className="text-lg font-medium text-amber-600">
                    +฿{(feature.price * 30).toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesSelector;
