const jwtConfig = {
    secret: 'secret',
    jwtIgnoreUrls: ['/app/auth/login', '/app/user']
}

module.exports = jwtConfig