
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Material, RadiatorSize, CarModel, RadiatorPreset } from '@/lib/types';
import { Separator } from "@/components/ui/separator";
import { getPresetByModelId } from '@/lib/car-data';
import { materials } from '@/lib/radiator-data';
import { GitCompare } from "lucide-react";

interface RadiatorComparisonProps {
  selectedModel: CarModel | null;
  selectedMaterial: Material | null;
  selectedSize: RadiatorSize | null;
  finType: string;
  finDensity: number;
  capMaterial: string;
  totalPrice: number;
}

const RadiatorComparison = ({
  selectedModel,
  selectedMaterial,
  selectedSize,
  finType,
  finDensity,
  capMaterial,
  totalPrice
}: RadiatorComparisonProps) => {
  const [showComparison, setShowComparison] = useState(false);
  
  // If we don't have a selected model, or specs aren't complete, don't show the comparison button
  if (!selectedModel || !selectedMaterial || !selectedSize) {
    return null;
  }
  
  const preset = getPresetByModelId(selectedModel.id);
  if (!preset) {
    return null;
  }
  
  // Find the recommended material
  const recommendedMaterial = materials.find(m => m.id === preset.recommendedMaterial);
  if (!recommendedMaterial) {
    return null;
  }
  
  // Calculate the preset radiator's estimated price (this would typically come from your pricing model)
  // For this example, we'll use a simple approximation based on dimensions and material
  const presetArea = preset.size.width * preset.size.height;
  const recommendedMaterialCost = presetArea * recommendedMaterial.pricePerSquareInch;
  const presetBasePrice = 100 + (presetArea * 0.15) + recommendedMaterialCost;
  const presetTotalPrice = Math.round(presetBasePrice * 100) / 100;
  
  // Calculate price difference and percentage
  const priceDifference = totalPrice - presetTotalPrice;
  const percentageDifference = (priceDifference / presetTotalPrice) * 100;
  const isCustomMoreExpensive = priceDifference > 0;
  
  return (
    <div className="w-full">
      <Button 
        variant="outline" 
        onClick={() => setShowComparison(!showComparison)} 
        className="w-full border-2 border-amber-700 bg-amber-800/30 text-amber-100 hover:bg-amber-800/50 mb-4"
      >
        <GitCompare className="mr-2" size={18} />
        {showComparison ? "ซ่อนการเปรียบเทียบ" : "เปรียบเทียบกับรุ่นแนะนำ"}
      </Button>
      
      {showComparison && (
        <Card className="w-full border-2 border-amber-700 bg-gradient-to-br from-red-950 via-orange-950 to-amber-950 text-white shadow-xl">
          <CardHeader className="border-b border-amber-800 pb-3">
            <CardTitle className="text-xl font-bold text-amber-300">เปรียบเทียบคุณสมบัติ</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {/* Dimension comparison */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-amber-300 mb-2">ขนาด</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded bg-orange-950/70 border border-orange-800">
                  <h4 className="font-medium text-amber-200 text-sm mb-2">รุ่นแนะนำ</h4>
                  <div className="text-amber-100 text-sm">
                    <p>{preset.size.width}" × {preset.size.height}" × {preset.size.thickness}"</p>
                    <p className="mt-1">พื้นที่: {preset.size.width * preset.size.height} ตร.นิ้ว</p>
                  </div>
                </div>
                <div className="p-3 rounded bg-orange-900/70 border border-orange-700">
                  <h4 className="font-medium text-amber-200 text-sm mb-2">หม้อน้ำกำหนดเอง</h4>
                  <div className="text-amber-100 text-sm">
                    <p>{selectedSize.width}" × {selectedSize.height}" × {selectedSize.thickness}"</p>
                    <p className="mt-1">พื้นที่: {selectedSize.width * selectedSize.height} ตร.นิ้ว</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Material comparison */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-amber-300 mb-2">วัสดุ</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded bg-orange-950/70 border border-orange-800">
                  <h4 className="font-medium text-amber-200 text-sm mb-2">รุ่นแนะนำ</h4>
                  <div className="text-amber-100 text-sm">
                    <p>{recommendedMaterial.name}</p>
                  </div>
                </div>
                <div className="p-3 rounded bg-orange-900/70 border border-orange-700">
                  <h4 className="font-medium text-amber-200 text-sm mb-2">หม้อน้ำกำหนดเอง</h4>
                  <div className="text-amber-100 text-sm">
                    <p>{selectedMaterial.name}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fin details comparison */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-amber-300 mb-2">รายละเอียดครีบ</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded bg-orange-950/70 border border-orange-800">
                  <h4 className="font-medium text-amber-200 text-sm mb-2">รุ่นแนะนำ</h4>
                  <div className="text-amber-100 text-sm">
                    <p>ครีบระบายความร้อน: {preset.finType}</p>
                    <p>ความถี่ของครีบ: {preset.finDensity} ครีบต่อนิ้ว</p>
                  </div>
                </div>
                <div className="p-3 rounded bg-orange-900/70 border border-orange-700">
                  <h4 className="font-medium text-amber-200 text-sm mb-2">หม้อน้ำกำหนดเอง</h4>
                  <div className="text-amber-100 text-sm">
                    <p>ครีบระบายความร้อน: {finType === 'straight' ? 'ครีบแบบตรง' : 'ครีบแบบตัววี'}</p>
                    <p>ความถี่ของครีบ: {finDensity} ครีบต่อนิ้ว</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cap material comparison */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-amber-300 mb-2">ฝาหม้อน้ำ</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded bg-orange-950/70 border border-orange-800">
                  <h4 className="font-medium text-amber-200 text-sm mb-2">รุ่นแนะนำ</h4>
                  <div className="text-amber-100 text-sm">
                    <p>{preset.capType}</p>
                  </div>
                </div>
                <div className="p-3 rounded bg-orange-900/70 border border-orange-700">
                  <h4 className="font-medium text-amber-200 text-sm mb-2">หม้อน้ำกำหนดเอง</h4>
                  <div className="text-amber-100 text-sm">
                    <p>{
                      capMaterial === 'plastic' ? 'พลาสติก' : 
                      capMaterial === 'copper' ? 'ทองแดง' : 'ทองเหลือง'
                    }</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Price comparison */}
            <div className="mb-2">
              <h3 className="text-lg font-medium text-amber-300 mb-2">ราคา</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded bg-orange-950/70 border border-orange-800">
                  <h4 className="font-medium text-amber-200 text-sm mb-2">รุ่นแนะนำ</h4>
                  <div className="text-2xl font-bold text-amber-100">
                    ฿{(presetTotalPrice * 30).toFixed(2)}
                  </div>
                </div>
                <div className="p-3 rounded bg-orange-900/70 border border-orange-700">
                  <h4 className="font-medium text-amber-200 text-sm mb-2">หม้อน้ำกำหนดเอง</h4>
                  <div className="text-2xl font-bold text-amber-100">
                    ฿{(totalPrice * 30).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Price difference */}
            <div className="mt-4 p-3 rounded bg-gradient-to-r from-orange-950 to-amber-950 border border-amber-700">
              <h3 className="text-lg font-medium text-amber-300 mb-2">ความแตกต่าง</h3>
              <div className="flex justify-between items-center">
                <span className="text-amber-100">ราคาต่าง:</span>
                <span className={`text-xl font-bold ${isCustomMoreExpensive ? 'text-red-300' : 'text-green-300'}`}>
                  {isCustomMoreExpensive ? '+' : '-'}฿{Math.abs(priceDifference * 30).toFixed(2)} 
                  ({Math.abs(percentageDifference).toFixed(1)}%)
                </span>
              </div>
              
              <div className="mt-3 p-3 bg-orange-950/70 border border-orange-800 rounded">
                <p className="text-sm text-amber-100">
                  {isCustomMoreExpensive 
                    ? "หม้อน้ำกำหนดเองของคุณมีคุณสมบัติเพิ่มเติมที่ปรับแต่งตามความต้องการเฉพาะของคุณ ให้ประสิทธิภาพที่เหนือกว่า"
                    : "คุณสามารถประหยัดได้โดยใช้หม้อน้ำรุ่นแนะนำที่เหมาะสำหรับรถยนต์ของคุณ"
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RadiatorComparison;
