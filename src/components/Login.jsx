import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { mockUsers } from "../data/user"; // Assure-toi du bon chemin

function Login({ setCurrentPage }) {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // On cherche l'utilisateur correspondant dans mockUsers
    const user = mockUsers.find(u => u.email === email);

    if (!user) {
      setError("Email ou mot de passe incorrect");
      return;
    }

    // Si c'est un admin, on ignore le mot de passe
    if (user.role === "admin") {
      login(user.email, password); // on peut passer n'importe quel password
      setError("");
    } else {
      // Pour les utilisateurs classiques, on vérifie le mot de passe
      if (user.password === password) {
        login(user.email, password);
        setError("");
      } else {
        setError("Email ou mot de passe incorrect");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <div className="bg-green-800 text-white p-6">
        <h2 className="text-2xl font-bold">Connexion</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
