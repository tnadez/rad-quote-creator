
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MaterialSelector from '@/components/MaterialSelector';
import SizeSelector from '@/components/SizeSelector';
import FeaturesSelector from '@/components/FeaturesSelector';
import QuoteSummary from '@/components/QuoteSummary';
import { materials, sizes, additionalFeatures, calculateTotalPrice } from '@/lib/radiator-data';
import { Material, RadiatorSize, AdditionalFeature } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedSize, setSelectedSize] = useState<RadiatorSize | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<AdditionalFeature[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Handle custom size updates
  const handleCustomSizeUpdate = (width: number, height: number, thickness: number) => {
    if (selectedSize && selectedSize.id === 'custom') {
      const updatedSize: RadiatorSize = {
        ...selectedSize,
        width,
        height,
        thickness
      };
      setSelectedSize(updatedSize);
    }
  };

  // Toggle a feature on/off
  const handleToggleFeature = (feature: AdditionalFeature) => {
    setSelectedFeatures(prev => {
      const isSelected = prev.some(f => f.id === feature.id);
      if (isSelected) {
        return prev.filter(f => f.id !== feature.id);
      } else {
        return [...prev, feature];
      }
    });
  };

  // Calculate total price whenever configuration changes
  useEffect(() => {
    const price = calculateTotalPrice(selectedMaterial, selectedSize, selectedFeatures);
    setTotalPrice(price);
  }, [selectedMaterial, selectedSize, selectedFeatures]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MaterialSelector 
              materials={materials}
              selectedMaterial={selectedMaterial}
              onSelectMaterial={setSelectedMaterial}
            />
            
            <SizeSelector 
              sizes={sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              onUpdateCustomSize={handleCustomSizeUpdate}
            />
            
            <FeaturesSelector 
              features={additionalFeatures}
              selectedFeatures={selectedFeatures}
              onToggleFeature={handleToggleFeature}
            />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <QuoteSummary 
                material={selectedMaterial}
                size={selectedSize}
                features={selectedFeatures}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
        
        <div className="my-12">
          <Separator className="bg-slate-700/50" />
          <div className="mt-8 bg-slate-800 rounded-lg p-6 border border-slate-700 text-white">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Why Choose a Custom Radiator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Performance Optimization</h3>
                <p>A custom radiator can be designed specifically for your vehicle's cooling needs, ensuring optimal performance in all conditions.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Perfect Fitment</h3>
                <p>Custom dimensions mean your radiator will fit perfectly in your engine bay, avoiding clearance issues with other components.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Material Benefits</h3>
                <p>Choose materials based on your specific needs - whether it's lightweight aluminum for racing or copper for maximum heat dissipation.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
