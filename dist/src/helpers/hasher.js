"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class Bcrypt {
    salt;
    constructor(salt) {
        this.salt = salt;
    }
    hash = async (password) => {
        try {
            return await bcrypt_1.default.hash(password, this.salt);
        }
        catch (err) {
            console.log(err);
            return undefined;
        }
    };
    compare = async (password, hash) => {
        try {
            return await bcrypt_1.default.compare(password, hash);
        }
        catch (err) {
            console.log(err);
            return false;
        }
    };
}
exports.default = Bcrypt;
