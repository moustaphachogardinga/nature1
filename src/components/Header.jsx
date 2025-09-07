import { useContext } from "react";
import AppContext from "../context/AppContext"; // Importez sans accolades

function Header({ currentPage, setCurrentPage }) {
  const { user, cart, logout } = useContext(AppContext);
  
  return (
    <header className="bg-green-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <h1
          onClick={() => setCurrentPage("home")}
          className="text-2xl font-bold cursor-pointer hover:text-green-200 transition-colors"
        >
          Natura
        </h1>
        <nav className="flex space-x-6 my-2 sm:my-0">
          <button 
            onClick={() => setCurrentPage("home")} 
            className={`hover:text-green-200 transition-colors ${currentPage === "home" ? "font-bold text-green-100" : ""}`}
          >
            Accueil
          </button>
          <button 
            onClick={() => setCurrentPage("catalog")} 
            className={`hover:text-green-200 transition-colors ${currentPage === "catalog" ? "font-bold text-green-100" : ""}`}
          >
            Catalogue
          </button>
          {user ? (
            <>
              <button 
                onClick={() => setCurrentPage("profile")} 
                className={`hover:text-green-200 transition-colors ${currentPage === "profile" ? "font-bold text-green-100" : ""}`}
              >
                Profil
              </button>
              {user.role === "admin" && (
                <button 
                  onClick={() => setCurrentPage("admin")} 
                  className={`hover:text-green-200 transition-colors ${currentPage === "admin" ? "font-bold text-green-100" : ""}`}
                >
                  Admin
                </button>
              )}
              <button 
                onClick={logout} 
                className="text-red-200 hover:text-white transition-colors"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <button 
              onClick={() => setCurrentPage("login")} 
              className="hover:text-green-200 transition-colors"
            >
              Connexion
            </button>
          )}
        </nav>
        <div 
          className="relative cursor-pointer hover:scale-110 transition-transform"
          onClick={() => setCurrentPage("cart")}
        >
          <span className="text-2xl">🛒</span>
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart?.length || 0}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;