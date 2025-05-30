
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
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-amber-300">คุณสมบัติเพิ่มเติม</CardTitle>
        <CardDescription className="text-amber-100">
          ปรับแต่งหม้อน้ำของคุณด้วยอุปกรณ์เสริมระดับพรีเมียม
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`radiator-option flex flex-col p-4 rounded-lg border-2 cursor-pointer ${
                isSelected(feature.id) 
                  ? "border-amber-500 bg-amber-900/60" 
                  : "border-orange-700 bg-orange-950 hover:border-orange-500"
              }`}
              onClick={() => onToggleFeature(feature)}
            >
              <div className="flex items-start mb-3">
                <div className="flex items-center h-5 mr-3 mt-1">
                  <Checkbox 
                    id={feature.id} 
                    checked={isSelected(feature.id)}
                    onCheckedChange={() => onToggleFeature(feature)}
                    className="data-[state=checked]:bg-amber-500 data-[state=checked]:text-primary-foreground"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <Label 
                      htmlFor={feature.id} 
                      className="font-medium text-white cursor-pointer"
                    >
                      {feature.name}
                    </Label>
                    <span className="text-lg font-semibold text-amber-300">
                      +฿{(feature.price * 30).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="w-full h-32 mb-3 rounded overflow-hidden bg-orange-800">
                <img 
                  src={feature.image} 
                  alt={feature.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <p className="mt-1 text-sm text-amber-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesSelector;
