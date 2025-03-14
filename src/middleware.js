export const runtime = 'nodejs'; // Add this line

import { auth } from "@/lib/auth";

export function middleware(req) {
  return auth(req);
}

export const config = {
  matcher: ["/protected-route/:path*"], 
};