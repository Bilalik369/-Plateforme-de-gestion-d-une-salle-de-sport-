const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  
    const token = req.header('x-auth-token');
    
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ msg: 'Access denied, token missing' });
    }

    try {
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        
        req.user = decoded.user; 
        
        next();
    } catch (error) {
        console.log('Invalid token:', error);
        return res.status(401).json({ msg: 'Invalid token' });
    }
}

module.exports = authMiddleware;
