const {
    User
} = require('./../model/User');

const authenticate = async (req, res, next) => {
    let token = req.header('x-auth');

    try {
        const foundUser = await User.findByToken(token);

        if (!foundUser) {
            throw new Error('Unauthorized');
        }

        req.user = foundUser;
        req.token = token;
        next();
    } catch(e) {
        res.status(401).send({ error: e.message });
    }
};

module.exports = {
    authenticate
};