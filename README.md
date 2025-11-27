# 🛒 E-commerce Platform

A comprehensive full-stack e-commerce application designed to simulate a real-world shopping experience. This project features two distinct portals: a customer-facing storefront and a secure admin dashboard for resource management.

Built with performance and scalability in mind using **React (Vite)** on the frontend and **Java Spring Boot** on the backend.

## 🚀 Key Highlights

* **Dual-Interface System:** Separated logic and views for **Customers** and **Administrators**.
* **Secure Payment Integration:** Implemented **VNPAY** (Sandbox environment) for handling checkout transactions.
* **Object Storage:** Utilizes **Minio** for efficient product image storage and retrieval.
* **Security:** Stateless authentication using **JWT** (JSON Web Tokens).

## 🛠️ Tech Stack

### Frontend
* **Framework:** React (built with Vite for speed)
* **State Management:** Redux (Client state)
* **Data Fetching:** TanStack Query (Server state management & caching)
* **Styling:** CSS Modules

### Backend
* **Core:** Java Spring Boot
* **Database:** MySQL
* **Storage:** Minio (S3 Compatible Object Storage)
* **Authentication:** Spring Security + JWT

## ✨ Features

### 🛍️ Client Portal (Customer)
* **Authentication:** User registration and secure login.
* **Product Browsing:** View product lists and detailed product pages.
* **Shopping Cart:** Add/remove items and manage cart quantities.
* **Checkout:** Seamless payment processing via VNPAY Gateway.

### 🔐 Admin Portal (Management)
* **Dashboard Access:** Secure login for administrators.
* **Product Management:** Full CRUD (Create, Read, Update, Delete) operations for inventory.
* **User Management:** View and manage registered customer accounts.

## 🔧 Installation & Setup

**Prerequisites:**
* Node.js & npm
* Java JDK 17+
* MySQL
* Minio Server

**1. Backend Setup**
```bash
cd backend
./mvnw spring-boot:run
