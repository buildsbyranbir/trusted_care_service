🏡 Care.xyz (Care.IO)
Baby Sitting & Elderly Care Service Platform

Care.xyz (also known as Care.IO) is a web-based caregiving service platform designed to provide reliable and trusted care services for children, elderly people, and sick family members.
The platform allows users to easily find, book, and manage caregiving services based on their needs, duration, and location.

The main goal of this project is to make caregiving easy, secure, and accessible for everyone.


🎯 Project Objective

Provide a trusted platform for baby care, elderly care, and sick care services

Enable users to securely book caregiving services online

Allow users to track and manage their bookings easily

Ensure a smooth and responsive user experience across all devices

✨ Key Features
🔹 General Features

Responsive Design (Mobile, Tablet, Desktop)

Secure User Authentication

Email & Password Login

Google Social Login

Private Routes for authenticated users

Environment Variable based configuration

Custom 404 Error Page

🔹 Services

Baby Care Service

Elderly Care Service

Sick People Care Service

🔹 Booking System

Dynamic service booking

Select service duration (hours or days)

Select location:

Division

District

City

Area

Address

Automatic total cost calculation
(Duration × Service Charge)

Booking status management:

Pending

Confirmed

Completed

Cancelled

Email invoice sent after successful booking

🔹 User Dashboard

“My Bookings” page for logged-in users

View booking details

Track booking status

Cancel booking if needed

🗺️ Pages & Routes
🏠 Homepage (/)

Hero Banner / Slider with caregiving motivation

About section explaining platform mission

Services overview:

Baby Care

Elderly Care

Sick People Care

Testimonials / Success metrics

🧾 Service Detail Page (/service/:service_id)

Detailed information about the selected service

“Book Service” button

Redirects to Login page if user is not authenticated

📅 Booking Page (/booking/:service_id) (Private Route)

Step-by-step booking process:

Select duration

Select location details

View total cost dynamically

Confirm booking (saved with status = Pending)

Service data fetched from Zapshift resources

🔐 Authentication Pages

Login Page:

Email

Password

Registration Page:

NID Number

Full Name

Email

Contact Number

Password validation:

Minimum 6 characters

At least 1 uppercase letter

At least 1 lowercase letter

Redirect users to intended private route after login or registration

Logged-in users remain authenticated on page reload

📊 My Bookings Page (/my-bookings) (Private Route)

Displays all user bookings with:

Service Name

Duration

Location

Total Cost

Booking Status

Actions:

View Details

Cancel Booking

❌ Error Page (404)

Custom “Page Not Found” message

Button to navigate back to the Home page

🧠 Advanced Features

Dynamic metadata for:

Homepage

Service Detail pages

Email invoice sent to user after booking confirmation

💳 Optional Features (Bonus)

Stripe Payment Integration

Booking creation after successful payment

Admin Dashboard:

View all bookings

View payment history

Manage booking status

🛠️ Technologies Used
Frontend

React.js

React Router

Tailwind CSS

Firebase Authentication

Backend

Node.js

Express.js

MongoDB

Additional Tools & Services

Firebase

Zapshift API

Stripe (Optional)

Nodemailer (Email Invoice)