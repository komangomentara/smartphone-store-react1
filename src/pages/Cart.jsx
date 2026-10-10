import { Link } from "react-router-dom"
import CartItem from "../components/CartItem"
import { useCart } from "../utils/CartContext"

export default function Cart() {
  const { cart, totalQty, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600 mb-4">Keranjang masih kosong.</p>
        <Link to="/" className="text-indigo-600 hover:underline">Mulai belanja</Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Keranjang Belanja</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-6 bg-white border rounded-xl p-6 shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div>
          <p className="text-slate-500">Jumlah barang: <b className="text-slate-800">{totalQty}</b></p>
          <p className="text-xl">Harga total: <b className="text-indigo-600">Rp {totalPrice.toLocaleString("id-ID")}</b></p>
        </div>
        <Link to="/checkout" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Lanjut ke Checkout →
        </Link>
      </div>
    </div>
  )
}