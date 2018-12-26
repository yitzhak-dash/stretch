import bcrypt from 'bcrypt';

export const hash = (plainText: string): string => bcrypt.hashSync(plainText, 10);

export const compare = (plainText: string, hash: string): boolean => {
    try {
        return bcrypt.compareSync(plainText, hash);
    } catch (err) {
        console.error(err);
        return false;
    }
};