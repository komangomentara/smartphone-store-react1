import { Link } from "react-router-dom"
import { useCart } from "../utils/CartContext"

export default function Navbar() {
  const { totalQty } = useCart()

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex flex-wrap gap-3 justify-between items-center shadow">
      <Link to="/" className="font-bold text-xl tracking-wide">
        📱 SMARTPHONE <span className="text-indigo-400">STORE</span>
      </Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-slate-300 hover:text-white">Home</Link>
        <Link to="/about" className="text-slate-300 hover:text-white">About</Link>
        <Link to="/cart" className="text-slate-300 hover:text-white">
          Keranjang
          {totalQty > 0 && (
            <span className="ml-1 bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">{totalQty}</span>
          )}
        </Link>
      </div>
    </nav>
  )
}