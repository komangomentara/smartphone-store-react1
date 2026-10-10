import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { products } from "../data/products"

const brands = ["Semua", "iPhone", "Samsung", "Xiaomi", "OPPO", "Vivo", "Realme"]
const categories = ["Semua", "Flagship", "Mid-range", "Budget"]

export default function Home() {
  const [inputValue, setInputValue] = useState("")
  const [search, setSearch] = useState("")
  const [brand, setBrand] = useState("Semua")
  const [category, setCategory] = useState("Semua")
  const [sort, setSort] = useState("default")

  useEffect(() => {
    const timer = setTimeout(() => setSearch(inputValue), 500)
    return () => clearTimeout(timer)
  }, [inputValue])

  const isLoading = inputValue !== search

  let filtered = products.filter((p) => {
    const cocokNama = p.name.toLowerCase().includes(search.toLowerCase())
    const cocokBrand = brand === "Semua" || p.brand === brand
    const cocokKategori = category === "Semua" || p.category === category
    return cocokNama && cocokBrand && cocokKategori
  })

  if (sort === "termurah") {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sort === "termahal") {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8 mb-6">
        <h1 className="text-3xl font-bold">SMARTPHONE STORE</h1>
        <p className="mt-2">Temukan smartphone impianmu :)</p>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Ketik nama HP..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg bg-white"
        />
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full md:w-1/4 px-4 py-2 border rounded-lg bg-white">
          {brands.map((b) => (
            <option key={b} value={b}>{b === "Semua" ? "Semua Brand" : b}</option>
          ))}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full md:w-1/4 px-4 py-2 border rounded-lg bg-white">
          {categories.map((c) => (
            <option key={c} value={c}>{c === "Semua" ? "Semua Kategori" : c}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full md:w-1/4 px-4 py-2 border rounded-lg bg-white">
          <option value="default">Urutkan</option>
          <option value="termurah">Harga termurah</option>
          <option value="termahal">Harga termahal</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-xl font-semibold text-indigo-600 animate-pulse">
            {inputValue ? `Mencari "${inputValue}"... ⏳` : "Memuat daftar produk... ⏳"}
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Produk tidak ditemukan.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <ProductCard key={item.id} p={item} />
          ))}
        </div>
      )}
    </div>
  )
}