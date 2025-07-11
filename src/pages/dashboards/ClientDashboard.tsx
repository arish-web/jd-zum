import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Navbar from "../../components/navbar/Navbar";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useMemo } from "react";
import type { Appointment } from "../../types";
import { getAppointmentsForUser } from "../../api/appointment";
import PaymentModal from "../../components/PaymentModal";
import Footer from "../../components/Footer";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const ClientDashboard: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const chartData = useMemo(() => {
    const counts: { [key: string]: number } = {};

    appointments.forEach((app) => {
      const date = new Date(app.createdAt);
      const month = date.toLocaleString("default", { month: "short" });
      counts[month] = (counts[month] || 0) + 1;
    });

    return Object.entries(counts).map(([month, bookings]) => ({
      month,
      bookings,
    }));
  }, [appointments]);

  const handlePayment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowQRModal(true);
  };

  const categoryCount = appointments.reduce((acc, app) => {
    const category = app?.serviceId?.category;
    if (category) {
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?._id) return;
      try {
        const res = await getAppointmentsForUser(user._id);
        setAppointments(res.data); // assuming the array is in res.data
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };

    fetchAppointments();
  }, [user]);

  return (
    <div
      className={`min-h-screen p-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar />

      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-1">Client Dashboard</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back, {user?.name}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Bar Chart */}
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } p-6 rounded-lg shadow-md`}
        >
          <h3 className="text-xl font-bold mb-4">Your Monthly Bookings</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } p-6 rounded-lg shadow-md`}
        >
          <h3 className="text-xl font-bold mb-4">Preferred Categories</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((_, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={COLORS[idx % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-md mb-10`}
      >
        <h3 className="text-xl font-bold p-6 border-b border-gray-200 dark:border-gray-700">
          Recent Bookings
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
              <tr>
                <th className="px-6 py-3 text-left">Client Name</th>
                <th className="px-6 py-3 text-left">Service Type</th>
                <th className="px-6 py-3 text-left">Service Name</th>
                <th className="px-6 py-3 text-left">Applied Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Payment</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr
                  key={app._id}
                  className={
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  }
                >
                  <td className="px-6 py-4">{app.userId?.name || "Unknown"}</td>
                  <td className="px-6 py-4 capitalize">{app.serviceType}</td>
                  <td className="px-6 py-4">
                    {app.serviceId?.title || "Untitled"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(app.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer
                                  ${
                                    app.status === "pending"
                                      ? "bg-red-100 text-red-700"
                                      : ""
                                  }
                                  ${
                                    app.status === "accepted"
                                      ? "bg-green-100 text-green-700"
                                      : ""
                                  }
                                  ${
                                    app.status === "confirmed"
                                      ? "bg-blue-100 text-blue-700"
                                      : ""
                                  }
                                  ${
                                    app.status === "cancelled"
                                      ? "bg-gray-200 text-gray-600"
                                      : ""
                                  }
                                `}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {app.paymentStatus === "Paid" ? (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                        Paid
                      </span>
                    ) : (
                      <button
                        className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                        onClick={() => handlePayment(app)} // 🔁 Replace with your payment function
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />


      {showQRModal && selectedAppointment && (
        <PaymentModal
          appointment={selectedAppointment}
          onClose={() => setShowQRModal(false)}
          onSuccess={() =>
            setAppointments((prev) =>
              prev.map((app) =>
                app._id === selectedAppointment._id
                  ? { ...app, paymentStatus: "Paid" }
                  : app
              )
            )
          }
        />
      )}
    </div>
  );
};

export default ClientDashboard;
