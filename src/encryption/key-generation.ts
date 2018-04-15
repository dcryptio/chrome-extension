import * as pem from "pem";
import { KeyPair } from "./types"

async function getPubKey(privKey: ByteString) : Promise<ByteString> {
    return new Promise<ByteString>(
        (resolve, reject) => {
            pem.getPublicKey(privKey, (err, res) => {
                if (err) reject(res);
                else resolve(res.publicKey);
            });
        }
    );
}

async function genPrivKey(length: number) : Promise<ByteString>{
    return new Promise<ByteString>(
        (resolve, reject) => {
            pem.createPrivateKey(length, (err, res) => {
                if (err) reject(err);
                else resolve(res.key);
            });
        }
    );
}

export async function generateKeyPair(length: number, name: string) : Promise<KeyPair> {
    let privKey = await genPrivKey(length);
    let pubKey = await getPubKey(privKey);
    if (!pubKey){
        return null
    }
    return {
        name,
        private: privKey,
        public: pubKey,
    };
}

generateKeyPair(512, "test").then(console.log);