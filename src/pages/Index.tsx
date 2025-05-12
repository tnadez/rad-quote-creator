
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MaterialSelector from '@/components/MaterialSelector';
import SizeSelector from '@/components/SizeSelector';
import QuoteSummary from '@/components/QuoteSummary';
import { materials, sizes, calculateTotalPrice } from '@/lib/radiator-data';
import { Material, RadiatorSize } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedSize, setSelectedSize] = useState<RadiatorSize | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Handle custom size updates
  const handleCustomSizeUpdate = (width: number, height: number, thickness: number) => {
    if (selectedSize) {
      const updatedSize: RadiatorSize = {
        ...selectedSize,
        width,
        height,
        thickness
      };
      setSelectedSize(updatedSize);
    }
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
