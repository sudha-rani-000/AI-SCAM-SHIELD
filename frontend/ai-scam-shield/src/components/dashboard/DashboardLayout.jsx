import { motion } from "framer-motion";
import { ToastProvider } from "../../lib/ToastContext.jsx";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import ToastContainer from "./ToastContainer.jsx";

export default function DashboardLayout({ title, subtitle, children }) {
  return (
    <ToastProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="flex min-h-screen bg-void"
      >
        <Sidebar />

        <div className="flex-1">
          <Topbar title={title} subtitle={subtitle} />
          <main className="px-6 py-6 lg:px-8">{children}</main>
        </div>
      </motion.div>

      <ToastContainer />
    </ToastProvider>
  );
}
