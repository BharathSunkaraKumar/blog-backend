import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log('authhead', authHeader)
        if(!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({message: "unauthorized: no token provided"});
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.user = decoded;
        next()
    } catch (error) {
        return res.status(401).json({message: 'Invalid or expired token', error})
    }
}