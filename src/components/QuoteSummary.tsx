
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
    toast.success("Quote request submitted!", {
      description: "We'll contact you shortly with your custom radiator quote."
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
          <CardTitle className="text-2xl font-bold text-blue-400">Your Quote Summary</CardTitle>
          <CardDescription className="text-gray-300">
            Review your custom radiator configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Selected Material</h3>
            {material ? (
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                <div className="flex justify-between">
                  <p className="font-medium">{material.name}</p>
                  <p className="text-blue-400">${material.pricePerSquareInch.toFixed(2)}/sq. in</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No material selected</p>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Selected Size</h3>
            {size ? (
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">{size.name}</p>
                  {size.id !== 'custom' && <p className="text-blue-400">${size.price.toFixed(2)}</p>}
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  {size.width > 0 && <p>Width: {size.width} inches</p>}
                  {size.height > 0 && <p>Height: {size.height} inches</p>}
                  {size.thickness > 0 && <p>Thickness: {size.thickness} inches</p>}
                  {size.id === 'custom' && <p className="mt-2 text-blue-400">Base custom fee: $150.00</p>}
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No size selected</p>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Selected Features</h3>
            {features.length > 0 ? (
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-700 space-y-2">
                {features.map(feature => (
                  <div key={feature.id} className="flex justify-between">
                    <p>{feature.name}</p>
                    <p className="text-blue-400">+${feature.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No additional features selected</p>
            )}
          </div>
          
          <Separator className="my-4 bg-slate-700" />
          
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Total Estimated Price</h3>
            <p className="text-2xl font-bold text-blue-400">${totalPrice.toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            disabled={!canRequestQuote}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            Request Official Quote
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-800 text-white border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-400">Request Your Quote</DialogTitle>
            <DialogDescription className="text-gray-300">
              Fill in your details and we'll send you an official quote for your custom radiator.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="John Smith"
                className="bg-slate-900 border-slate-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="john@example.com"
                className="bg-slate-900 border-slate-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="(123) 456-7890"
                className="bg-slate-900 border-slate-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Additional Comments (optional)</Label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Any specific requirements or questions..."
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
              Submit Quote Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuoteSummary;
