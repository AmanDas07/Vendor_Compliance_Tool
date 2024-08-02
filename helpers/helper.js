import bcrypt from 'bcrypt';


const hashed = async (password) => {
    userModel.pre('save', async function (next) {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = bcrypt.hash(this.password, salt);
        next();
    })
}

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}