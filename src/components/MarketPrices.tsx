
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketPrice {
  metal: string;
  price: number;
  currency: string;
  change: number;
  updated: string;
}

// This is a mock API function; in a real application, you would fetch from a real metals price API
const fetchMetalPrices = async (): Promise<MarketPrice[]> => {
  // Simulate API call with realistic but mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date();
      resolve([
        {
          metal: 'copper',
          price: 4.32, // USD per pound
          currency: 'USD',
          change: 0.05,
          updated: now.toISOString()
        },
        {
          metal: 'brass',
          price: 3.18, // USD per pound
          currency: 'USD',
          change: -0.02,
          updated: now.toISOString()
        }
      ]);
    }, 500);
  });
};

// Helper to convert USD price to THB (using an approximate exchange rate)
const convertToTHB = (usdPrice: number): number => {
  const exchangeRate = 30; // Approximate THB to USD exchange rate
  return usdPrice * exchangeRate;
};

const MarketPrices = () => {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getMetalPrices = async () => {
      try {
        const data = await fetchMetalPrices();
        setPrices(data);
      } catch (error) {
        console.error("Error fetching metal prices:", error);
      } finally {
        setLoading(false);
      }
    };
    
    getMetalPrices();
    
    // Refresh prices every 5 minutes
    const intervalId = setInterval(getMetalPrices, 5 * 60 * 1000);
    
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
        <CardTitle className="text-xl font-bold text-amber-300">ราคาตลาดโลหะล่าสุด</CardTitle>
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
                  ฿{convertToTHB(price.price).toFixed(2)}
                  <span className="text-sm text-amber-200 font-normal ml-1">/ ปอนด์</span>
                </div>
                <div className="text-sm text-amber-200">
                  ${price.price.toFixed(2)} {price.currency}/lb
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-amber-200 text-center">
          * ราคาอ้างอิงจากตลาดโลหะนานาชาติ เพื่อการประมาณการณ์เท่านั้น
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketPrices;
