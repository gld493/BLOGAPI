const e = require('express')
const jwt = require('jsonwebtoken')



exports.verify = (req, res, next) => {
      const token = req.headers.authorization
      if (!token) res.status(403).json({error: "please provide a token"})
      else {
          jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET, (err, user) => {
                if (err) res.locals.user = null, res.status(500).json({error: 'failed to authenticate token'})
                res.locals.user = user.data //for  accessing current authenticated user from other places
                console.log(user.data.email)
              next()
          })
      }
}

exports.checkAccess = (permissions) => {
    return async (req, res, next) => {
     try {
      const userRole = res.locals.user.role;
         if (permissions.includes(userRole)) {
             next();
         } else {
             return res.status(401).json("You do not have permission to perform this action.")
         }  
      
     } catch (error) {
      next(error)
     }
    }
   }


 