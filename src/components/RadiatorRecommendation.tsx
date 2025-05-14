
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RadiatorRecommendationProps {
  finType: string;
  finDensity: number;
  capMaterial: string;
}

const RadiatorRecommendation = ({ finType, finDensity, capMaterial }: RadiatorRecommendationProps) => {
  // Recommendation logic based on selections
  const getFinTypeRecommendation = () => {
    if (finType === 'v-shaped') {
      return "ครีบแบบตัววีให้ประสิทธิภาพการระบายความร้อนสูงขึ้น 15-20% เมื่อเทียบกับครีบแบบตรง เหมาะสำหรับรถที่ต้องการระบายความร้อนสูงหรือรถที่ติดตั้งเทอร์โบ";
    } else {
      return "ครีบแบบตรงเป็นรูปแบบดั้งเดิม ใช้งานได้ดีกับรถทั่วไป ทนทาน และง่ายต่อการทำความสะอาด";
    }
  };

  const getFinDensityRecommendation = () => {
    if (finDensity <= 12) {
      return "ความถี่ครีบต่ำ (10-12 ครีบต่อนิ้ว) เหมาะสำหรับพื้นที่ที่มีฝุ่นมาก หรือการใช้งานออฟโรด เนื่องจากทำความสะอาดง่าย";
    } else if (finDensity <= 16) {
      return "ความถี่ครีบปานกลาง (14-16 ครีบต่อนิ้ว) เป็นตัวเลือกที่สมดุลระหว่างประสิทธิภาพและการบำรุงรักษา เหมาะสำหรับการใช้งานทั่วไป";
    } else {
      return "ความถี่ครีบสูง (18-20 ครีบต่อนิ้ว) ให้ประสิทธิภาพการระบายความร้อนสูงสุด เหมาะสำหรับรถสมรรถนะสูงหรือการใช้งานในสนาม";
    }
  };

  const getCapMaterialRecommendation = () => {
    if (capMaterial === 'plastic') {
      return "ฝาพลาสติกมีน้ำหนักเบา ราคาประหยัด เหมาะสำหรับการใช้งานทั่วไป แต่อาจมีอายุการใช้งานสั้นกว่าวัสดุอื่น";
    } else if (capMaterial === 'copper') {
      return "ฝาทองแดงมีคุณสมบัติในการนำความร้อนที่ดีเยี่ยม ทนทานต่อการกัดกร่อน เหมาะสำหรับรถที่ต้องการประสิทธิภาพการระบายความร้อนสูงสุด";
    } else {
      return "ฝาทองเหลืองมีความทนทานสูง ต้านทานการกัดกร่อนได้ดี และมีอายุการใช้งานยาวนาน เหมาะสำหรับรถคลาสสิคหรือรถที่ต้องการความคงทนสูง";
    }
  };

  const getCapPressureRecommendation = () => {
    if (capMaterial === 'plastic') {
      return "13-15 psi";
    } else if (capMaterial === 'copper') {
      return "16-18 psi";
    } else {
      return "15-17 psi";
    }
  };

  return (
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl mt-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-amber-300">คำแนะนำสำหรับการตั้งค่าของคุณ</CardTitle>
        <CardDescription className="text-amber-100">
          ข้อมูลเพิ่มเติมเกี่ยวกับการเลือกของคุณ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 bg-orange-900/50 rounded border border-orange-600">
            <h3 className="text-lg font-semibold text-amber-300 mb-1">รูปแบบครีบระบายความร้อน: {finType === 'straight' ? 'ครีบแบบตรง' : 'ครีบแบบตัววี'}</h3>
            <p className="text-amber-100">{getFinTypeRecommendation()}</p>
          </div>
          
          <div className="p-3 bg-orange-900/50 rounded border border-orange-600">
            <h3 className="text-lg font-semibold text-amber-300 mb-1">ความถี่ของครีบ: {finDensity} ครีบต่อนิ้ว</h3>
            <p className="text-amber-100">{getFinDensityRecommendation()}</p>
          </div>
          
          <div className="p-3 bg-orange-900/50 rounded border border-orange-600">
            <h3 className="text-lg font-semibold text-amber-300 mb-1">วัสดุฝาหม้อน้ำ: {
              capMaterial === 'plastic' ? 'พลาสติก' : 
              capMaterial === 'copper' ? 'ทองแดง' : 'ทองเหลือง'
            }</h3>
            <p className="text-amber-100">{getCapMaterialRecommendation()}</p>
            <p className="text-amber-200 mt-2">แรงดันที่แนะนำ: {getCapPressureRecommendation()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RadiatorRecommendation;
