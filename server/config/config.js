const env = process.env.NODE_ENV || 'development';
console.log("**** env", env);
if (env === 'development') {
    process.env.PORT = 4100;
    process.env.MONGO = 'mongodb://localhost:27017/RecipieApp';
    process.env.JWT_SECRET = 'abhishek';
} else if (env === 'test') {
    process.env.PORT = 4000;
    process.env.MONGO = 'mongodb://localhost:27017/RecipieAppTest';
    process.env.JWT_SECRET = 'abhishek';
}