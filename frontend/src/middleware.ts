import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	const authCookieJSON = request.cookies.get('unimed@auth')?.value
	const authCookie = JSON.parse(authCookieJSON || "{}")
	const sector = authCookie?.sector

	const isSystem = request.nextUrl.pathname.startsWith('/sistema')

	if ((!authCookie || !sector) && isSystem) {
		return Response.redirect(new URL('/', request.url))
	}
}

export const config = {
	matcher: ['/((?!public-api|_next/static|_next/image|.*\\.png$).*)']
}
