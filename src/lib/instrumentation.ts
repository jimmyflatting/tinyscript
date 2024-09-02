import connect from '@/server/config/db'

export async function register() {
    await connect()
}