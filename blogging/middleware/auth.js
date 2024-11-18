const {verifyToken} = require("../service/auth");

function checkForAuthentication(cookieName){
    return(req,res,next)=>{
        let cookieToken = req.cookies?.[cookieName];
        if(cookieToken){
            const userPayload = verifyToken(cookieToken);
            if(userPayload){
                req.user = userPayload;
                next();
            }else{
                next();
            }
        }else{
            next();
        }
    }
}

module.exports = {
    checkForAuthentication
}