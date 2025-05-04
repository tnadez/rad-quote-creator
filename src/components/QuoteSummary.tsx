
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
  
  return (
    <>
      <Card className="w-full border-2 border-slate-700 bg-slate-800 text-white shadow-xl animate-fadeIn">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-400">สรุปใบเสนอราคาของคุณ</CardTitle>
          <CardDescription className="text-gray-300">
            ตรวจสอบการกำหนดค่าหม้อน้ำแบบกำหนดเองของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">วัสดุที่เลือก</h3>
            {material ? (
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                <div className="flex justify-between">
                  <p className="font-medium">{material.name}</p>
                  <p className="text-blue-400">฿{(material.pricePerSquareInch * 30).toFixed(2)}/ตร.นิ้ว</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">ยังไม่ได้เลือกวัสดุ</p>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">ขนาดที่เลือก</h3>
            {size ? (
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">{size.name}</p>
                  {size.id !== 'custom' && <p className="text-blue-400">฿{(size.price * 30).toFixed(2)}</p>}
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  {size.width > 0 && <p>กว้าง: {size.width} นิ้ว</p>}
                  {size.height > 0 && <p>สูง: {size.height} นิ้ว</p>}
                  {size.thickness > 0 && <p>หนา: {size.thickness} นิ้ว</p>}
                  {size.id === 'custom' && <p className="mt-2 text-blue-400">ค่าธรรมเนียมพื้นฐาน: ฿4,500.00</p>}
                </div>
              </div>
            ) : (
              <p className="text-gray-400">ยังไม่ได้เลือกขนาด</p>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">คุณสมบัติที่เลือก</h3>
            {features.length > 0 ? (
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-700 space-y-2">
                {features.map(feature => (
                  <div key={feature.id} className="flex justify-between">
                    <p>{feature.name}</p>
                    <p className="text-blue-400">+฿{(feature.price * 30).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">ไม่มีคุณสมบัติเพิ่มเติมที่เลือก</p>
            )}
          </div>
          
          <Separator className="my-4 bg-slate-700" />
          
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">ราคาประมาณ</h3>
            <p className="text-2xl font-bold text-blue-400">฿{(totalPrice * 30).toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            disabled={!canRequestQuote}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            ขอใบเสนอราคา
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-800 text-white border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-400">ขอใบเสนอราคาของคุณ</DialogTitle>
            <DialogDescription className="text-gray-300">
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
                className="bg-slate-900 border-slate-700"
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
                className="bg-slate-900 border-slate-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">โทรศัพท์ (ไม่บังคับ)</Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="081-234-5678"
                className="bg-slate-900 border-slate-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">ความคิดเห็นเพิ่มเติม (ไม่บังคับ)</Label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="ความต้องการเฉพาะหรือคำถาม..."
                className="bg-slate-900 border-slate-700 min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={handleRequestQuote}
              disabled={!name || !email}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
