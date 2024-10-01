/**  An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/new-verification",
];

/**  An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = ["/login", "/register"];

/**  The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**  A route pattern for routes that are protected for patients
 * Any route that starts with "/patient" should be protected
 * @type {string}
 */
export const patientProtectedRoute: string = "/patient";

/**  A route pattern for routes that are protected for doctors
 * Any route that starts with "/doctor" should be protected
 * @type {string[]}
 */
export const doctorProtectedRoute: string[] = [
  "/doctor/settings",
];

/**
 * Redirect path after logging in
 * @type {string}
 */
export const DOCTOR_LOGIN_REDIRECT: string =
  "/doctor/settings";

export const PATIENT_LOGIN_REDIRECT: string =
  "/patient/settings";

/**
 * Redirect path for OAuth users to select their role
 * @type {string}
 */
export const OAUTH_ROLE_SELECTION_REDIRECT: string =
  "/role-selection";
