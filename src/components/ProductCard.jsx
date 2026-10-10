import { Link } from "react-router-dom"
import { useCart } from "../utils/CartContext"

export default function ProductCard({ p }) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-lg transition flex flex-col">
      <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded-lg mb-3" />
      <p className="text-xs text-slate-500">{p.brand} • {p.category}</p>
      <h2 className="font-semibold text-lg text-slate-800">{p.name}</h2>
      <p className="text-yellow-500 text-sm">★ {p.rating}</p>
      <p className="text-indigo-600 font-bold mt-1">Rp {p.price.toLocaleString("id-ID")}</p>

      {p.stock === 0 ? (
        <span className="self-start mt-2 text-xs px-2 py-1 rounded bg-red-100 text-red-600">Stok habis</span>
      ) : p.stock <= 5 ? (
        <span className="self-start mt-2 text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">Sisa {p.stock}</span>
      ) : (
        <span className="self-start mt-2 text-xs px-2 py-1 rounded bg-green-100 text-green-700">Tersedia</span>
      )}

      <div className="mt-auto pt-4 flex gap-2">
        <Link
          to={`/product/${p.id}`}
          className="flex-1 text-center px-3 py-2 border border-indigo-200 rounded-lg text-indigo-600 hover:bg-indigo-50"
        >
          Detail
        </Link>
        <button
          onClick={() => addToCart(p)}
          disabled={p.stock === 0}
          className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {p.stock === 0 ? "Habis" : "+ Keranjang"}
        </button>
      </div>
    </div>
  )
}