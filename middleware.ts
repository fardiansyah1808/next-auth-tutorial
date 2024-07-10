import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import {
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
  DEFAULT_REDIRECT_PATH,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isOnPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isOnAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isOnAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_PATH, nextUrl));
    }
    return;
  }

  if (isOnPublicRoute) {
    return;
  }

  if (!isLoggedIn && !isOnPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
