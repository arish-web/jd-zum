import React from "react";
import { X } from "lucide-react";
import type { Appointment } from "../../src/types"; // adjust path

type Status = Appointment["status"];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (status: Status) => void;
  clientName: string;
}

const statusColors: Record<Status, string> = {
  pending: "bg-red-100 text-red-700 hover:bg-red-200",
  confirmed: "bg-orange-100 text-orange-700 hover:bg-orange-200",
  cancelled: "bg-gray-600 text-white hover:bg-gray-700",
  accepted: "bg-green-100 text-green-700 hover:bg-green-200",
};

const StatusModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelect,
  clientName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-5 w-[300px] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold text-green-600 text-center">
          Change Status
        </h2>
        <p className="text-sm text-center text-gray-600 my-3">
          Choose a status for <strong>{clientName}</strong>'s appointment.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {(["pending", "confirmed", "cancelled", "accepted"] as Status[]).map(
            (status) => (
              <button
                key={status}
                onClick={() => onSelect(status)}
                className={`text-sm font-medium py-2 rounded-md capitalize ${statusColors[status]}`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
