/* B"H
*/

const usersModel = require('../models/users');

module.exports = {
  parseAuthorizationToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
      return next();
    }
    const payload = usersModel.verifyJWT(token);
    req.user = payload;
    next();
  },
  requireUser(adminOnly = false){
    return function(req, res, next) {
      console.log(req.user)
      if (!req.user) {
        return next({
          status: 401,
         message: 'must be logged in '
        });
      }

      if (adminOnly && req.user.admin) {
      
        console.log(req.user)
        return next({
          status: 403,
          message: 'You must be an admin to perform this action.'
        });
      }
      next();
    }
  },
}