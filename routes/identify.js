
module.exports = {
    isUser: function(request, response, next) {
        if (request.isAuthenticated) {
            return next();
        }

        response.redirect('/posts');
    },
    isUserAdmin: function(request, response, next) {
        if ((request.user && request.user.accessLevel === "Admin") && request.isAuthenticated()) {
            return next();
        }

        response.redirect('/posts');
    }
};
