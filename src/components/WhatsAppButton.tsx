import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton: React.FC = () => {
  const phone = "918012011705";
  const message = "Hello! I need assistance with my appointment.";

  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show popup after page load
    const timer = setTimeout(() => {
      setShow(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popup message */}
      {show && (
        <div
          className="
            mb-2 px-4 py-2 rounded-lg shadow-lg 
            bg-white text-gray-800 text-sm 
            animate-slide-up
          "
        >
          Chat with us on WhatsApp 👋
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          bg-green-500 text-white 
          w-14 h-14 rounded-full 
          flex items-center justify-center 
          shadow-lg 
          hover:bg-green-600 
          transition-all duration-300
          ${show ? "animate-pop" : ""}
        `}
      >
        <FaWhatsapp size={32} />
      </a>
    </div>
  );
};

export default WhatsAppButton;
