# Tasks — AutoMeet

> Derived from the plan and specification. Each task is small, checkable, and traceable to a requirement or architecture decision.

## Task List

| ID | Task | Traces to (R# / ADR#) | Depends on | Status |
|----|------|--------------------------|------------|--------|
| T1 | Review the existing template application and identify reusable components, layouts, navigation, and styling that can support the AutoMeet prototype | ADR-00, ADR-01 | — | Not started |
| T2 | Adapt the existing template branding, layout, and interface so the application clearly represents AutoMeet | ADR-01, R3, R4 | T1 | Not started |
| T3 | Adapt the placeholder data model to support the required car-show information: title, date, time, location, description, image, and event type/category where relevant | ADR-00, R3, R4 | T1 | Not started |
| T4 | Add realistic placeholder car-show data for use across the front-end prototype | R3, R4 | T3 | Not started |
| T5 | Adapt the main event listing view so users can browse available car shows in a clean, scannable layout | R3 | T2, T4 | Not started |
| T6 | Ensure each event listing clearly displays the title, date, location, and image for quick browsing decisions | R3, R4 | T5 | Not started |
| T7 | Build or adapt the car-show detail view so users can inspect the full information for a selected event | R4 | T5 | Not started |
| T8 | Add date and location filtering to the car-show listing only if it is confirmed as a requirement in the specification. | ADR-00, ADR-01 | T5 | Not started |
| T9 | Build the signup and login interface using placeholder behavior only, with no real authentication yet | R1, R2, ADR-01 | T2 | Not started |
| T10 | Build the front-end registration or RSVP interaction for a logged-in user on the car-show detail view | R5, R8 | T7, T9 | Not started |
| T11 | Prevent or visually handle duplicate event registration attempts in the prototype before backend validation is added | R6, ADR-03 | T10 | Not started |
| T12 | Build the registered-events view so a user can see the car shows they already registered for | R7 | T10 | Not started |
| T13 | Confirm navigation between the main AutoMeet screens works correctly across listings, details, login, signup, and registered-events views | R3, R4, R5, R7, ADR-01 | T5, T7, T9, T12 | Not started |
| T14 | Review the prototype for responsive design, usability, and accessibility issues and correct any obvious problems | R3, R4, R5, R7, R9 | T5, T7, T9, T12 | Not started |
| T15 | Compare the completed front-end prototype to the specification and resolve any missing or inconsistent requirements before moving to backend integration | R1, R2, R3, R4, R5, R6, R7, R8, R9, ADR-00, ADR-01, ADR-02, ADR-03 | T13, T14 | Not started |

**Status values:** Not started · In progress · Done · Blocked

## Definition of Done (applies to every task)
- Matches its linked requirement's acceptance criteria in the specification.
- Reviewed by a human before marked done
- No task marked done without a test passing

## Blocked / Questions
| Task | Blocker | Raised | Resolved |
|------|---------|--------|----------|
| T8 | Date and location filtering is not currently required by the specification, so it should only be added if the requirement is confirmed. |2026-09-24 | Open |
