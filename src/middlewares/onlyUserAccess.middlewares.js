function onlyUserAccess (req, res, next){
    if(!req.session.user) return res.json({msg: "not logged in"})
    next()
}

export default onlyUserAccess        