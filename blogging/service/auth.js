const jwt = require('jsonwebtoken');
const secret = 'akashissuperstar';

function createTokenForUser(user){
    const payLoad={
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role : user.role
    }
    const token = jwt.sign(payLoad, secret);
    return token;
}

function verifyToken(token){
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        return null;
    }
}

module.exports = {
    createTokenForUser,
    verifyToken
}