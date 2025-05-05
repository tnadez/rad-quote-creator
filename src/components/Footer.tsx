
const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gradient-to-r from-red-800 via-orange-800 to-amber-800 border-t border-amber-700 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-amber-200">© 2025 Custom Car Radiator Design System</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors">
              นโยบายความเป็นส่วนตัว
            </a>
            <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors">
              ข้อกำหนดการใช้งาน
            </a>
            <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors">
              ติดต่อเรา
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
