
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MaterialSelector from '@/components/MaterialSelector';
import SizeSelector from '@/components/SizeSelector';
import QuoteSummary from '@/components/QuoteSummary';
import CarBrandSelector from '@/components/CarBrandSelector';
import CarModelSelector from '@/components/CarModelSelector';
import RadiatorPresetInfo from '@/components/RadiatorPresetInfo';
import { materials, sizes, calculateTotalPrice } from '@/lib/radiator-data';
import { carBrands } from '@/lib/car-data';
import { Material, RadiatorSize, CarBrand, CarModel } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedSize, setSelectedSize] = useState<RadiatorSize | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Car selection states
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [showCarSelector, setShowCarSelector] = useState(true);

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

  // Handle preset application
  const handleApplyPreset = (size: RadiatorSize, recommendedMaterialId: string) => {
    setSelectedSize(size);
    
    const material = materials.find(m => m.id === recommendedMaterialId);
    if (material) {
      setSelectedMaterial(material);
    }
    
    // Hide the car selector after applying the preset
    setShowCarSelector(false);
  };

  // Reset car selection
  const resetCarSelection = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setShowCarSelector(true);
  };

  // Reset material and size when changing car brand
  useEffect(() => {
    setSelectedModel(null);
  }, [selectedBrand]);

  // Calculate total price whenever configuration changes
  useEffect(() => {
    const price = calculateTotalPrice(selectedMaterial, selectedSize, selectedFeatures);
    setTotalPrice(price);
  }, [selectedMaterial, selectedSize, selectedFeatures]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        {showCarSelector ? (
          <div className="space-y-6 mb-8">
            <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">เลือกรถยนต์ของคุณ</h1>
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
              <button 
                onClick={() => setShowCarSelector(false)}
                className="bg-orange-800 text-amber-100 px-6 py-2 rounded-md hover:bg-orange-900 transition"
              >
                ข้ามไปยังการกำหนดค่าเอง
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {selectedModel && (
                <div className="flex items-center justify-between px-4 py-2 bg-amber-900/50 border border-amber-700 rounded-lg mb-4">
                  <div>
                    <span className="text-amber-300 font-medium">กำลังกำหนดค่าหม้อน้ำสำหรับ:</span>
                    <span className="ml-2 text-white">{selectedBrand?.name} {selectedModel.name} ({selectedModel.year})</span>
                  </div>
                  <button 
                    onClick={resetCarSelection} 
                    className="text-amber-300 hover:text-amber-500 text-sm underline"
                  >
                    เปลี่ยนรถยนต์
                  </button>
                </div>
              )}
              
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
        )}
        
        <div className="my-12">
          <Separator className="bg-orange-700" />
          <div className="mt-8 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 rounded-lg p-6 border border-amber-700 text-white">
            <h2 className="text-2xl font-bold text-amber-300 mb-4">ทำไมต้องเลือกหม้อน้ำแบบกำหนดเอง?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-amber-200">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">เพิ่มประสิทธิภาพสูงสุด</h3>
                <p>หม้อน้ำแบบกำหนดเองสามารถออกแบบเฉพาะสำหรับความต้องการในการระบายความร้อนของรถคุณ ช่วยให้มั่นใจได้ว่าจะมีประสิทธิภาพสูงสุดในทุกสภาวะ</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">พอดีกับรถของคุณ</h3>
                <p>ขนาดที่กำหนดเองช่วยให้หม้อน้ำของคุณพอดีกับห้องเครื่องอย่างสมบูรณ์แบบ หลีกเลี่ยงปัญหาการติดขัดกับชิ้นส่วนอื่นๆ</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">ประโยชน์ของวัสดุ</h3>
                <p>เลือกวัสดุตามความต้องการเฉพาะของคุณ ไม่ว่าจะเป็นทองแดงสำหรับการระบายความร้อนสูงสุด หรือทองเหลืองสำหรับความสวยงามแบบคลาสสิก</p>
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
