import { KeyPair, ContentType, EncryptedContent } from "./types";
import { getNewKeyPair, createPost, getPosts } from "../api";
import { encrypt, decrypt } from "./crypto";

let chrome = window['chrome'];

export async function encryptMessage(msg: string) : Promise<string> {
    let key = await getPersonalKey();
    let content = {type: ContentType.TEXT, value: msg};
    let encrypted = await encrypt(content, key, "user");
    let post = await createPost(encrypted);
    return `This post has been encrypted by dcrypt.io!\nTo be able to see this post, download dcrypt.io and ask me for my public key!\n
DCRYPT.IO POST ID ===${post.id}===
DCRYPT.IO POST KEY ===${post.keyName}===
DCRYPT.IO POST USER ===${"user"}===`;
}

export async function decryptPost(id: string, keyName: string, user: string) : Promise<String> {
    let personalKey = await getPersonalKey();
    let publicKey = {user, name: personalKey.name, key: personalKey.public };
    if (user == "user" && keyName == "testKey"){
        return getPosts([id])
            .then(posts => { return { content: posts[0].data, keyName, user }; })
            .then(encrypted => decrypt(encrypted, publicKey, ContentType.TEXT))
            .then(content => content.value);
    }
    return ` = = = = DCRYPT.IO = = = =
You do not have the necessary key to decrypt this message. Contact the posting user in order ask for his key.`;
}

export async function generatePersonalKey(keyName: string) : Promise<KeyPair> {
    let keyPair = await getNewKeyPair(keyName);
    return new Promise<KeyPair>( (resolve, reject) => {
        chrome.storage.sync.set({ personalKey : keyPair}, result => {
            if (result != undefined){
                resolve(keyPair);
            }
            reject(result);
        });
    });
}

export async function getPersonalKey() : Promise<KeyPair> {
    return new Promise<KeyPair>( (resolve, reject) => {
        chrome.storage.sync.get(['personalKey'], result => {
            if (result !== null) {
                resolve(result.personalKey);
            }
            reject(result);
        })
    })
}