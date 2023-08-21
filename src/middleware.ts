import { NextRequest, NextResponse } from "next/server"

export default function middleware(req: NextRequest){
    const token = req.cookies.get('auth_token')?.value

    const signInURL = new URL('/login', req.url)
    const homeURL = new URL('/', req.url)

    if(!token){
        if(req.nextUrl.pathname === '/login'){
            return NextResponse.next()
        }
        return NextResponse.redirect(signInURL)
    }

    if (req.nextUrl.pathname === '/login') {
        return NextResponse.redirect(homeURL)
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/dia',
        '/favoritos',
        '/compras'
    ]
}

// para adicionar outras routas Ex: '/produto/:path*'