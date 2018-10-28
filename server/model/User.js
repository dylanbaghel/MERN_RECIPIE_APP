const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {
    isEmail
} = require('validator');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return isEmail(v);
            },
            message: props => `${props.value} is Not A Valid Email`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    return {
        _id: userObject._id,
        email: userObject.email,
        fullName: userObject.fullName
    };
};


UserSchema.methods.generateAuthToken = async function () {
    let user = this;
    const access = 'auth';
    const token = jwt.sign({
        _id: user._id.toHexString(),
        fullName: user.fullName,
        email: user.email,
        access
    }, process.env.JWT_SECRET).toString();

    user.tokens = user.tokens.concat([{
        access,
        token
    }]);

    try {
        await user.save();
        return token;
    } catch (e) {

    }
};

UserSchema.methods.removeToken = async function(token) {
    let user = this;
    await user.update({
        $pull: {
            tokens: {token}
        }
    });
};

UserSchema.statics.findByToken = async function(token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(e) {
        throw new Error('Unauthorized');
    }

    try {
        const foundUser = await User.findOne({
            _id: decoded._id,
            'tokens.token': token,
            'tokens.access': 'auth'
        });

        if (foundUser) {
            return foundUser;
        } else {
            throw new Error('Unauthorized');
        }
    } catch(e) {
        throw new Error(e.message);
    }
};

UserSchema.statics.findByCredentials = async function (email, password) {
    let User = this;

    try {
        const foundUser = await User.findOne({
            email
        });
        if (!foundUser) {
            throw new Error('No User Found With This Email');
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if (isMatch) {
            return foundUser;
        } else {
            throw new Error('Password Incorrect');
        }
    } catch (e) {
        throw new Error(e.message);
    }
}



UserSchema.pre('save', async function (next) {
    let user = this;

    if (user.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        } catch (e) {
            console.log('gen salt', e);
        }
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = {
    User
};