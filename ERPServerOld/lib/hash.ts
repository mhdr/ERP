///<reference path="../DefinitelyTyped/node/node.d.ts"/>
import {createHash} from "crypto";

class Hash{
    static hashString(data:string)
    {
        var hashedStr = createHash('sha256').update(data).digest("hex");
        return hashedStr;
    }

    static comparePassword(plainPassword,hashedPassword)
    {
        var pass=Hash.hashString(plainPassword);

        if (pass===hashedPassword)
        {
            return true;
        }

        return false;
    }
}

module.exports = Hash;