import { useContext } from "react";
// ⚠️ IMPORT SANS ACCOLADES
import AppContext from "../context/AppContext"; // Pas de { AppContext }, juste AppContext
import ProductCard from "./productCard";

function Home({ setCurrentPage }) {
  const { products } = useContext(AppContext);
  const bestSellers = products.slice(0, 3);

  return (
    <div className="text-center">
      <div
        className="h-80 sm:h-96 bg-gradient-to-b from-green-600 to-green-800 text-white flex flex-col justify-center items-center rounded-lg mb-12 relative overflow-hidden"
        style={{
          backgroundImage: "url('https://placehold.co/1200x400/2E7D32/FFFFFF?text=Natura+-+100%25+Naturel')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center p-6 bg-black bg-opacity-30 rounded-lg max-w-lg">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 drop-shadow-lg">Natura</h1>
          <p className="text-lg sm:text-xl mb-4 drop-shadow-md">Des produits naturels pour une vie durable</p>
          <button
            onClick={() => setCurrentPage("catalog")}
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Découvrir
          </button>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-green-800 mb-8">Nos meilleures ventes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;