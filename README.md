# School Management API

## Description
Yeh project ek simple Node.js API hai jisme hum schools ke data ko add kar sakte hain aur user ke location ke hisaab se schools ko doori ke anusar list kar sakte hain.

## Technologies Used
- Node.js
- Express.js
- MySQL database
- Nodemon (development ke liye server auto restart)

---

## APIs

### 1. Add School

- **URL:** `/addSchool`
- **Method:** POST
- **Request Body:**

```json
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 26.2,
  "longitude": 78.1
}
