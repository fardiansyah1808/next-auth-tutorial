/**
 * An array of routes that are public and can be accessed by anyone
 * this routes dont require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/confirm-email"];

/**
 * An array of routes that are protected and can be accessed by anyone
 * this routes about authentication
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/reset-password",
  "/auth/new-password",
  "/auth/error",
];

/**
 * The prefix of the authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default path to redirect to after successful authentication
 * @type {string}
 */
export const DEFAULT_REDIRECT_PATH = "/settings";
