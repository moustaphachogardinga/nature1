// Gestion du stockage pour le panier
export const CART_KEY = 'natura_cart';

// Sauvegarder le panier dans le sessionStorage
export const saveCart = (cart) => {
  try {
    sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Erreur lors de la sauvegarde du panier', e);
  }
};

// Charger le panier depuis le sessionStorage
export const loadCart = () => {
  try {
    const saved = sessionStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Erreur lors du chargement du panier', e);
    return [];
  }
};

// Supprimer le panier du sessionStorage
export const clearCart = () => {
  try {
    sessionStorage.removeItem(CART_KEY);
  } catch (e) {
    console.error('Erreur lors de la suppression du panier', e);
  }
};

// Gestion du stockage pour l'utilisateur connecté
export const USER_KEY = 'natura_user';

export const saveUser = (user) => {
  try {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Erreur lors de la sauvegarde de l\'utilisateur', e);
  }
};

export const loadUser = () => {
  try {
    const saved = sessionStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error('Erreur lors du chargement de l\'utilisateur', e);
    return null;
  }
};

export const clearUser = () => {
  try {
    sessionStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Erreur lors de la suppression de l\'utilisateur', e);
  }
};