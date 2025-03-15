import { NextResponse, NextRequest } from 'next/server';
const API_URL =
    process.env.NEXT_PUBLIC_PRODUCTION === "true"
        ? process.env.NEXT_PUBLIC_PRODUCTION_API
        : process.env.NEXT_PUBLIC_LOCAL_API;



export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('ac_T')?.value || '';
    const refreshToken = request.cookies.get('rf_T')?.value || '';
    const url = new URL(request.url);
    const prevHeader = request.headers.get('referer');
    const prevUrl = prevHeader ? new URL(prevHeader, request.nextUrl.origin) : new URL('/', request.nextUrl.origin);
    const response = NextResponse.next();

    try {
        if (refreshToken) {
            if (accessToken && await verifyToken(accessToken)) {
                return response;
            }
            const data = await refreshAccessToken(refreshToken);
            if (data.access && data.refresh) {
                response.cookies.set('ac_T', data.access, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'strict',
                    path: '/',
                    maxAge: 60 // 1 min
                });
                response.cookies.set('rf_T', data.refresh, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'strict',
                    path: '/',
                    maxAge: 60 * 60 * 24 * 30 // 30 days
                });
                await verifyToken(data.access);
                return response;
            } else {
                if (prevUrl) {
                    prevUrl.searchParams.set("user", "_authentication-required");
                    prevUrl.searchParams.set('next', url.pathname);
                    return NextResponse.redirect(prevUrl.toString());
                }
            }
        } else {
            if (prevUrl) {
                prevUrl.searchParams.set("user", "_authentication-required");
                prevUrl.searchParams.set('next', url.pathname);
                if (prevUrl.toString() === url.toString()) {
                    const response = NextResponse.redirect(new URL('/', request.url));
                    return response;
                }
                return NextResponse.redirect(prevUrl.toString());
            }
        }

    } catch (error) {
        console.error('Error during token verification:', error);
        return response;
    }
    return response;
}

const verifyToken = async (token: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/token/verify/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error verifying token:', error);
        return false;
    }
};

const refreshAccessToken = async (refresh: string): Promise<{ access: string | null; refresh: string | null }> => {
    try {
        const response = await fetch(`${API_URL}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refresh }),
        });
        if (response.ok) {
            const data = await response.json();
            return { access: data.access, refresh: data.refresh };
        }
        return { access: null, refresh: null };
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return { access: null, refresh: null };
    }
};


export const config = {
    matcher: ['/products'],
    //runtime: 'nodejs'
};
