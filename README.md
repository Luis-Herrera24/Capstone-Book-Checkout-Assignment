# **Capstone Book Checkout Assignment**

A full-stack web application for managing the availability, checkout, and return of books. The system is built using the MERN stack, with MongoDB Atlas as the database, Express.js for backend routing, React.js for the frontend interface, and Node.js as the runtime environment.

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)


---

## **Project Overview**

The Capstone Book Checkout Assignment is designed to help users view, check out, and return books from an inventory system. The application allows users to check which books are available, check them out for a certain duration, and return them once finished.

---

## **Features**

- **View Available Books**: Users can view a list of all books available for checkout.
- **Book Checkout**: Users can check out books by entering their name and a due date for return.
- **View Checked-Out Books**: Users can see all books that are currently checked out and the details of the borrowers.
- **Book Check-In**: Users can return books, updating their availability in the system.
- **Real-Time Status Updates**: The system dynamically updates book availability.

---

## **Technologies Used**

- **MongoDB Atlas**: Database for storing book information.
- **Express.js**: Backend framework for routing and API creation.
- **React.js**: Frontend framework for building the user interface.
- **Node.js**: JavaScript runtime environment for server-side logic.
- **HTML/CSS**: For basic structure and styling of the frontend.
  
---

## **Setup and Installation**

### Prerequisites

- Node.js (v12+)
- MongoDB Atlas account
- Git

### Installation Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/book-checkout-system.git
    cd book-checkout-system
    ```

2. **Install Backend Dependencies**:
    ```bash
    cd backend
    npm install
    ```

3. **Install Frontend Dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

4. **Configure Environment Variables**:

   - Create a `.env` file in the root directory of the backend with the following variables:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Capstone
     PORT=3000
     ```

5. **Run the Backend**:
    ```bash
    cd backend
    node Backend.js
    ```

6. **Run the Frontend**:
    ```bash
    Open `index.html` in a browser.
    ```

---

## **Usage**

1. **Viewing Available Books**:
   - Navigate to the app’s homepage, and you will see a list of available books. Click on a book to check it out.
   
2. **Checking Out a Book**:
   - Enter your name and the due date (default 30 days from now), and click the checkout button to complete the process.

3. **Viewing Checked-Out Books**:
   - View the list of books currently checked out, along with the borrower's name and due date.

4. **Checking In a Book**:
   - Return a book by clicking the "Check In" button next to the checked-out book.

---

## **API Endpoints**

1. **GET /books**  
   Retrieves all available books.

2. **GET /books/checked-out**  
   Retrieves all checked-out books.

3. **PUT /books/check-out/:title**  
   Check out a book with the given title.  
   - Request Body:
     ```json
     {
       "checkedOutBy": "John Doe",
       "dueDate": "2024-10-31"
     }
     ```

4. **PUT /books/check-in/:title**  
   Check in a book with the given title.
