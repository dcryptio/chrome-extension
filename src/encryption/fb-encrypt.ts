import { KeyPair, ContentType, EncryptedContent } from "./types";
import { getNewKeyPair, createPost, getPosts } from "../api";
import { encrypt, decrypt } from "./crypto";
import { personalKey, publicKeys, USER } from "./keys";

let chrome = window['chrome'];

export async function encryptMessage(msg: string) : Promise<string> {
    let key = await getPersonalKey();
    let content = {type: ContentType.TEXT, value: msg};
    let encrypted = await encrypt(content, key, USER);
    let post = await createPost(encrypted);
    return `This post has been encrypted by dcrypt.io!\nTo be able to see this post, download dcrypt.io and ask me for my public key!\n
DCRYPT.IO POST ID ===${post.id}===
DCRYPT.IO POST KEY ===${post.keyName}===
DCRYPT.IO POST USER ===${USER}===`;
}

export const decryptPost = async (id: string, keyName: string, user: string) : Promise<string> => {
    let personalKey = await getPersonalKey();
    for ( let i = 0; i < publicKeys.length; i++){
        let key = publicKeys[i];
        if (user == key.user && keyName == key.name){
            console.log(key);
            return getPosts([id])
                .then(posts => { return { content: posts[0].data, keyName, user }; })
                .then(encrypted => decrypt(encrypted, key, ContentType.TEXT))
                .then(content => content.value)
                .catch(err => ` = = = = DCRYPT.IO = = = =
There was an error trying to decrypt this message.`);
        }
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
    return new Promise<KeyPair>( (resolve, reject) => resolve(personalKey) );
        // chrome.storage.sync.get(['personalKey'], result => {
        //     if (result !== null) {
        //         resolve(result.personalKey);
        //     }
        //     reject(result);
        // })
}

// module.exports.decryptPost = decryptPost;