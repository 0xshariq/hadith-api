# Hadith API

This API provides access to Hadith data and user-related functionalities. Below is an explanation of the available routes, their corresponding controllers, and error handling responses.

---

## Routes and Controllers

### Hadith Routes

#### 1. **Get Hadith by Number**
- **Route**: `/api/v1/hadith/:edition/:number`
- **Controller**: `getHadithByNumber`
- **Description**: Fetches a specific Hadith by its edition and number.
- **Parameters**:
  - `edition`: The edition of the Hadith in the format `language-editionName` (e.g., `en-sahihbukhari`).
  - `number`: The number of the Hadith in the specified edition.
- **Response**:
  - Returns the Hadith data in JSON format.
  - If the `edition` or `number` is invalid, returns a `400` error with an appropriate message.

#### 2. **Get All Editions**
- **Route**: `/api/v1/hadith/editions`
- **Controller**: `getAllEditions`
- **Description**: Fetches a list of all available Hadith editions.
- **Response**:
  - Returns a JSON array of all editions.
  - If an error occurs, returns a `500` error with an appropriate message.

#### 3. **Get Sections**
- **Route**: `/api/v1/hadith/:edition/sections/:number`
- **Controller**: `getSections`
- **Description**: Fetches a specific section of a Hadith edition by its number.
- **Parameters**:
  - `edition`: The edition of the Hadith in the format `language-editionName` (e.g., `en-sahihbukhari`).
  - `number`: The section number in the specified edition.
- **Response**:
  - Returns the section data in JSON format.
  - If the `edition` or `number` is invalid, returns a `400` error with an appropriate message.

#### 4. **Get Hadith API Info**
- **Route**: `/api/v1/hadith/info`
- **Controller**: `getInfo`
- **Description**: Fetches general information about the Hadith API.
- **Response**:
  - Returns the API information in JSON format.
  - If an error occurs, returns a `500` error with an appropriate message.

---

### User Routes

#### 1. **Register User**
- **Route**: `/api/v1/users/register`
- **Controller**: `createUser`
- **Description**: Registers a new user.
- **Request Body**:
  - `name`: The name of the user.
  - `email`: The email address of the user.
  - `password`: The password for the user.
- **Response**:
  - Returns a success message and user details upon successful registration.
  - If validation fails, returns a `400` error with an appropriate message.

#### 2. **Login User**
- **Route**: `/api/v1/users/login`
- **Controller**: `loginUser`
- **Description**: Logs in an existing user.
- **Request Body**:
  - `email`: The email address of the user.
  - `password`: The password for the user.
- **Response**:
  - Returns a success message and authentication token upon successful login.
  - If credentials are invalid, returns a `401` error with an appropriate message.

#### 3. **Logout User**
- **Route**: `/api/v1/users/logout`
- **Controller**: `logoutUser`
- **Description**: Logs out the currently logged-in user.
- **Response**:
  - Clears the authentication cookie and returns a success message.
  - If an error occurs during logout, returns a `500` error with an appropriate message.

---

## Error Handling

All controllers use a centralized error handler to handle errors consistently. Errors are returned in the following format:

```json
{
  "success": false,
  "error": "Error message",
  "stack": "Error stack trace (only in development mode)"
}

## Common Error Responses
 - 400 Bad Request: Returned when the request parameters or body are invalid.
 - 401 Unauthorized: Returned when authentication fails or the user is not logged in.
 - 500 Internal Server Error: Returned when an unexpected error occurs on the server.
