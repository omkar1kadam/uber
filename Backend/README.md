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


## `/users/profile` Endpoint

### **Description**

Returns the authenticated user's profile information. Requires a valid authentication token.

### **Method**

`GET`

### **URL**

`/users/profile`

### **Headers**

- `Authorization: Bearer <token>` (if not using cookies)

### **Responses**

#### **Success**

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "60f7c2b8e1d3c2a5b8e1d3c2",
    "fullName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // other user fields
  }
  ```

#### **Authentication Error**

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "No token provided, authorization denied"
  }
  ```
  or
  ```json
  {
    "message": "Token is not valid"
  }
  ```
  or
  ```json
  {
    "message": "User not found"
  }
  ```

### **Notes**

- You must be logged in and provide a valid token to


## `/users/logout` Endpoint

### **Description**

Logs out the authenticated user by blacklisting their token and clearing the authentication cookie.

### **Method**

`GET`

### **URL**

`/users/logout`

### **Headers**

- `Authorization: Bearer <token>` (if not using cookies)

### **Responses**

#### **Success**

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out"
  }
  ```

#### **Authentication Error**

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "No token provided, authorization denied"
  }
  ```
  or
  ```json
  {
    "message": "unauthorized token broo"
  }
  ```

### **Notes**

- You must be logged in and provide a valid token to access this endpoint.
- The token will be blacklisted


## Captain Endpoints

---

## `/captains/register` Endpoint

### **Description**

Registers a new captain in the system. Validates input, hashes the password, creates a captain, and returns an authentication token with captain data.

### **Method**

`POST`

### **URL**

`/captains/register`

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourPassword123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### **Field Requirements**

- `fullname.firstname` (string, required): Minimum 3 characters
- `fullname.lastname` (string, optional): Minimum 3 characters if provided
- `email` (string, required): Must be a valid email address
- `password` (string, required): Minimum 6 characters
- `vehicle.color` (string, required): Minimum 3 characters
- `vehicle.plate` (string, required): Minimum 3 characters
- `vehicle.capacity` (integer, required): Minimum 1
- `vehicle.vehicleType` (string, required): One of `car`, `motorcycle`, `auto`

### **Responses**

#### **Success**

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "_id": "60f7c2b8e1d3c2a5b8e1d3c2",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // other captain fields
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

---

## `/captains/login` Endpoint

### **Description**

Authenticates an existing captain. Checks credentials and returns an authentication token with captain data.

### **Method**

`POST`

### **URL**

`/captains/login`

### **Request Body**

```json
{
  "email": "jane.smith@example.com",
  "password": "yourPassword123"
}
```

#### **Field Requirements**

- `email` (string, required): Must be a valid email address
- `password` (string, required): Captain's password

### **Responses**

#### **Success**

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "_id": "60f7c2b8e1d3c2a5b8e1d3c2",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // other captain fields
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
    "message": "Invalid email or password"
  }
  ```

#### **Other Errors**

- **Status Code:** `500 Internal Server Error`
- **Body:** Error details

---

## `/captains/profile` Endpoint

### **Description**

Returns the authenticated captain's profile information. Requires a valid authentication token.

### **Method**

`GET`

### **URL**

`/captains/profile`

### **Headers**

- `Authorization: Bearer <token>`

### **Responses**

#### **Success**

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "captain": {
      "_id": "60f7c2b8e1d3c2a5b8e1d3c2",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // other captain fields
    }
  }
  ```

#### **Authentication Error**

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

## `/captains/logout` Endpoint

### **Description**

Logs out the authenticated captain by blacklisting their token and clearing the authentication cookie.

### **Method**

`GET`

### **URL**

`/captains/logout`

### **Headers**

- `Authorization: Bearer <token>`

### **Responses**

#### **Success**

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logout successfully"
  }
  ```

#### **Authentication Error**

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

### **Notes**

- All captain endpoints require a valid token for authentication except registration and login.
- Vehicle details are required for registration.
- The token will be blacklisted on logout and cannot