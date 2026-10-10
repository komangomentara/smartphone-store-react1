import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { products } from "../data/products"
import { specs } from "../data/specs"
import { useCart } from "../utils/CartContext"

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const p = products.find((item) => item.id === Number(id))
  // spesifikasi lengkap, dicocokkan lewat id produk
  const spec = specs[Number(id)]

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [reviews, setReviews] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating || !review.trim()) return
    setReviews([...reviews, { id: Date.now(), rating, review }])
    setRating(0)
    setReview("")
  }

  if (!p) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-600 mb-4">Produk tidak ditemukan.</p>
        <Link to="/" className="text-indigo-600 hover:underline">← Kembali ke Home</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link to="/" className="text-indigo-600 hover:underline">← Kembali</Link>

      <div className="bg-white border rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={p.image} alt={p.name} className="w-full rounded-lg" />
        <div>
          <p className="text-sm text-slate-500">{p.brand} • {p.category}</p>
          <h1 className="text-3xl font-bold text-slate-800">{p.name}</h1>
          <p className="text-yellow-500 mt-1">★ {p.rating}</p>
          <p className="text-2xl text-indigo-600 font-bold mt-3">Rp {p.price.toLocaleString("id-ID")}</p>
          <p className="mt-3 text-slate-700">{p.description}</p>

          {/* [Conditional Rendering] tombol dan info stok */}
          {p.stock > 0 ? (
            <>
              <p className="mt-3 text-green-600">Stok: {p.stock}</p>
              <button
                onClick={() => addToCart(p)}
                className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Tambah ke Keranjang
              </button>
            </>
          ) : (
            <>
              <p className="mt-3 text-red-600 font-semibold">Stok habis</p>
              <button disabled className="mt-4 px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
                Tidak tersedia
              </button>
            </>
          )}

          {/* Fitur unggulan di samping gambar */}
          {/* [Conditional Rendering] hanya tampil jika data spesifikasi ada */}
          {spec && (
            <div className="mt-6">
              <h3 className="font-semibold text-slate-800 mb-2">Fitur Unggulan</h3>
              <div className="flex flex-wrap gap-2">
                {spec.fitur.map((f) => (
                  <span key={f} className="bg-indigo-50 text-indigo-700 text-sm px-3 py-1 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spesifikasi lengkap */}
      {/* [Conditional Rendering] hanya tampil jika data spesifikasi ada */}
      {spec && (
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Spesifikasi Lengkap</h2>
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Layar", spec.layar],
                ["Chipset", spec.chipset],
                ["RAM", spec.ram],
                ["Penyimpanan", spec.penyimpanan],
                ["Kamera Belakang", spec.kameraBelakang],
                ["Kamera Depan", spec.kameraDepan],
                ["Baterai", spec.baterai],
                ["Sistem Operasi", spec.os],
                ["Berat", spec.berat],
              ].map(([label, value]) => (
                <tr key={label} className="border-b last:border-0">
                  <td className="py-2 pr-4 w-40 font-medium text-slate-500 align-top">{label}</td>
                  <td className="py-2 text-slate-800">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Review Pengguna</h2>
          {reviews.length === 0 ? (
            <p className="text-slate-500">Belum ada review.</p>
          ) : (
            <ul className="space-y-3">
              {reviews.map((r) => (
                <li key={r.id} className="border rounded-lg p-3 bg-slate-50">
                  <div className="text-yellow-500">
                    {"★".repeat(r.rating)}
                    <span className="text-gray-300">{"★".repeat(5 - r.rating)}</span>
                  </div>
                  <p className="text-slate-700">{r.review}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Tulis Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full border rounded-lg p-3"
              rows="3"
              placeholder="Tulis pengalaman Anda..."
            />
            <button type="submit" className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Kirim
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}