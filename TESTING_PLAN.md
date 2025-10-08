# Naebak.com Authentication System Testing Plan

## 1. Testing Objectives

- Verify that users can successfully register for each of the following account types: Citizen, Candidate, and Current MP.
- Ensure that Admin and Manager accounts cannot be created through the public registration form.
- Validate that all user roles can log in and are redirected to their respective dashboards.
- Confirm that role-specific dashboards display the correct components and data.
- Test access control to ensure that users with different roles have the appropriate permissions.
- Verify that user session is persisted across browser sessions.

## 2. Test Accounts

The following test accounts will be created in the Supabase database to facilitate testing:

| Role        | Email                  | Password      | First Name | Last Name | Notes                                      |
|-------------|------------------------|---------------|------------|-----------|--------------------------------------------|
| Admin       | admin@naebak.com       | `securePassword` | Admin      | User      | To be created manually in Supabase.        |
| Manager     | manager@naebak.com     | `securePassword` | Manager    | User      | To be created manually in Supabase.        |
| Citizen     | citizen@naebak.com     | `securePassword` | Citizen    | User      | To be registered via the registration form. |
| Candidate   | candidate@naebak.com   | `securePassword` | Candidate  | User      | To be registered via the registration form. |
| Current MP  | mp@naebak.com          | `securePassword` | MP         | User      | To be registered via the registration form. |

## 3. Test Cases

### 3.1. Registration

- **TC-REG-01:** Attempt to register a new Citizen account.
- **TC-REG-02:** Attempt to register a new Candidate account.
- **TC-REG-03:** Attempt to register a new Current MP account.
- **TC-REG-04:** Verify that the registration form does not allow the creation of Admin or Manager accounts.

### 3.2. Login and Redirection

- **TC-LOG-01:** Log in as an Admin user.
- **TC-LOG-02:** Log in as a Manager user.
- **TC-LOG-03:** Log in as a Citizen user.
- **TC-LOG-04:** Log in as a Candidate user.
- **TC-LOG-05:** Log in as a Current MP user.

### 3.3. Dashboard Access and Functionality

- **TC-DASH-01:** Verify that the Admin user is redirected to the Admin Dashboard.
- **TC-DASH-02:** Verify that the Manager user is redirected to the Manager Dashboard.
- **TC-DASH-03:** Verify that the Citizen user is redirected to the Citizen Dashboard.
- **TC-DASH-04:** Verify that the Candidate user is redirected to the Candidate Dashboard.
- **TC-DASH-05:** Verify that the Current MP user is redirected to the MP Dashboard.

### 3.4. Access Control

- **TC-AC-01:** As a Citizen user, attempt to access the Admin Dashboard.
- **TC-AC-02:** As a Candidate user, attempt to access the Admin Dashboard.
- **TC-AC-03:** As a Current MP user, attempt to access the Admin Dashboard.
- **TC-AC-04:** As an Admin user, attempt to access the Citizen Dashboard.

### 3.5. Session Persistence

- **TC-SESS-01:** Log in as any user, close the browser tab, and reopen it to verify that the user is still logged in.

