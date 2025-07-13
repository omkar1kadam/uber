# Uber Backend API Documentation

## `/users/register` Endpoint

### **Description**

Registers a new user in the system. This endpoint validates the input, hashes the password, creates a user, and returns an authentication token along with the user data.

### **Method**

`POST`

### **URL**

`/users/register`

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourPassword123"
}
```

#### **Field Requirements**

- `fullName.firstname` (string, required): Minimum 3 characters
- `fullName.lastname` (string, optional): Minimum 3 characters if provided
- `email` (string, required): Must be a valid email address
- `password` (string, required): Minimum 6 characters

### **Responses**

#### **Success**

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60f7c2b8e1d3c2a5b8e1d3c2",
      "fullName": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // other user fields
    }
  }
  ```
- **Example Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY3YzJiOGUxZDNjMmE1YjhlMWQzYzIiLCJpYXQiOjE2MjYwODQwMDB9.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567",
    "user": {
      "_id": "60f7c2b8e1d3c2a5b8e1d3c2",
      "fullName": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### **Validation Error**

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

#### **Other Errors**

- **Status Code:** `500 Internal Server Error`
- **Body:** Error details

### **Notes**

- Passwords are securely hashed before storage.
- The returned token can be used for


## `/users/login` Endpoint

### **Description**

Authenticates an existing user. This endpoint checks the provided credentials, and if valid, returns an authentication token along with the user data.

### **Method**

`POST`

### **URL**

`/users/login`

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourPassword123"
}
```

#### **Field Requirements**

- `email` (string, required): Must be a valid email address
- `password` (string, required): User's password

### **Responses**

#### **Success**

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60f7c2b8e1d3c2a5b8e1d3c2",
      "fullName": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // other user fields
    }
  }
  ```
- **Example Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY3YzJiOGUxZDNjMmE1YjhlMWQzYzIiLCJpYXQiOjE2MjYwODQwMDB9.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567",
    "user": {
      "_id": "60f7c2b8e1d3c2a5b8e1d3c2",
      "fullName": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### **Validation Error**

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

#### **Authentication Error**

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

#### **Other Errors**

- **Status Code:** `500 Internal Server Error`
- **Body:** Error details

### **Notes**

- The returned token can be used