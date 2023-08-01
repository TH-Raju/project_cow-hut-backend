import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })


export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    default_pass: process.env.DEFAULT_PASS,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,

    jwt: {
        secret: process.env.JWT_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN
    }
}