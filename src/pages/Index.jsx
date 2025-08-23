import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MaterialSelector from '@/components/MaterialSelector';
import SizeSelector from '@/components/SizeSelector';
import QuoteSummary from '@/components/QuoteSummary';
import MarketPrices from '@/components/MarketPrices';
import CarBrandSelector from '@/components/CarBrandSelector';
import CarModelSelector from '@/components/CarModelSelector';
import RadiatorPresetInfo from '@/components/RadiatorPresetInfo';
import RadiatorRecommendation from '@/components/RadiatorRecommendation';
import RadiatorComparison from '@/components/RadiatorComparison';
import { materials, sizes, calculateTotalPrice, finTypePrices, finDensityPrices, capMaterialPrices } from '@/lib/radiator-data';
import { carBrands } from '@/lib/car-data';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Custom radiator options
  const [finType, setFinType] = useState("straight");
  const [finDensity, setFinDensity] = useState(14);
  const [capMaterial, setCapMaterial] = useState("plastic");
  
  // Car selection states
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showCarSelector, setShowCarSelector] = useState(true);

  // Handle custom size updates
  const handleCustomSizeChange = (width, height, thickness, newFinType, newFinDensity) => {
    if (selectedSize) {
      const updatedSize = {
        ...selectedSize,
        width,
        height,
        thickness,
        finType: newFinType,
        finDensity: newFinDensity
      };
      setSelectedSize(updatedSize);
      setFinType(newFinType);
      setFinDensity(newFinDensity);
    }
  };
  
  // Handle cap material updates
  const handleCapMaterialChange = (newCapMaterial) => {
    setCapMaterial(newCapMaterial);
  };

  // Handle preset application
  const handleApplyPreset = (size, recommendedMaterialId) => {
    setSelectedSize(size);
    
    const material = materials.find(m => m.id === recommendedMaterialId);
    if (material) {
      setSelectedMaterial(material);
    }
    
    // Set default fin type and density from the preset if available
    if (size.finType) {
      setFinType(size.finType);
    }
    
    if (size.finDensity) {
      setFinDensity(size.finDensity);
    }
    
    // Default cap material
    setCapMaterial('plastic');
    
    // Hide the car selector after applying the preset
    setShowCarSelector(false);
  };

  // Reset car selection
  const resetCarSelection = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setShowCarSelector(true);
  };
  
  // Return to car selection screen
  const handleReturnToCarSelection = () => {
    setShowCarSelector(true);
  };

  // Reset material and size when changing car brand
  useEffect(() => {
    setSelectedModel(null);
  }, [selectedBrand]);

  // Calculate total price whenever configuration changes
  useEffect(() => {
    const price = calculateTotalPrice(selectedMaterial, selectedSize, selectedFeatures, finType, finDensity, capMaterial);
    setTotalPrice(price);
  }, [selectedMaterial, selectedSize, selectedFeatures, finType, finDensity, capMaterial]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        {showCarSelector ? (
          <div className="space-y-6 mb-8">
            <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">เลือกรถยนต์ของคุณ</h1>
            
            {/* Add Market Prices at the top of the car selection screen */}
            <MarketPrices />
            
            <CarBrandSelector 
              brands={carBrands}
              selectedBrand={selectedBrand}
              onSelectBrand={setSelectedBrand}
            />
            
            {selectedBrand && (
              <CarModelSelector 
                selectedBrand={selectedBrand}
                selectedModel={selectedModel}
                onSelectModel={setSelectedModel}
              />
            )}
            
            {selectedModel && (
              <RadiatorPresetInfo 
                selectedModel={selectedModel}
                onApplyPreset={handleApplyPreset}
              />
            )}
            
            <div className="flex justify-center mt-4">
              <Button 
                onClick={() => setShowCarSelector(false)}
                className="bg-orange-800 text-amber-100 px-6 py-2 rounded-md hover:bg-orange-900 transition"
              >
                ข้ามไปยังการกำหนดค่าเอง
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button 
                onClick={handleReturnToCarSelection} 
                className="bg-orange-800 text-amber-100 px-6 py-2 rounded-md hover:bg-orange-900 transition mb-4"
              >
                กลับไปเลือกรถยนต์
              </Button>
              
              {selectedModel && (
                <div className="flex items-center justify-between px-4 py-2 bg-amber-900/50 border border-amber-700 rounded-lg">
                  <div>
                    <span className="text-amber-300 font-medium">กำลังกำหนดค่าหม้อน้ำสำหรับ:</span>
                    <span className="ml-2 text-white">{selectedBrand?.name} {selectedModel.name} ({selectedModel.year})</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Add Market Prices component at the top */}
                <MarketPrices />
                
                <MaterialSelector 
                  materials={materials}
                  selectedMaterial={selectedMaterial}
                  onSelectMaterial={setSelectedMaterial}
                />
                
                <SizeSelector 
                  sizes={sizes}
                  selectedSize={selectedSize}
                  onSelectSize={setSelectedSize}
                  onUpdateCustomSize={handleCustomSizeChange}
                  onUpdateCapMaterial={handleCapMaterialChange}
                  selectedMaterial={selectedMaterial}
                  capMaterial={capMaterial}
                />
                
                {/* Add the new recommendation component */}
                <RadiatorRecommendation 
                  finType={finType}
                  finDensity={finDensity}
                  capMaterial={capMaterial}
                />
                
                {/* Add the new comparison component after recommendations */}
                {selectedModel && (
                  <RadiatorComparison
                    selectedModel={selectedModel}
                    selectedMaterial={selectedMaterial}
                    selectedSize={selectedSize}
                    finType={finType}
                    finDensity={finDensity}
                    capMaterial={capMaterial}
                    totalPrice={totalPrice}
                  />
                )}
              </div>
              
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <QuoteSummary 
                    material={selectedMaterial}
                    size={selectedSize}
                    features={selectedFeatures}
                    totalPrice={totalPrice}
                    finType={finType}
                    finDensity={finDensity}
                    capMaterial={capMaterial}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="my-12">
          <Separator className="bg-orange-700" />
          <div className="mt-8 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 rounded-lg p-6 border border-amber-700 text-white">
            <h2 className="text-2xl font-bold text-amber-300 mb-4">ทำไมต้องเลือกหม้อน้ำแบบกำหนดเอง?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-amber-200">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">เพิ่มประสิทธิภาพสูงสุด</h3>
                <p>หม้อน้ำแบบกำหนดเองสามารถออกแบบเฉพาะสำหรับความต้องการในการระบายความร้อนของรถคุณ ช่วยให้มั่นใจได้ว่าจะมีประสิทธิภาพสูงสุดในทุกสภาพะ</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">พอดีกับรถของคุณ</h3>
                <p>ขนาดที่กำหนดเองช่วยให้หม้อน้ำของคุณพอดีกับห้องเครื่องอย่างสมบูรณ์แบบ หลีกเลี่ยงปัญหาการติดขัดกับชิ้นส่วนอื่นๆ</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">ประโยชน์ของวัสดุ</h3>
                <p>เลือกวัสดุตามความต้องการเฉพาะของคุณ ไม่ว่าจะเป็นทองแดงสำหรับการระบายความร้อนสูงสุด หรือทองเหลืองสำหรับความสวยงามแบบคลาสสิค</p>
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