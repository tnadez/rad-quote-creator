
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AdditionalFeature, Material, RadiatorSize } from '@/lib/types';
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { calculateCustomBasePrice } from "@/lib/radiator-data";

interface QuoteSummaryProps {
  material: Material | null;
  size: RadiatorSize | null;
  features: AdditionalFeature[];
  totalPrice: number;
}

const QuoteSummary = ({ material, size, features, totalPrice }: QuoteSummaryProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const handleRequestQuote = () => {
    // In a real application, we would send this data to the server
    toast.success("ส่งคำขอใบเสนอราคาเรียบร้อย!", {
      description: "เราจะติดต่อกลับเร็วๆ นี้พร้อมใบเสนอราคาหม้อน้ำแบบกำหนดเองของคุณ"
    });
    setIsDialogOpen(false);
    
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };
  
  const canRequestQuote = material && size;
  
  // Calculate custom base price for display
  const getCustomBasePrice = () => {
    if (size) {
      return calculateCustomBasePrice(size.width, size.height, size.thickness);
    }
    return 0;
  };
  
  // Calculate material cost for display
  const getMaterialCost = () => {
    if (material && size) {
      const area = size.width * size.height;
      return area * material.pricePerSquareInch;
    }
    return 0;
  };
  
  return (
    <>
      <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl animate-fadeIn">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-amber-300">สรุปใบเสนอราคาของคุณ</CardTitle>
          <CardDescription className="text-amber-100">
            ตรวจสอบการกำหนดค่าหม้อน้ำแบบกำหนดเองของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">วัสดุที่เลือก</h3>
            {material ? (
              <div className="bg-orange-950 rounded-lg p-3 border border-orange-700">
                <div className="flex justify-between">
                  <p className="font-medium">{material.name}</p>
                  <p className="text-amber-300">฿{(material.pricePerSquareInch * 30).toFixed(2)}/ตร.นิ้ว</p>
                </div>
                
                {size && (
                  <p className="text-amber-200 mt-2">
                    ค่าวัสดุรวม: ฿{(getMaterialCost() * 30).toFixed(2)}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-amber-400/70">ยังไม่ได้เลือกวัสดุ</p>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">ขนาดที่เลือก</h3>
            {size ? (
              <div className="bg-orange-950 rounded-lg p-3 border border-orange-700">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">{size.name}</p>
                </div>
                <div className="text-sm text-amber-200 space-y-1">
                  {size.width > 0 && <p>กว้าง: {size.width} นิ้ว</p>}
                  {size.height > 0 && <p>สูง: {size.height} นิ้ว</p>}
                  {size.thickness > 0 && <p>หนา: {size.thickness} นิ้ว</p>}
                  <p className="mt-2 text-amber-300">
                    ราคาพื้นฐาน: ฿{(getCustomBasePrice() * 30).toFixed(2)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-amber-400/70">ยังไม่ได้เลือกขนาด</p>
            )}
          </div>
          
          <Separator className="my-4 bg-orange-700" />
          
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">ราคาประมาณ</h3>
            <p className="text-2xl font-bold text-amber-300">฿{(totalPrice * 30).toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            disabled={!canRequestQuote}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            size="lg"
          >
            ขอใบเสนอราคา
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white border-amber-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-300">ขอใบเสนอราคาของคุณ</DialogTitle>
            <DialogDescription className="text-amber-100">
              กรอกรายละเอียดของคุณและเราจะส่งใบเสนอราคาอย่างเป็นทางการสำหรับหม้อน้ำแบบกำหนดเองของคุณ
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">ชื่อ-นามสกุล</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="นายสมชาย ใจดี"
                className="bg-orange-900 border-orange-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">อีเมล</Label>
              <Input 
                id="email" 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="somchai@example.com"
                className="bg-orange-900 border-orange-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">โทรศัพท์ (ไม่บังคับ)</Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="081-234-5678"
                className="bg-orange-900 border-orange-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">ความคิดเห็นเพิ่มเติม (ไม่บังคับ)</Label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="ความต้องการเฉพาะหรือคำถาม..."
                className="bg-orange-900 border-orange-700 min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={handleRequestQuote}
              disabled={!name || !email}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            >
              ส่งคำขอใบเสนอราคา
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuoteSummary;
