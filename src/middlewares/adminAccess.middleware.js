function adminAccess (req, res, next){
    const userRole = req.session.user.role
    if(userRole !== 'admin') return res.json({msg: "Not authorized"})
    next()
}   

export default adminAccess    