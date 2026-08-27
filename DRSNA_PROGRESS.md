# DrSna Development Progress Backup

**Date:** August 27, 2026
**State:** End of Day

## 0. Workspace Architecture
* **Frontend Repository (React/Vite):** `c:\Users\DELL\IdeaProjects\DrSnna2`
* **Backend Repository (Kotlin/Spring Boot):** `c:\Users\DELL\IdeaProjects\DrSna`

## 1. What We Completed Today
* **Doctor Management:** The `ClinicDoctors.jsx` screen is fully wired up to the Kotlin backend.
* **Add/Edit Doctor:** Fixed the ID mapping bug (`doctorUserId` vs `id`) so editing works seamlessly.
* **Delete Doctor:** Implemented hard-deletion. Clicking delete now fires `DELETE /api/clinic/doctors/{doctorId}` and we modified `ClinicAdminService.kt` to explicitly call `userRepository.deleteById(doctorUserId)` so the row is completely wiped from the DB.
* **Manage Working Hours:** Completed the schedule syncing! The frontend now concurrently sends `POST` requests for checked days, and `DELETE` requests for un-checked days to keep the database in perfect sync. 

## 2. Where We Left Off (Next Steps)
We just started looking at the **Clinic Info Screen** (`ClinicProfileSettings.jsx`). 
We found several discrepancies between the frontend form and the backend `ClinicProfileRequest`:
1. **Checking Fee:** Missing from the UI entirely (needs to be added).
2. **Introduction:** Named `introduction` in UI, but `description` in backend.
3. **Phones:** UI has `primaryPhone` & `emergencyPhone`, backend only has `phoneNumber`.
4. **Socials:** UI has `instagram` & `facebook`, backend only has `socialLinks`.
5. **Address:** UI is granular (`streetAddress`, `city`, `state`, `zipCode`), backend is a single string `detailedAddress`.
6. **Specialties & Hours:** UI has them built into the main form, but the backend requires them to be saved via completely separate endpoints (`/api/clinic/specialties` and `/api/clinic/schedules/clinic-hours`).

**The Pending Question:**
Do we want to magically stitch these mismatched fields (Phones, Socials, Address) together in the frontend right before sending them to the backend? Or do we want to update the Kotlin backend to explicitly support all these separate granular fields?

*(Just tell the AI what you prefer, and it will pick up right here!)*
