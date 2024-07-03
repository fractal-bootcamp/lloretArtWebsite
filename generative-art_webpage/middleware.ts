import {
    clerkMiddleware,
    createRouteMatcher
} from '@clerk/nextjs/server';
// import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in', '/sign-up']);

export default clerkMiddleware((auth, request) => {
    if (!isPublicRoute(request)) {
        auth().protect({
            unauthenticatedUrl: request.nextUrl.origin + '/sign-in',
        });
    }
});

// withAuth({
//     // Matches the pages config in `[...nextauth]`
//     pages: {
//         signIn: "/login",
//         error: "/error",
//     },
// });

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
