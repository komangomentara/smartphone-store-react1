import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState("")

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(""), 2000)
  }

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id)
    if (existing && existing.qty >= product.stock) {
      showToast("Jumlah sudah mencapai stok maksimal")
      return
    }
    setCart((prev) => {
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
    showToast(`${product.name} masuk ke keranjang`)
  }

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.min(item.stock, Math.max(1, qty)) } : item
      )
    )
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => setCart([])

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, clearCart, totalQty, totalPrice, toast }}
    >
      {children}
    </CartContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)
