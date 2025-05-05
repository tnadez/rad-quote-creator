
import { Separator } from "@/components/ui/separator";

const Header = () => {
  return (
    <header className="w-full py-6 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-medium text-gray-800">
            Custom Car Radiator Design
            <span className="block text-amber-500">System</span>
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl">
            ออกแบบระบบระบายความร้อนที่สมบูรณ์แบบสำหรับคุณด้วยเครื่องมือออกแบบหม้อน้ำแบบโต้ตอบของเรา
          </p>
          <Separator className="mt-6 bg-gray-200" />
        </div>
      </div>
    </header>
  );
};

export default Header;
