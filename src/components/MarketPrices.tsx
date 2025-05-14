
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketPrice {
  metal: string;
  price: number;
  currency: string;
  change: number;
  updated: string;
}

// This is a mock API function that simulates fetching from Thai metal price API
const fetchThaiMetalPrices = async (): Promise<MarketPrice[]> => {
  // Simulate API call with Thai market data
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date();
      resolve([
        {
          metal: 'copper',
          price: 129.50, // THB per kg
          currency: 'THB',
          change: 1.50,
          updated: now.toISOString()
        },
        {
          metal: 'brass',
          price: 95.25, // THB per kg
          currency: 'THB',
          change: -0.75,
          updated: now.toISOString()
        }
      ]);
    }, 500);
  });
};

// Helper to convert kg to pound for reference
const convertToPound = (kgPrice: number): number => {
  const kgToPoundRatio = 2.20462; // 1 kg = 2.20462 pounds
  return kgPrice / kgToPoundRatio;
};

const MarketPrices = () => {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getThaiMetalPrices = async () => {
      try {
        const data = await fetchThaiMetalPrices();
        setPrices(data);
      } catch (error) {
        console.error("Error fetching Thai metal prices:", error);
      } finally {
        setLoading(false);
      }
    };
    
    getThaiMetalPrices();
    
    // Refresh prices every 5 minutes
    const intervalId = setInterval(getThaiMetalPrices, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  if (loading) {
    return (
      <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl mb-4">
        <CardContent className="p-4 flex justify-center items-center">
          <div className="text-amber-300">กำลังโหลดราคาตลาด...</div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full border-2 border-amber-700 bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white shadow-xl mb-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-amber-300">ราคาตลาดโลหะในประเทศไทย</CardTitle>
        <CardDescription className="text-amber-100">
          อัพเดทล่าสุด: {new Date(prices[0]?.updated || Date.now()).toLocaleString('th-TH')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {prices.map((price) => (
            <div 
              key={price.metal} 
              className="bg-orange-950 rounded-lg p-3 border border-orange-700 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium capitalize">
                  {price.metal === 'copper' ? 'ทองแดง' : 'ทองเหลือง'}
                </h3>
                <div 
                  className={`text-sm px-2 py-1 rounded ${
                    price.change > 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}
                >
                  {price.change > 0 ? '+' : ''}{price.change.toFixed(2)}
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-amber-300">
                  ฿{price.price.toFixed(2)}
                  <span className="text-sm text-amber-200 font-normal ml-1">/ กิโลกรัม</span>
                </div>
                <div className="text-sm text-amber-200">
                  (${convertToPound(price.price).toFixed(2)} USD/lb)
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-amber-200 text-center">
          * ราคาอ้างอิงจากตลาดโลหะในประเทศไทย เพื่อการประมาณการณ์เท่านั้น
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketPrices;
