const express = require('express');
const app = express();

const roles = {
  SuperUser: 'super_user',
  User: 'user',
  Admin: 'admin',
};

/**
 * Authorization middleware wrapped in a close so we can pass in additional data
 * @param {array} roles accepted roles
 * @return {Function} express middleware
 */
function authorize(roles = []){
  return function(req, res, next) {

    // Here you would access the role of the current user that you get from the database
    let currentRole = req.query.role;

    if(!roles.includes(currentRole)){
      return res.status(401).send({message: 'You are not authorized to access this endpoint'})
    }
    return next();
  }
}
/**
 * call this with ?role=admin | ?role=user | ?role=super_user
 * and you should receive 401 for ?role=user
 */
app.get('/', authorize([roles.Admin, roles.SuperUser]), function (req, res) {
  res.status(200).send({message: `You accessed the endpoint with role ${req.query.role}`})
});


app.listen(3000, () => console.log('Authorization middleware example started'));