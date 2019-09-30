const jwtConfig = {
    secret: 'secret',
    jwtIgnoreUrls: ['/app/auth/login', '/app/user/signin']
}

module.exports = jwtConfig