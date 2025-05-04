
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
    <Card className="w-full border-2 border-slate-700 bg-slate-800 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-400">Additional Features</CardTitle>
        <CardDescription className="text-gray-300">
          Customize your radiator with premium add-ons
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`radiator-option flex items-start p-4 rounded-lg border-2 cursor-pointer ${
                isSelected(feature.id) 
                  ? "border-blue-500 bg-blue-900/20" 
                  : "border-slate-700 bg-slate-900 hover:border-slate-500"
              }`}
              onClick={() => onToggleFeature(feature)}
            >
              <div className="flex items-center h-5 mr-3 mt-1">
                <Checkbox 
                  id={feature.id} 
                  checked={isSelected(feature.id)}
                  onCheckedChange={() => onToggleFeature(feature)}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:text-primary-foreground"
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
                  <span className="text-lg font-semibold text-blue-400">
                    +${feature.price.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesSelector;
