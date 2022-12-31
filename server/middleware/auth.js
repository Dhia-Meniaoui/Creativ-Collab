module.exports = {
    ensureAuth: function(req , res , next ){
        if (req.isAuthenticated()) {
            res.next();
        } else {
            res.redirect('/');
        }
    },
    ensureGuest: function(req , res , next ){
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
        } else {
            res.next();
        }
    }
}