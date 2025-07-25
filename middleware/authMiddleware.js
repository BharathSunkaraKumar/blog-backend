export const isAdmin = (req, res, next) => {
    console.log('req', req.user)
    try {
        if(req.user && req.user.role == 'admin') {
            next()
        }else{
            return res.status(403).json({message: "Access denied. Admins only."})
        }
    } catch (error) {
        return res.status(500).json({message: "Server error", error})
    }
}