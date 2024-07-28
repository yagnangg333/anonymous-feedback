# Anonymous Feedback

Anonymous Feedback is a platform that allows individuals to receive anonymous feedback. Users can create an account, share a unique link on their social media accounts, and receive feedback anonymously.


## Overview

Anonymous Feedback provides a secure and straightforward way for individuals to receive anonymous feedback. Once you sign up and verify your account, you will be redirected to a personalized dashboard where you can manage and view your feedback messages.

## Features

- **Account Creation:** Sign up with email verification using OTP.
- **Anonymous Feedback:** Share your unique feedback link on social media.
- **Dashboard:** Manage and view received feedback messages.

## Technology Stack

- **Frontend & Backend:** Next.js
- **Email Sending System:** Resend

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/yagnangg333/anonymous-feedback.git
    cd anonymous-feedback
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:

    ```env
    MONGODB_URI = " "
    RESEND_API_KEY = " "
    NEXTAUTH_SECRET = " "
    HUGGINGFACE_API_KEY = " "
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Sign Up:** Go to the sign-up page, enter your email, and complete the OTP verification.
2. **Dashboard:** After signing up, you will be redirected to your dashboard.
3. **Share Link:** Copy the unique feedback link from your dashboard and share it on your social media accounts.
4. **Receive Feedback:** Anonymous users can now send feedback to you via the shared link. You can view and manage these messages on your dashboard.
