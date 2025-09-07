import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Catalog from "./components/catalog";
import Cart from "./components/cart";
import Profile from "./components/profile";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";

// Import des données
import { mockProducts } from "./data/products";
import { mockUsers } from "./data/user";

// Importez le contexte
import AppContext from "./context/AppContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState(mockProducts);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    try {
      const savedCart = sessionStorage.getItem("cart");
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (e) {
      console.error("Error reading cart from sessionStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Error saving cart to sessionStorage", e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const checkout = () => {
    if (!user || cart.length === 0) return;
    const newOrder = {
      id: "ORD-" + Date.now(),
      userId: user.id,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "En cours",
      date: new Date().toLocaleDateString("fr-FR"),
      deliveryAddress: user.address,
      phone: user.phone
    };
    setOrders((prev) => [...prev, newOrder]);
    setCart([]);
    setCurrentPage("profile");
  };

  const login = (email, password) => {
    const found = mockUsers.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      setCurrentPage("home");
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCurrentPage("home");
  };

  // Toutes les fonctions sont accessibles à tous les utilisateurs
  const addProduct = (product) => {
    setProducts((prev) => [...prev, { 
      ...product, 
      id: Math.max(...prev.map(p => p.id), 0) + 1 
    }]);
  };

  const updateProduct = (id, updated) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const updateUserRole = (userId, role) => {
    console.log(`Mise à jour du rôle de l'utilisateur ${userId} vers ${role}`);
  };

  const contextValue = {
    user,
    cart,
    orders,
    products,
    addToCart,
    removeFromCart,
    updateQuantity,
    checkout,
    login,
    logout,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateUserRole
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="container mx-auto px-4 py-8">
          {currentPage === "home" && <Home setCurrentPage={setCurrentPage} />}
          {currentPage === "catalog" && <Catalog setCurrentPage={setCurrentPage} />}
          {currentPage === "cart" && <Cart />}
          {currentPage === "profile" && <Profile setCurrentPage={setCurrentPage} />}
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "admin" && <AdminDashboard />}
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}