import logo from '../assets/images/logo4.png'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center">

        {/* Logo - Increased height (h-28) and reduced bottom margin (mb-1) */}
        <img
          src={logo}
          alt="Trendz Logo"
          className="h-28 w-auto mx-auto -mb-8 block object-contain"
        />

        {/* Description */}
        <p className="text-gray-400">
          Built by Kesavan Gnanasekaran
        </p>

        {/* Copyright */}
        <div className="w-full border-t border-gray-700 pt-4 mt-4">
          <p className="text-sm text-gray-500">
            © 2026 Trendz. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
