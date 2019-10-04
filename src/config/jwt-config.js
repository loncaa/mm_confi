const jwtConfig = {
    secret: 'secret',
    jwtIgnoreUrls: ['/app/user/login', '/app/user']
}

module.exports = jwtConfig