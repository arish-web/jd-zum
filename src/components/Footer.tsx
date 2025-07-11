import type { FC } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10  shadow-xl">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">InkLens Studio</h2>
          <p className="text-gray-400">
            Creating digital experiences that inspire and empower.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/service" className="hover:text-white transition">
                Services
              </a>
            </li>
            <li>
              <a href="" className="hover:text-white transition">
                Contact
              </a>
            </li>
            <li>
              <a href="" className="hover:text-white transition">
                About
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-gray-300">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-800 pt-5">
        © {new Date().getFullYear()} Inklens Studio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
