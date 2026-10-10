import { useCart } from "../utils/CartContext"

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart()

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
        <div>
          <h2 className="font-semibold text-slate-800">{item.name}</h2>
          <p className="text-slate-600">Rp {item.price.toLocaleString("id-ID")}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 border rounded hover:bg-slate-100">−</button>
        <span className="w-8 text-center">{item.qty}</span>
        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 border rounded hover:bg-slate-100">+</button>
        <button onClick={() => removeFromCart(item.id)} className="ml-3 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Hapus
        </button>
      </div>
    </div>
  )
}