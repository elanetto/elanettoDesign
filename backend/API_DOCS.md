# 📌 API Documentation - Sticker Shop Backend

## 📍 Base URL
```
http://localhost:5001/api
```

## 🏷️ Stickers API

### **1️⃣ Get All Stickers**
**Endpoint:**
```
GET /stickers
```
**Response Example:**
```json
[
  {
    "id": 1,
    "title": "Cool Panda Sticker",
    "description": "A cute panda sticker",
    "image_url": "https://example.com/sticker.png",
    "price": 3.99,
    "category": "Animals"
  }
]
```

---

### **2️⃣ Get Sticker by ID**
**Endpoint:**
```
GET /stickers/:id
```
**Example:**
```
GET /stickers/1
```
**Response Example:**
```json
{
  "id": 1,
  "title": "Cool Panda Sticker",
  "description": "A cute panda sticker",
  "image_url": "https://example.com/sticker.png",
  "price": 3.99,
  "category": "Animals"
}
```

---

### **3️⃣ Create a New Sticker**
**Endpoint:**
```
POST /stickers
```
**Request Body:**
```json
{
  "title": "Cyberpunk Sticker",
  "description": "A neon cyberpunk sticker",
  "image_url": "https://example.com/cyberpunk.png",
  "image_alt": "Cyberpunk sticker",
  "category": "Sci-Fi",
  "sticker_type": "single",
  "stock_quantity": 50,
  "price": 5.49,
  "discount": 1.00,
  "height": 5.50,
  "width": 4.00
}
```
**Response Example:**
```json
{
  "message": "Sticker created successfully",
  "id": 2
}
```

---

### **4️⃣ Update a Sticker**
**Endpoint:**
```
PUT /stickers/:id
```
**Example:**
```
PUT /stickers/1
```
**Request Body:**
```json
{
  "title": "Updated Panda Sticker",
  "price": 4.99
}
```
**Response Example:**
```json
{
  "message": "Sticker updated successfully"
}
```

---

### **5️⃣ Delete a Sticker**
**Endpoint:**
```
DELETE /stickers/:id
```
**Example:**
```
DELETE /stickers/1
```
**Response Example:**
```json
{
  "message": "Sticker deleted successfully"
}
```

---

## ⭐ User API

### **1️⃣ Create a New User**
**Endpoint:**
```
POST /users
```
**Request Body:**
```json
{
  "username": "john_doe",
  "avatar": "https://example.com/avatar.png",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "customer"
}
```
**Response Example:**
```json
{
  "message": "User created successfully",
  "id": 1
}
```

---

### **2️⃣ Get User by ID**
**Endpoint:**
```
GET /users/:id
```
**Example:**
```
GET /users/1
```
**Response Example:**
```json
{
  "id": 1,
  "username": "john_doe",
  "avatar": "https://example.com/avatar.png",
  "email": "john@example.com",
  "role": "customer",
  "created_at": "2025-03-18T12:00:00Z"
}
```

---

### **3️⃣ Delete User**
**Endpoint:**
```
DELETE /users/:id
```
**Example:**
```
DELETE /users/1
```
**Response Example:**
```json
{
  "message": "User deleted successfully"
}
```