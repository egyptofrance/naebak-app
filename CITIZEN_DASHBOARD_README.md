# Citizen Dashboard Features (v1.2.1)

This document outlines the new citizen dashboard features implemented in version `v1.2.1` of the naebak-app. These features provide citizens with a personalized portal to view their profile, manage messages, and submit/track complaints.

## 1. Citizen Dashboard Overview (`/citizen`)

**File:** `app/citizen/page.tsx`

This is the main entry point for authenticated citizens. It displays a summary of the user's profile and provides navigation to the messages and complaints sections.

### Key Features:

-   **Profile Display:** Shows the citizen's personal information, including name, job title, location, total points, and registration date.
-   **Tabbed Navigation:** Allows switching between 

three main sections: **الملف الشخصي** (Profile), **الرسائل** (Messages), and **الشكاوى** (Complaints).
-   **Data Fetching:** Securely fetches user data, messages, and complaints from Supabase, ensuring only citizen-specific information is displayed.
-   **Role-Based Access:** Redirects non-citizen users to an unauthorized page, ensuring proper access control.

## 2. Message Management (`/citizen/messages`)

**File:** `app/citizen/messages/page.tsx`

This page allows citizens to view their sent and received messages and compose new messages to MPs or candidates.

### Key Features:

-   **Message List:** Displays a list of all messages, indicating whether they are sent to or received from other users (MPs/Candidates).
-   **Message Status:** Shows the approval status of each message (approved or pending).
-   **New Message Form:** A modal form to compose and send new messages. Users can select an MP or candidate from a dropdown list and enter their message body.
-   **Search and Filter:** Functionality to search messages by content or recipient and filter by approval status.
-   **Supabase Integration:** Handles message submission and retrieval using Supabase client functions.

## 3. Complaint Management (`/citizen/complaints`)

**File:** `app/citizen/complaints/page.tsx`

This page enables citizens to submit new complaints and track the status and details of their existing complaints.

### Key Features:

-   **Complaint List:** Displays a list of all submitted complaints with their title, type, governorate, and current status.
-   **New Complaint Form:** A modal form for submitting new complaints. Users can provide a title, body, select a complaint type and governorate, and choose whether to publish it publicly.
-   **Complaint Details View:** A modal to view the full details of a selected complaint, including its body, assigned representative (if any), and a log of actions taken on it.
-   **Status Indicators:** Visual cues for complaint status (e.g., new, assigned, resolved, rejected).
-   **Search and Filter:** Allows searching complaints by title or body and filtering by status.
-   **Supabase Integration:** Manages complaint submission, retrieval, and status updates via Supabase.

## 4. Integration with Authentication System

-   The `app/dashboard/page.tsx` now correctly redirects authenticated users with the `citizen` role to the `/citizen` dashboard.
-   All data fetching on the citizen dashboard and its sub-pages (`/citizen/messages`, `/citizen/complaints`) relies on the `createClientComponentClient` from `@supabase/auth-helpers-nextjs` to ensure secure, authenticated access to user-specific data.

## 5. Future Enhancements

-   Implement functionality to edit citizen profiles.
-   Add pagination or infinite scrolling to message and complaint lists.
-   Develop detailed views for individual messages and complaints, allowing for replies or further actions.
-   Integrate file attachments for complaints.

## 6. Deployment Instructions

To deploy these changes, ensure you are on the `v1.2.1` branch, commit your changes, and push to GitHub. Vercel will automatically detect the changes and deploy the updated application to production, assuming auto-deployment is configured for the `main` branch and `v1.2.1` is merged into `main`.
