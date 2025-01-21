import bcrypt from 'bcryptjs';
import exp from 'constants';
const salt = 10;
export const ecryptPassword = async (password: string) => {
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}


export const comparePassword = async (password, existingPassword): Promise<Boolean> => {
    const compare = await bcrypt.compare(password, existingPassword);
    return compare;
}