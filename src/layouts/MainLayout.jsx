import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useCart } from "../utils/CartContext"

export default function MainLayout() {
  const { toast } = useCart()

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
      <Footer />

      {toast && (
        <div className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg">
          ✓ {toast}
        </div>
      )}
    </div>
  )
}