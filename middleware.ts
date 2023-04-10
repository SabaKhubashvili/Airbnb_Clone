export {default} from 'next-auth/middleware'


export const config = {
    matcher:[
        '/Trips',
        '/Reservations',
        '/Properties',
        '/Favorites',
    ]
}