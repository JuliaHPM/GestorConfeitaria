import { parseCookies, destroyCookie } from 'nookies'
import decode from 'jwt-decode'
import { AuthTokenError } from '../lib/errors/AuthTokenError';

export function withSSRAuth(fn, options) {
    return async (ctx) => {
        const cookies = parseCookies(ctx)
        const token = cookies['gestorConfeitaria.token'];

        if (!token) {

            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                }
            }
        }

        const user = decode(token);

        if (options?.admin) {
            if (!user.admin) {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    }
                }
            }
        }
        try {
            return await fn(ctx)
        } catch (err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, 'gestorConfeitaria.token');

                return {
                    redirect: {
                        destination: '/login',
                        permanent: false,
                    }
                }
            }
        }
    }
}