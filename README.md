# Dhondi V12 — V8 student experience + dynamic demo profiles

This is a React/Vite demo. The V8 login/dashboard/sidebar and mentor → HOD → Director permission approval flow are preserved. Student profile content is generated per logged-in mobile number, and each account has its own identity even when supplied roll numbers overlap.

## Run locally
1. Install Node.js LTS.
2. Extract this ZIP and open `dhondi-clone` in VS Code.
3. Run `npm install` then `npm run dev`.

## Login
All demo passwords are `123456`. Enter a registered mobile number; there is no role dropdown.

| Account | Mobile number | Roll number |
|---|---|---|
| Druthi Gouni | `8008803379` | `24R01A6620` |
| Rahul Kumar | `9000000001` | `24R01A6601` |
| Priya Sharma | `9000000002` | `24R01A6602` |
| Ananya Reddy | `9000000003` | `24R01A6603` |
| Sai Kiran Dellapurlolu | `9346098128` | `24R01A6614` |
| Yarllagada Grishmitha | `7416365949` | `24R01A6664` |
| Kulkarni Samiksha | `6303714142` | `24R01A6631` |
| Akshitha | `9573469911` | `24R01A6605` |
| Ponna Spandana | `8522981807` | `24R01A6647` |
| Sathya | `9640442548` | `24R01A6631` |
| Damera Swapnika | `7337241588` | `24R01A6620` |
| Mentor 1 — Shanthi Bimmari | `9100000001` | — |
| Mentor 2 — Dr. K. Sampath | `9100000002` | — |
| Mentor 3 — Annapoorna Basodi | `9100000003` | — |
| HOD — Dr Pilla Srinivas | `9100000004` | — |
| Director — Janga Reddy Madireddy | `9100000005` | — |

## Profile behavior
- Profile page reads the current logged-in student's name, mobile number and roll number.
- Sai Kiran's supplied photo is used for `9346098128`; Druthi's existing photo remains for `8008803379`. Other student photos use initials until provided.
- Parent, school, intermediate college, DOB, and academic/attendance values are demo data and can be replaced when actual profile details are provided.
- Two supplied accounts share roll numbers (`24R01A6631` and `24R01A6620`). They remain separate accounts because the mobile number is used as the unique profile key.

## Permission workflow
- Roll numbers ending 01–26 → Mentor 1
- Roll numbers ending 27–48 → Mentor 2
- Roll numbers ending 49–66 → Mentor 3
- Mentor approval → HOD → Director → final `Approved` status

Requests are saved in browser `localStorage`; use the same browser to test. This is a demo, not a production authentication system or shared multi-device database.


## Permission UI update (V12)
- Student Permissions page follows the supplied reference: Apply Permission and Hostel Permission actions, three-column request cards on desktop, reason, Pending/Approved/Cancelled state, Cancel action for pending requests, and mentor/HOD/director approval status rows.
- Apply Permission form remains centered with permission type, date, time, reason, PDF attachment, and submission routing to the assigned mentor, HOD, and Director.
