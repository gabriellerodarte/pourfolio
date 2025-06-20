# pourfolio 🍸

**pourfolio** is a full-stack cocktail recipe manager built with Flask and React. It allows users to create and curate personalized cocktail recipes, organized by spirit. The app emphasizes sleek design, intuitive UX, and minimalist CSS styling.

After logging in or signing up, users can add spirits (like gin, whiskey, rum, etc.) and associate cocktail recipes with them. Each cocktail includes a name, ingredient list, and detailed instructions. Users can edit or delete cocktails, and the interface updates in real time based on application state.

The application uses a Flask backend with SQLalchemy models and React frontend with Formik for form handling and validation. All routes are authenticated and data is tied to the logged-in user, ensuring users only see their own recipes.

---

## Backend: Flask Routes & Controllers

The `app.py` file registers the Flask app and defines all API endpoints using `Flask-Restful`. It handles authentication, session management, and CRUD operations for both spirits and cocktails. The user must be logged in to access protected resources like creating cocktails or viewing spirits.

---

### 🔐 Auth Routes

#### `POST /signup` — Signup
Creates a new user. Stores a hashed password, starts a session by saving the `user_id`, and returns the user (excluding the password).

#### `POST /login` — Login
Authenticates an existing user. If valid, stores `user_id` in the session and returns the user’s data plus all of their spirits and cocktails, grouped by spirit.

#### `GET /check_session` — Check Session
Returns the currently logged-in user’s data along with their spirits and cocktails. Ensures persistent login state between page refreshes.

#### `DELETE /logout` — Logout
Logs out the user by clearing the session's `user_id`.

---

### 🥃 Spirit Routes

#### `GET /spirits`
Returns a list of all spirits in the database, regardless of user. Used to populate the dropdown when creating new cocktails.

#### `POST /spirits`
Adds a new spirit to the database. Requires an authenticated session. The new spirit is available to all users.

> **Note:** The Spirit model is shared among all users — the app differentiates a user’s personal cocktail list by `user_id` on the cocktail, not the spirit.

---

### 🍸 Cocktail Routes

#### `POST /cocktails`
Creates a new cocktail tied to the logged-in user and an existing spirit. Ingredients are stored as a string with `\n` separators for each line.

#### `PATCH /cocktails/<id>`
Allows the user to edit a cocktail. Only the owner of the cocktail (`user_id` match) can update it. Expects an object with updated `name`, `ingredients`, and `instructions`.

#### `DELETE /cocktails/<id>`
Deletes a cocktail if the logged-in user owns it.

---

## Models Overview

All models are defined using SQLAlchemy ORM and include serialization rules for clean API responses. Each model validates its fields and uses relationships to connect data meaningfully.

---

### 👤 User Model

Represents an individual account in POURfolio. Users can create cocktail recipes tied to specific spirits.

- `id`: Primary key.
- `username`: Must be unique and not null.
- `_password_hash`: Stores a hashed version of the password using Bcrypt.
- `cocktails`: One-to-many relationship to the Cocktail model.
- `spirits`: Indirect many-to-many-like proxy through cocktails.

#### 🔐 Authentication
- `password_hash`: A write-only property that hashes the user's password on assignment.
- `authenticate(password)`: Compares an input password to the stored hash.

#### Serialization
- Excludes `_password_hash` and full cocktail list by default.

---

### 🍸 Cocktail Model

Represents an individual cocktail recipe, including its name, ingredients (as a newline-separated string), and instructions.

- `id`: Primary key.
- `name`: Required.
- `ingredients`: Multiline string field.
- `instructions`: Required steps to make the drink.
- `user_id`: Foreign key linking the cocktail to a user.
- `spirit_id`: Foreign key linking the cocktail to a spirit.

#### Relationships
- `user`: Each cocktail belongs to one user.
- `spirit`: Each cocktail is made with one spirit.

#### Validations
- Ensures `name`, `ingredients`, and `instructions` are present.
- Confirms valid `user_id` and `spirit_id` exist in the database.

---

### 🥃 Spirit Model

Represents a base liquor (e.g., gin, vodka, tequila) shared across all users. Spirits are global and not user-specific.

- `id`: Primary key.
- `name`: Must be unique and lowercase.
- `cocktails`: One-to-many relationship to cocktails made with this spirit.
- `users`: Proxy relationship through cocktails.

#### Validations
- Ensures `name` is present and formatted cleanly (`.lower().strip()`).

#### Serialization
- Avoids nesting cocktail and user data for leaner API responses.

---

## Frontend Files

### `App.js`
Sets up routing and conditionally renders the navbar and footer if a user is logged in.

### `UserContext.js`
Holds global state for `user`, `userSpirits`, and `loggedIn` status. Shared across the app.

---

### `Home.js`
- Displays the app title and a brief tagline.
- If logged in, shows a welcome message; if not, shows links to log in or sign up.

---

### `NavBar.js`
- Conditionally displays navigation links to:
  - Home
  - View My Spirits
  - Browse All Spirits
- Includes logout button that resets global state and redirects to home.

---

### `Login.js` / `Signup.js`
- Built using **Formik** and **Yup**
- Handles authentication
- Displays errors on failed login or invalid signup form

**Functions:**
- `onSubmit`: Submits credentials to the backend and updates context/global state
- `LoginSchema` / `SignupSchema`: Defines Yup validation

---

### `MySpirits.js`
- Lists all spirits that the user has cocktail recipes associated with, as well as the number of cocktails under each
- Clicking a spirit navigates to a list of that spirit’s cocktails
- Allows adding a new cocktail or new spirit

**Functions:**
- `setShowCocktailForm`: Toggles new cocktail form display
- `navigate(...)`: Routes to cocktail detail page

---

### `NewCocktailForm.js`
- A Formik form for submitting a new cocktail recipe
- Includes tooltip helper text for formatting ingredients and instructions

**Functions:**
- `onSubmit`: Sends the cocktail to the backend and resets the form
- `CocktailSchema`: Yup schema to ensure all fields are filled out

---

### `NewSpiritForm.js`
- A small Formik form to add a new spirit
- Updates the global spirits list in context after successful submission

---

### `CocktailCards.js`
- Displays a list of cocktail names for a given spirit
- Each card is styled and links to a detailed view of the recipe

---

### `CocktailRecipe.js`
- Shows full details of the cocktail: name, ingredients (rendered as a list), and instructions
- Offers edit and delete buttons

**Functions:**
- `handleDelete`: Deletes the cocktail and conditionally navigates depending on how many cocktails remain under that spirit

---

### `EditCocktail.js`
- Pre-fills a Formik form with the current recipe’s data
- Allows users to update name, ingredients, and instructions
- Uses tooltips for instruction help

**Functions:**
- `onSubmit`: PATCHes the edited data to the backend and updates state
- `handleDelete`: Triggers modal confirmation and performs delete logic

---

### `ErrorPage.js`
- Handles rendering errors using `useRouteError`
- Can be passed as `errorElement` in route definitions

---

## 🎨 Styling

All styles are written in **vanilla CSS**, favoring a minimalist and modern aesthetic. Font sizes, layout spacing, and card styles are consistent across pages. Tooltips, modals, and hover states are customized to match the POURfolio theme.

---

## 🧪 Future Enhancements

- User profile customization
- Cocktail image support
- Search and filtering by ingredient or spirit
- Shareable links or QR codes
- Print-friendly prep cards

---

