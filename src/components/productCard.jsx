import { useContext } from "react";
import AppContext from "../context/AppContext"; // Importez sans accolades

function ProductCard({ product }) {
  const { addToCart } = useContext(AppContext);
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        {product.eco && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <span>🌱</span>
            Éco
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{product.name}</h3>
        <p className="text-green-700 font-bold text-xl mb-3">{product.price} Fcfa</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

export default ProductCard;