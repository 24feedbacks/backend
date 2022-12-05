import IHasher from "../types/IHasher";
import bcrypt from "bcrypt";

export default class Bcrypt implements IHasher {
    salt: number;

    constructor(salt: number) {
        this.salt = salt;
    }

    hash = async (password: string) => {
        try {
            return await bcrypt.hash(password, this.salt);
        } catch (err) {
            console.log(err);
            return undefined;
        }
    };
    
    compare = async (password: string, hash: string) => {
        try {
            return await bcrypt.compare(password, hash);
        } catch (err) {
            console.log(err);
            return false;
        }
    };
}
