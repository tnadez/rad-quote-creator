
const Footer = () => {
  return (
    <footer className="w-full py-6 bg-orange-950 border-t border-orange-900 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">© 2025 Custom Car Radiator Design System</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              นโยบายความเป็นส่วนตัว
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              ข้อกำหนดการใช้งาน
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              ติดต่อเรา
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
