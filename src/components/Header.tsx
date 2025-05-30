
import { Separator } from "@/components/ui/separator";

const Header = () => {
  return (
    <header className="w-full py-6 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Custom Car Radiator Design
            <span className="block text-amber-100">System</span>
          </h1>
          <p className="mt-3 text-xl text-amber-50 max-w-2xl">
            ออกแบบระบบระบายความร้อนที่สมบูรณ์แบบสำหรับคุณด้วยเครื่องมือออกแบบหม้อน้ำแบบโต้ตอบของเรา
          </p>
          <Separator className="mt-6 bg-amber-400/50" />
        </div>
      </div>
    </header>
  );
};

export default Header;
