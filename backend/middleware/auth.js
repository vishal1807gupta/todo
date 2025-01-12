import jwt from 'jsonwebtoken';

const JWT_SECRET='ghghghsfdgfhjgjdgtyk';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer TOKEN
        const decodedToken = jwt.verify(token, JWT_SECRET);
        console.log(decodedToken);
        const { id, name, email} = decodedToken;
        req.user = { id, name, email};
        next();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        success: false,
        message: 'Something is wrong with your authorization',
      });
    }
  };
  
  export default auth;