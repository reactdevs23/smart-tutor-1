import { NextRequestWithAuth, withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        // console.log("url", request.nextUrl)
        // if (request.nextUrl.pathname.startsWith("/extra")
        //     && request.nextauth.token?.role !== "admin") {
        //     return NextResponse.rewrite(
        //         new URL("/denied", request.url)
        //     )
        // }

        // if (request.nextUrl.pathname.startsWith("/dashboard")
        //     && request.nextauth.token?.role !== "admin"
        //     && request.nextauth.token?.role !== "user") {
        //     return NextResponse.rewrite(
        //         new URL("/denied", request.url)
        //     )
        // }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)


// export const config = { matcher: ["/:path*"] }
