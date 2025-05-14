
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Material, RadiatorSize, AdditionalFeature } from "@/lib/types";

interface QuoteSummaryProps {
  material: Material | null;
  size: RadiatorSize | null;
  features: AdditionalFeature[];
  totalPrice: number;
  finType?: string;
  finDensity?: number;
  capMaterial?: string;
}

const QuoteSummary = ({ 
  material, 
  size, 
  features, 
  totalPrice,
  finType = "straight",
  finDensity = 14,
  capMaterial = "plastic"
}: QuoteSummaryProps) => {
  return (
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl">
      <CardHeader className="border-b border-amber-600 pb-3">
        <CardTitle className="text-2xl font-bold text-amber-300">สรุปใบเสนอราคา</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="p-3 rounded bg-orange-950 border border-orange-700">
            <h3 className="text-lg font-medium text-amber-300 mb-1">วัสดุที่เลือก</h3>
            {material ? (
              <p className="text-amber-100">{material.name}</p>
            ) : (
              <p className="text-orange-400 italic">ยังไม่ได้เลือกวัสดุ</p>
            )}
          </div>
          
          <div className="p-3 rounded bg-orange-950 border border-orange-700">
            <h3 className="text-lg font-medium text-amber-300 mb-1">ขนาดที่เลือก</h3>
            {size ? (
              <div className="text-amber-100">
                <p>{size.width}" × {size.height}" × {size.thickness}"</p>
                <p className="text-sm mt-1">พื้นที่: {size.width * size.height} ตารางนิ้ว</p>
              </div>
            ) : (
              <p className="text-orange-400 italic">ยังไม่ได้เลือกขนาด</p>
            )}
          </div>

          <div className="p-3 rounded bg-orange-950 border border-orange-700">
            <h3 className="text-lg font-medium text-amber-300 mb-1">รายละเอียดเพิ่มเติม</h3>
            <div className="text-amber-100 text-sm space-y-1">
              <p>ครีบระบายความร้อน: {finType === 'straight' ? 'ครีบแบบตรง' : 'ครีบแบบตัววี'}</p>
              <p>ความถี่ของครีบ: {finDensity} ครีบต่อนิ้ว</p>
              <p>วัสดุฝาหม้อน้ำ: {
                capMaterial === 'plastic' ? 'พลาสติก' : 
                capMaterial === 'copper' ? 'ทองแดง' : 'ทองเหลือง'
              }</p>
            </div>
          </div>
          
          {features && features.length > 0 && (
            <div className="p-3 rounded bg-orange-950 border border-orange-700">
              <h3 className="text-lg font-medium text-amber-300 mb-1">อุปกรณ์เสริม</h3>
              <ul className="list-disc list-inside text-amber-100">
                {features.map((feature) => (
                  <li key={feature.id}>{feature.name}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-4 p-4 bg-amber-900 rounded-lg border border-amber-600">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-amber-200">ราคารวม:</span>
              <span className="text-2xl font-bold text-amber-100">฿{(totalPrice * 30).toFixed(2)}</span>
            </div>
          </div>
          
          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white mt-4">
            ขอใบเสนอราคา
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteSummary;
