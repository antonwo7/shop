const path = require('path')

module.exports = {
    roleNames: {
        user: "USER",
        admin: "ADMIN"
    },
    paths: {
        image: path.resolve(__dirname) + "/assets/images/",
    },
    uris: {
        image: "/assets/images/",
    }
}