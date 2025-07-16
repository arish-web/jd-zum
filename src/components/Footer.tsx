// import type { FC } from "react";
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// const Footer: FC = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-10 mt-10  shadow-xl">
//       <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
//         <div>
//           <h2 className="text-2xl font-bold mb-3">InkLens Studio</h2>
//           <p className="text-gray-400">
//             Creating digital experiences that inspire and empower.
//           </p>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
//           <ul className="space-y-2 text-gray-300">
//             <li>
//               <a href="" className="hover:text-white transition">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="/service" className="hover:text-white transition">
//                 Services
//               </a>
//             </li>
//             <li>
//               <a href="" className="hover:text-white transition">
//                 Contact
//               </a>
//             </li>
//             <li>
//               <a href="" className="hover:text-white transition">
//                 About
//               </a>
//             </li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
//           <div className="flex space-x-4 text-gray-300">
//             <a href="#" className="hover:text-white">
//               <FaFacebookF />
//             </a>
//             <a href="#" className="hover:text-white">
//               <FaTwitter />
//             </a>
//             <a href="#" className="hover:text-white">
//               <FaInstagram />
//             </a>
//             <a href="#" className="hover:text-white">
//               <FaLinkedinIn />
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-800 pt-5">
//         © {new Date().getFullYear()} Inklens Studio. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import type { FC } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaApple, FaGooglePlay } from "react-icons/fa6";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Column 1 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Company</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Feedback</a></li>
            <li><a href="#" className="hover:text-white">Trust, Safety & Security</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Support</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white">Help & Support</a></li>
            <li><a href="#" className="hover:text-white">Foundation</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Legal</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">CA Notice at Collection</a></li>
            <li><a href="#" className="hover:text-white">Cookie Settings</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">More</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white">Accessibility</a></li>
            <li><a href="#" className="hover:text-white">Desktop App</a></li>
            <li><a href="#" className="hover:text-white">Enterprise Solutions</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-8"></div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Social */}
        <div className="flex items-center space-x-4 text-gray-300">
          <span>Follow Us</span>
          <a href="#" className="hover:text-white"><FaFacebookF /></a>
          <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          <a href="#" className="hover:text-white"><FaTwitter /></a>
          <a href="#" className="hover:text-white"><FaYoutube /></a>
          <a href="#" className="hover:text-white"><FaInstagram /></a>
        </div>

        {/* Mobile App Icons */}
        <div className="flex items-center space-x-4 text-gray-300">
          <span>Mobile app</span>
          <a href="#" className="hover:text-white text-xl"><FaApple /></a>
          <a href="#" className="hover:text-white text-xl"><FaGooglePlay /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © 2015 - {new Date().getFullYear()} InkLens Studio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

