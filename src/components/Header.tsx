
import { Separator } from "@/components/ui/separator";

const Header = () => {
  return (
    <header className="w-full py-6 bg-gradient-to-r from-orange-900 via-orange-600 to-orange-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Custom Car Radiator Design
            <span className="block text-orange-200">System</span>
          </h1>
          <p className="mt-3 text-xl text-gray-200 max-w-2xl">
            ออกแบบระบบระบายความร้อนที่สมบูรณ์แบบสำหรับคุณด้วยเครื่องมือออกแบบหม้อน้ำแบบโต้ตอบของเรา
          </p>
          <Separator className="mt-6 bg-orange-700/50" />
        </div>
      </div>
    </header>
  );
};

export default Header;
