import jwt from "jsonwebtoken";

// ✅ Middleware to verify JWT and attach the user to req.user
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

  if (!token) return res.status(401).json({ error: "No token provided." });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token." });

    req.user = user; // Attach the decoded user object
    next();
  });
};

// ✅ Optional: Middleware to restrict access to admins only
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied: Admins only." });
  }
  next();
};
