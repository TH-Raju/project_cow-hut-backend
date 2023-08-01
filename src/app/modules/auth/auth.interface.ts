export type ILoginUser = {
    phoneNumber: string,
    password: string
}

export type ILoginUserResponse = {
    accessToken: string,
    refreshToken?: string,
    needsPasswordChange: boolean,
}

export type iRefreshTokenResponse = {
    accessToken: string
}