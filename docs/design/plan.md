# Plan — AutoMeet

> Written after specification. Every decision here must trace back to a requirement ID.

## 1. Approach Summary
AutoMeet will be built in two stages: a front-end prototype using placeholder data to validate the main user journey, and a later integration with authentication, PHP, and MySQL/MariaDB. The first stage will focus on browsing car shows, viewing event details, and completing registration flows in a clear and simple interface. Once the prototype satisfies the core requirements in R1–R9, the project can be extended to persistent user and registration data while keeping the scope aligned with the business case and specification.

## 1.5 Tech Stack
- Frontend: HTML, CSS, and JavaScript
- Backend/DB: PHP and MySQL/MariaDB for later implementation
- Hosting/Local dev: WAMP for local development
- Other services/APIs: Git and GitHub for source control and project tracking

## 2. Key Decisions (ADRs)

| ADR # | Decision | Traces to (R#) | Alternatives considered | Why this one |
|-------|----------|------------------|---------------------------|----------------|
| ADR-00 | Build the first release as a front-end prototype with static placeholder car-show data before adding backend integration | R3, R4, R5, R6, R7, R8 | Full backend-first build; direct database implementation | This keeps the first release focused on validating the user flow and reduces the risk of building a complex system before confirming the interface and requirements |
| ADR-01 | Use HTML, CSS, and JavaScript for the interface, with PHP and MySQL/MariaDB added later for persistent data and authentication | R1–R9 | React, Node.js, or a more advanced framework stack | The project’s existing direction and the WAMP environment support this stack, and it stays realistic for a student project with limited scope |
| ADR-02 | Restrict registration and private user data to logged-in users through session-based access rules | R2, R5, R8, R9 | Public registration without authentication | This meets the specification’s security requirement and prevents unauthorized access to user and registration information |
| ADR-03 | Prevent duplicate registrations by checking whether a user already has a registration for the same car show | R5, R6 | Allowing repeated registration attempts | This is explicitly required by the specification and preserves clean, accurate event attendance records |

## 3. Components / Building Blocks
List the major pieces (screens, services, data stores). No code — just names and purpose.

| Component | Purpose | Related requirements |
|-----------|---------|------------------------|
| Signup page | Creates a new user account for a first-time user | R1 |
| Login page | Authenticates a registered user and begins the session | R2, R8 |
| Car show listing page | Displays available events for browsing and discovery | R3 |
| Car show detail page | Shows the selected event’s information such as title, date, location, and description | R4 |
| Registration action | Allows a logged-in user to register for a selected car show | R5, R8 |
| Duplicate-registration guard | Prevents a user from registering for the same car show more than once | R6 |
| Registered-events view | Lists the car shows the user has already registered for | R7 |
| User account and registration data | Stores account records and registration relationships in a secure and authorized manner | R1, R2, R5, R7, R9 |

## 4. Dependencies & Assumptions
- External services/tools needed: WAMP, PHP, MySQL/MariaDB, browser development tools, Git/GitHub
- Assumptions being made: the first release will use a small placeholder list of car shows rather than live event feeds; user authentication will be implemented after the front-end flow is validated; all private account data and registrations will be protected by access controls; the project remains focused on the browse-and-register flow described in the specification and does not add organizer tools, payments, or social features

## 5. Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| Prototype fails to validate the core user journey before backend work begins | Medium | Medium | Review the prototype against R3–R8 before moving to PHP/database integration | Project Owner |
| Duplicate registration is missed in the UI or data layer | Medium | High | Add a clear duplicate-check before saving every registration and test this scenario explicitly | Developer |
| Unauthorized access to private user data | Low | High | Require login for registration-related actions and validate authorization on private pages | Developer |
| Scope expands beyond the approved AutoMeet requirements | Medium | Medium | Keep the release limited to browse, detail, registration, and registered-events flows only | Project Owner |
| Local PHP/MySQL environment is not ready when integration starts | Medium | High | Set up and verify WAMP and database connections early in the build sequence | Developer |

## 6. Sequencing
1. Confirm the page structure and placeholder car-show dataset for the prototype. This establishes the content and layout needed to validate the browse and detail flow in R3–R4.
2.Build the signup and login interface for the prototype using placeholder behavior before backend authentication is added.
3. Build the car show listing page and event detail page. This allows users to discover and inspect events before committing to registration.
4. Implement the registration action and duplicate-registration check. This addresses R5 and R6, which are central to the product’s core functionality.
5. Build the registered-events view. This satisfies R7 and confirms that the app can display a user’s event history properly.
6. Review responsiveness, accessibility, and flow completeness against the specification. This ensures the prototype works before longer-term backend integration.
7. Connect the prototype to PHP and MySQL/MariaDB, then apply secure session and authorization checks. This final stage brings the project from prototype to a working persistent system while preserving the requirements in R1–R9.

## 7. Review & Approval
| Reviewer | Date | Approved? |
|----------|------|-----------|
| Mustafa Almajmaie | 09/23/2026 | Yes |

