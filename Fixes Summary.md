# Changelog & Fixes Summary

## 1. Authentication & Session Persistence
* **Resolved 500 Optimistic Lock Crash on Login**:
  * Fixed `StaleObjectStateException` / `ObjectOptimisticLockingFailureException` caused by Hibernate expecting 1 affected row when deleting obsolete refresh tokens.
  * Standardized `RefreshTokenRepository` to return nullable entities (`RefreshToken?`) and managed session deletion cleanly via JPA without unmanaged row-count conflicts.
  * Ensured `RefreshToken` entity alignment with correct parameter names (`expiryDate`).
* **Full-Stack Refresh Token Deletion on Logout (Admin & Clinic)**:
  * Resolved an issue where logging out as Clinic or Admin left active refresh token entries in PostgreSQL and will be implemented on doctor when dashboard is done/made.

---

## 2. API Query Filtering for clinics in patient dashboard
* **Clinic & Doctor Search Filters**:
  * Fixed an HTTP 500 Internal Server Error when filtering clinics (`/api/patient/clinics?name=&city=ALL+CITIES`) where they weren't the citys weren't matching in the fronted and backend.
  * Updated `cleanQueryParams` in `patientApi.js` using an explicit `Set` blacklist to strip empty strings (`""`), `"ALL"`, `"ALL CITIES"`, `"ALL SPECIALTIES"`, and `"ANYTIME"`.

---

## 3. User Profile Logic & UI Fixes (`UserProfile.jsx`)
* **Security Verification & Payload Integrity**:
  * Fixed profile update request payload to include `currentPassword` (`verifyPassword`) as required by `UpdateProfileRequest.kt`.
  * Updated city selection options to match valid Jordanian governorate enum values (`BALQA` and `TAFILEH` instead of non-existent `SALT`).
* **Backend Database Persistence**:
  * Added the missing assignment for `user.phoneNumber = request.phoneNumber?.trim()` inside `AuthService.kt` to ensure phone updates persist to the `users` table.

## 4.Code Cleanliness & Static Analysis**:
  * Resolved 30+ WebStorm and ESLint errors/warnings (`no-unused-vars`, unhandled promises, invalid HTML attributes like `value` on `<p>` elements).
  * Fixed variable hoisting / initialization order in `useEffect` hooks.
  * Resolved ESLint `react-hooks/set-state-in-effect` errors by eliminating redundant synchronous state initializers.
  * Cleaned up non-null assertion operators (`!`), redundant wrappers, and type inference mismatches across state setters.