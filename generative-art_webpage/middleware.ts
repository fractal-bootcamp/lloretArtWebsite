// import { clerkMiddleware, getAuth, ClerkMiddlewareAuth } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';
// import { Request } from '@clerk/clerk-sdk-node';

// export default clerkMiddleware((req: RequestLike<ClerkMiddlewareAuth>) => {
//     const { pathname } = req.nextUrl;

//     // Define routes that should be publicly accessible
//     const publicPaths = ['/', '/api/public'];

//     if (publicPaths.includes(pathname)) {
//         return NextResponse.next();
//     }

//     const auth = getAuth(req);

//     if (!auth.userId) {
//         return NextResponse.redirect('/signin');
//     }

//     return NextResponse.next();
// });

// export const config = {
//     matcher: ['/api/:path*', '/((?!_next|static|favicon.ico).*)'],
// };
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};