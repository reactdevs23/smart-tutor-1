import jsonwebtoken from 'jsonwebtoken';
const secretKey = process.env.NEXTAUTH_SECRET as string;


export const sign = (payload) => {
    const token = jsonwebtoken.sign(payload, secretKey)
    return token;
}


export const verify = (token) => {
    const verfiy = jsonwebtoken.verify(token, secretKey)
    return verfiy;
}