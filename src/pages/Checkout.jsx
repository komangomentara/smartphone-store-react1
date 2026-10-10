import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../utils/CartContext"

// Pilihan detail untuk tiap metode pembayaran
const paymentOptions = {
  "Transfer Bank": ["BCA", "BNI", "BRI", "Mandiri"],
  "E-Wallet": ["GoPay", "OVO", "DANA", "ShopeePay"],
  "COD (Bayar di Tempat)": [],
}

export default function Checkout() {
  const { cart, totalQty, totalPrice, clearCart } = useCart() // [useContext]

  // [useState] data form dan hasil pesanan
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Transfer Bank",
    paymentDetail: "BCA",
    accountName: "",
    accountNumber: "",
  })
  const [order, setOrder] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Nomor rekening / e-wallet: hanya boleh angka
  const handleNumberChange = (e) =>
    setForm({ ...form, accountNumber: e.target.value.replace(/\D/g, "") })

  // Saat metode berubah: pilihan detail diset ke yang pertama, isian rekening dikosongkan
  const handlePaymentChange = (e) => {
    const method = e.target.value
    setForm({
      ...form,
      payment: method,
      paymentDetail: paymentOptions[method][0] || "",
      accountName: "",
      accountNumber: "",
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setOrder({ ...form, items: cart, totalQty, totalPrice, no: "ORD-" + Date.now() })
    clearCart()
  }

  const isBank = form.payment === "Transfer Bank"
  const needsAccount = paymentOptions[form.payment].length > 0 // bukan COD

  // [CONDITIONAL RENDERING 1] pesanan sudah dibuat -> halaman sukses
  if (order) {
    return (
      <div className="max-w-xl mx-auto bg-white border rounded-xl p-8 shadow-sm text-center">
        <div className="text-5xl mb-3">✅</div>
        <h1 className="text-2xl font-bold text-slate-800">Pesanan Berhasil!</h1>
        <p className="text-slate-500 mt-1">No. pesanan: <b>{order.no}</b></p>

        <div className="text-left mt-6 space-y-1 text-slate-700">
          <p>Nama: <b>{order.name}</b></p>
          <p>No. HP: <b>{order.phone}</b></p>
          <p>Alamat: <b>{order.address}</b></p>
          <p>
            Pembayaran: <b>{order.payment}{order.paymentDetail && ` - ${order.paymentDetail}`}</b>
          </p>
          {/* [CONDITIONAL RENDERING] data rekening hanya tampil jika bukan COD */}
          {order.accountName && (
            <>
              <p>Atas nama: <b>{order.accountName}</b></p>
              <p>
                {order.payment === "Transfer Bank" ? "No. rekening" : "No. e-wallet"}: <b>{order.accountNumber}</b>
              </p>
            </>
          )}
        </div>

        <ul className="text-left mt-4 border-t pt-4 space-y-1 text-sm text-slate-600">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} x {item.qty}</span>
              <span>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
            </li>
          ))}
        </ul>
        <p className="text-right mt-3 text-lg">
          Total: <b className="text-indigo-600">Rp {order.totalPrice.toLocaleString("id-ID")}</b>
        </p>

        <Link to="/" className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Kembali Belanja
        </Link>
      </div>
    )
  }

  // [CONDITIONAL RENDERING 2] keranjang kosong
  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600 mb-4">Keranjang masih kosong, belum ada yang bisa di-checkout.</p>
        <Link to="/" className="text-indigo-600 hover:underline">Mulai belanja</Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-white border rounded-xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block font-medium mb-1">Nama Lengkap</label>
            <input name="name" value={form.name} onChange={handleChange} required
              className="w-full border rounded-lg px-4 py-2" placeholder="Nama penerima" />
          </div>
          <div>
            <label className="block font-medium mb-1">No. HP</label>
            <input name="phone" value={form.phone} onChange={handleChange} required
              className="w-full border rounded-lg px-4 py-2" placeholder="08xxxxxxxxxx" />
          </div>
          <div>
            <label className="block font-medium mb-1">Alamat Pengiriman</label>
            <textarea name="address" value={form.address} onChange={handleChange} required rows="3"
              className="w-full border rounded-lg px-4 py-2" placeholder="Alamat lengkap" />
          </div>

          <div>
            <label className="block font-medium mb-1">Metode Pembayaran</label>
            <select name="payment" value={form.payment} onChange={handlePaymentChange}
              className="w-full border rounded-lg px-4 py-2 bg-white">
              {Object.keys(paymentOptions).map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          {/* [CONDITIONAL RENDERING 3] pilihan bank / e-wallet + data akun, hanya jika bukan COD */}
          {needsAccount && (
            <>
              <div>
                <label className="block font-medium mb-1">
                  {isBank ? "Pilih Bank" : "Pilih E-Wallet"}
                </label>
                <select name="paymentDetail" value={form.paymentDetail} onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 bg-white">
                  {paymentOptions[form.payment].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">
                  {isBank ? "Nama Pemilik Rekening" : "Nama Akun E-Wallet"}
                </label>
                <input name="accountName" value={form.accountName} onChange={handleChange} required
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder={isBank ? "Nama sesuai buku tabungan" : "Nama sesuai akun e-wallet"} />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  {isBank ? "No. Rekening" : "No. E-Wallet"}
                </label>
                <input name="accountNumber" value={form.accountNumber} onChange={handleNumberChange} required
                  inputMode="numeric"
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder={isBank ? "Contoh: 1234567890" : "Contoh: 081234567890"} />
                <p className="text-xs text-slate-500 mt-1">
                  Hanya angka ya :)
                </p>
              </div>
            </>
          )}

          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Buat Pesanan
          </button>
        </form>

        <aside className="bg-white border rounded-xl p-6 shadow-sm h-fit">
          <h2 className="font-semibold text-lg mb-3">Ringkasan Pesanan</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} x {item.qty}</span>
                <span>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
              </li>
            ))}
          </ul>
          <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
            <span>Total ({totalQty} barang)</span>
            <span className="text-indigo-600">Rp {totalPrice.toLocaleString("id-ID")}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}