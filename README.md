# Firebase CRUD REST API

This project demonstrates how to create a simple REST API in Node.js using Firebase Realtime Database for data storage. It implements basic CRUD operations: Create, Read, Update, and Delete.

## Features

- Create a new item in the database.
- Retrieve all items or a specific item by ID.
- Update an existing item by ID.
- Delete an item by ID.
- Firebase Realtime Database integration for persistent storage.

---

## Prerequisites

- [Node.js](https://nodejs.org/) installed.
- Firebase project with Realtime Database enabled.
- Service account key for Firebase Admin SDK.

---

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/firebase-crud-api.git
cd firebase-crud-api
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Setup Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or use an existing one.
3. Enable Realtime Database in the Firebase Console.
4. Download the service account key:
   - Go to **Project Settings > Service Accounts**.
   - Click **Generate New Private Key** and save the file as `serviceAccountKey.json` in the project root.
5. Update the `databaseURL` in the code with your Firebase Realtime Database URL.

---

## Usage

### Start the Server

```bash
node app.js
```

The server will run at `http://localhost:3000/`.

### API Endpoints

#### 1. Create an Item

**POST** `/items`

```json
{
  "name": "Item Name",
  "description": "Item Description"
}
```

Response:

```json
{
  "message": "Item created successfully",
  "item": {
    "id": "unique-id",
    "name": "Item Name",
    "description": "Item Description"
  }
}
```

#### 2. Retrieve All Items

**GET** `/items`
Response:

```json
[
  {
    "id": "unique-id",
    "name": "Item Name",
    "description": "Item Description"
  }
]
```

#### 3. Retrieve an Item by ID

**GET** `/items/:id`
Response:

```json
{
  "id": "unique-id",
  "name": "Item Name",
  "description": "Item Description"
}
```

#### 4. Update an Item by ID

**PUT** `/items/:id`

```json
{
  "name": "Updated Name",
  "description": "Updated Description"
}
```

Response:

```json
{
  "message": "Item updated successfully",
  "item": {
    "id": "unique-id",
    "name": "Updated Name",
    "description": "Updated Description"
  }
}
```

#### 5. Delete an Item by ID

**DELETE** `/items/:id`
Response:

```json
{
  "message": "Item deleted successfully"
}
```

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for creating RESTful APIs.
- **Firebase Admin SDK**: To interact with Firebase Realtime Database.
- **Body-parser**: Middleware to parse incoming JSON requests.

---
