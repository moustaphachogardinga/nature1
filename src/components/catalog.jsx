import { useContext, useState, useEffect } from "react";
// ⚠️ IMPORT SANS ACCOLADES
import AppContext from "../context/AppContext";
import ProductCard from "./productCard";

function Catalog({ setCurrentPage }) {
  const { products } = useContext(AppContext);
  const [filtered, setFiltered] = useState(products);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [eco, setEco] = useState(false);

  useEffect(() => {
    let result = products;
    if (search)
      result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category) result = result.filter((p) => p.category === category);
    if (eco) result = result.filter((p) => p.eco);
    setFiltered(result);
  }, [search, category, eco, products]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Catalogue</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder="Rechercher des produits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Toutes les catégories</option>
            <option value="soin">Soins</option>
            <option value="maison">Maison</option>
            <option value="alimentation">Alimentation</option>
          </select>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={eco}
              onChange={(e) => setEco(e.target.checked)}
              className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-gray-700 font-medium">Éco</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;