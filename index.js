// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database-name.firebaseio.com/",
});

app.use(bodyParser.json());
const db = admin.database();
const app = express();
const port = 3000;

// Create (POST) - Add a new item
app.post("/items", async (req, res) => {
  try {
    const { name, description } = req.body;
    const ref = db.ref("items").push();
    const newItem = { id: ref.key, name, description };
    await ref.set(newItem);
    res
      .status(201)
      .json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating item", error: error.message });
  }
});

// Read (GET) - Get all items
app.get("/items", async (req, res) => {
  try {
    const snapshot = await db.ref("items").once("value");
    const items = snapshot.val() || {};
    res.json(Object.values(items));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching items", error: error.message });
  }
});

// Read (GET) - Get an item by ID
app.get("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db.ref(`items/${id}`).once("value");
    const item = snapshot.val();
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching item", error: error.message });
  }
});

// Update (PUT) - Update an item by ID
app.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const ref = db.ref(`items/${id}`);
    const snapshot = await ref.once("value");

    if (snapshot.exists()) {
      const updatedItem = { id, name, description };
      await ref.set(updatedItem);
      res.json({ message: "Item updated successfully", item: updatedItem });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating item", error: error.message });
  }
});

// Delete (DELETE) - Remove an item by ID
app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ref = db.ref(`items/${id}`);
    const snapshot = await ref.once("value");

    if (snapshot.exists()) {
      await ref.remove();
      res.json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting item", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
