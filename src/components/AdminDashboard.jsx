import { useContext, useState } from "react";
// ⚠️ IMPORT SANS ACCOLADES car c'est un export default
import AppContext from "../context/AppContext";

// Vous devez aussi importer mockUsers car vous l'utilisez dans le code
import { mockUsers } from "../data/user";

function AdminDashboard() {
  const { user, products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus } = useContext(AppContext);
  const [tab, setTab] = useState("dashboard");
  const [newProduct, setNewProduct] = useState({ 
    name: "", 
    price: "", 
    category: "", 
    eco: false,
    description: "",
    stock: 10
  });
  const [editProduct, setEditProduct] = useState(null);

  

  // Calculer les statistiques admin
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockProducts = products.filter(p => p.stock < 10).length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === "En cours").length;
  const shippedOrders = orders.filter(o => o.status === "Expédiée").length;
  const deliveredOrders = orders.filter(o => o.status === "Livré").length;

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category && newProduct.description) {
      addProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        image: `https://placehold.co/300x300/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${encodeURIComponent(newProduct.name.substring(0, 10))}`,
      });
      setNewProduct({ name: "", price: "", category: "", eco: false, description: "", stock: 10 });
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct({...product});
  };

  const handleUpdateProduct = () => {
    if (editProduct && editProduct.name && editProduct.price && editProduct.category && editProduct.description) {
      updateProduct(editProduct.id, {
        ...editProduct,
        price: parseFloat(editProduct.price),
        stock: parseInt(editProduct.stock)
      });
      setEditProduct(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-7xl mx-auto">
      <div className="bg-green-800 text-white p-6">
        <h2 className="text-2xl font-bold">Tableau de bord administrateur</h2>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {["dashboard", "products", "orders", "users"].map((tabName) => (
            <button
              key={tabName}
              onClick={() => setTab(tabName)}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                tab === tabName 
                  ? "bg-white text-green-800 border-b-2 border-green-800" 
                  : "text-gray-600 hover:text-green-700 hover:bg-gray-50"
              }`}
            >
              {tabName === "dashboard" && "Tableau de bord"}
              {tabName === "products" && "Produits"}
              {tabName === "orders" && "Commandes"}
              {tabName === "users" && "Utilisateurs"}
            </button>
          ))}
        </div>

        {tab === "dashboard" && (
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Statistiques globales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-green-100 text-sm">Revenus totaux</p>
                    <p className="text-3xl font-bold">{totalRevenue.toFixed(2)} Fcfa</p>
                  </div>
                  <div className="text-4xl">💰</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-blue-100 text-sm">Commandes</p>
                    <p className="text-3xl font-bold">{orders.length}</p>
                  </div>
                  <div className="text-4xl">📦</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-orange-100 text-sm">Produits</p>
                    <p className="text-3xl font-bold">{totalProducts}</p>
                  </div>
                  <div className="text-4xl">🛍️</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-100 text-sm">Stock total</p>
                    <p className="text-3xl font-bold">{totalStock}</p>
                  </div>
                  <div className="text-4xl">📊</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Statut des commandes</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium text-orange-800">En cours</span>
                    <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-bold">{pendingOrders}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-800">Expédiées</span>
                    <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">{shippedOrders}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-800">Livré</span>
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">{deliveredOrders}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Stock critique</h4>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-red-800">Produits en stock faible</span>
                    <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-bold">{lowStockProducts}</span>
                  </div>
                  {lowStockProducts > 0 && (
                    <div className="mt-3 text-sm text-red-700">
                      {products.filter(p => p.stock < 10).map(p => (
                        <div key={p.id} className="flex justify-between">
                          <span>{p.name}</span>
                          <span>{p.stock} restants</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "products" && (
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Ajouter un nouveau produit</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <input
                  placeholder="Nom du produit"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  placeholder="Prix (€)"
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Catégorie</option>
                  <option value="soin">Soins</option>
                  <option value="maison">Maison</option>
                  <option value="alimentation">Alimentation</option>
                </select>
                <input
                  placeholder="Stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="lg:col-span-2">
                  <textarea
                    placeholder="Description du produit"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                    rows="2"
                  />
                </div>
                <label className="flex items-center gap-2 lg:col-span-2">
                  <input
                    type="checkbox"
                    checked={newProduct.eco}
                    onChange={(e) => setNewProduct({ ...newProduct, eco: e.target.checked })}
                    className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700 font-medium">Éco-responsable</span>
                </label>
              </div>
              <button 
                onClick={handleAddProduct}
                disabled={!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.description}
                className="mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Ajouter le produit
              </button>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Liste des produits ({products.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Produit</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Prix</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Stock</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Catégorie</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Éco</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />
                            <span className="ml-3 font-medium text-gray-800">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{p.price} €</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            p.stock < 5 ? 'bg-red-100 text-red-800' :
                            p.stock < 10 ? 'bg-orange-100 text-orange-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {p.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 capitalize">{p.category}</td>
                        <td className="px-4 py-3">
                          {p.eco ? (
                            <span className="text-green-600 font-bold">Oui</span>
                          ) : (
                            <span className="text-gray-400">Non</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(p)}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm font-medium transition-colors"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm font-medium transition-colors"
                            >
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Gestion des commandes ({orders.length})</h3>
            {orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Aucune commande à traiter.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Commande</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Client</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Statut</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800">{order.id}</td>
                        <td className="px-4 py-3 text-gray-600">
                          {mockUsers.find(u => u.id === order.userId)?.name || 'Inconnu'}
                        </td>
                        <td className="px-4 py-3 text-green-700 font-bold">{order.total} €</td>
                        <td className="px-4 py-3 text-gray-600">{order.date}</td>
                        <td className="px-4 py-3">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="border border-gray-300 p-1 rounded text-sm"
                          >
                            <option>En cours</option>
                            <option>Expédiée</option>
                            <option>Livré</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => {
                              alert(`Détails de la commande ${order.id}\n\nArticles: ${order.items.length}\nTotal: ${order.total}€\nStatut: ${order.status}`);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Détails
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === "users" && (
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Gestion des utilisateurs ({mockUsers.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Utilisateur</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Téléphone</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Adresse</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Rôle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
                      <td className="px-4 py-3 text-gray-600">{u.email}</td>
                      <td className="px-4 py-3 text-gray-600">{u.phone}</td>
                      <td className="px-4 py-3 text-gray-600">{u.address}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          u.role === 'admin' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {u.role === 'admin' ? 'Administrateur' : 'Client'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Modifier le produit</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <input
                placeholder="Nom du produit"
                value={editProduct.name}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                placeholder="Prix (€)"
                type="number"
                step="0.01"
                value={editProduct.price}
                onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={editProduct.category}
                onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Catégorie</option>
                <option value="soin">Soins</option>
                <option value="maison">Maison</option>
                <option value="alimentation">Alimentation</option>
              </select>
              <input
                placeholder="Stock"
                type="number"
                value={editProduct.stock}
                onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="lg:col-span-2">
                <textarea
                  placeholder="Description du produit"
                  value={editProduct.description}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                  rows="2"
                />
              </div>
              <label className="flex items-center gap-2 lg:col-span-2">
                <input
                  type="checkbox"
                  checked={editProduct.eco}
                  onChange={(e) => setEditProduct({ ...editProduct, eco: e.target.checked })}
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-gray-700 font-medium">Éco-responsable</span>
              </label>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleUpdateProduct}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
              >
                Mettre à jour
              </button>
              <button
                onClick={() => setEditProduct(null)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;