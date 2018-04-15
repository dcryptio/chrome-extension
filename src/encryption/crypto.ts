import {Buffer} from "buffer";
import * as crypto from "crypto-browserify";
import { Content, ContentType, EncryptedContent, KeyPair, PublicKey} from "./types";

export function encrypt(content: Content, key: KeyPair, user: string) : EncryptedContent {
    let keyName = key.name;
    switch ( content.type ){
        case ContentType.IMAGE:
            return null;
        case ContentType.TEXT:
            let encrypted = crypto.privateEncrypt(key.private, Buffer.from(content.value));
            return { user, keyName, content: Buffer.from(encrypted).toString('base64') };
        default:
            return null;
    }
}

export function decrypt(encrypted: EncryptedContent, key: PublicKey, contentType: ContentType ) : Content {
    if (key.user != encrypted.user || key.name != encrypted.keyName){
        // this is not the correct key
        return null;
    }

    switch (contentType){
        case ContentType.IMAGE:
            return null;
        case ContentType.TEXT:
            return { 
                type: contentType,
                value: crypto.publicDecrypt(key.key, Buffer.from(encrypted.content)).toString('utf8') 
            };
        default:
            return null;
    }

}