// localStorage
const STORAGE_KEYS = {
  USERS: "simple_shop_users",
  ORDERS: "simple_shop_orders",
  REVIEWS: "simple_shop_reviews",
  TOKEN: "simple_shop_token",
};

// Użtkownicy
const HARDCODED_USERS = [
  { email: "admin@shop.com", password: "123", name: "Admin", role: "admin" },
  { email: "student@shop.com", password: "123", name: "Student", role: "user" },
];

export const mockServer = {
  login: async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let user = HARDCODED_USERS.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      const storedUsers = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.USERS) || "[]",
      );
      user = storedUsers.find(
        (u) => u.email === email && u.password === password,
      );
    }

    if (user) {
      const token = `fake-jwt-token-${Date.now()}`;
      localStorage.setItem(STORAGE_KEYS.TOKEN, JSON.stringify({ token, user }));
      return { token, user };
    }

    throw new Error("Nieprawidłowe hasło lub imię");
  },

  register: async (email, password, name) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Sprawdzenie dublikatów
    const storedUsers = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.USERS) || "[]",
    );
    const allUsers = [...HARDCODED_USERS, ...storedUsers];

    if (allUsers.find((u) => u.email === email)) {
      throw new Error("Użytkownik z takim mailem już istnieje!");
    }

    const newUser = { email, password, name, role: "user" };
    storedUsers.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(storedUsers));

    return newUser;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  getSession: () => {
    const session = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return session ? JSON.parse(session) : null;
  },

  // Historia zamówień
  createOrder: async (orderData) => {
    // orderData: { userId, items, total, date }
    await new Promise((resolve) => setTimeout(resolve, 500));

    const orders = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.ORDERS) || "[]",
    );
    const newOrder = { ...orderData, id: Date.now() };
    orders.push(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    return newOrder;
  },

  getOrdersByUser: async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const orders = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.ORDERS) || "[]",
    );
    return orders.filter((order) => order.userEmail === email);
  },

  addReview: async (productId, review) => {
    // review: { user, text, rating, date }
    const reviews = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.REVIEWS) || "{}",
    );

    if (!reviews[productId]) {
      reviews[productId] = [];
    }

    reviews[productId].push(review);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  },

  getReviewsByProduct: async (productId) => {
    const reviews = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.REVIEWS) || "{}",
    );
    return reviews[productId] || [];
  },
};
