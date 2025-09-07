import { useContext } from "react";
// ⚠️ IMPORT SANS ACCOLADES car c'est un export default
import AppContext from "../context/AppContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, checkout } = useContext(AppContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-green-800 text-white p-6">
        <h2 className="text-2xl font-bold">Votre panier</h2>
      </div>
      <div className="p-6">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-500 text-lg">Votre panier est vide.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>{item.price} Fcfa × {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right mt-6">
              <p className="text-xl font-bold">Total : {total.toFixed(2)} Fcfa</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;