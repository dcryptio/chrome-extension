import { Post } from "./types";
import { EncryptedContent } from "../encryption/types";
import axios from "axios";
import { KeyPair } from "../encryption/types";

const API_URL = "https://api.negebauer.com/graphql";

export async function getPosts(ids: string[]) : Promise<Post[]> {
    let posts = await axios
                        .get(API_URL + `?query={posts(ids:["${ids.join('","')}"]){id,keyName,data}}`)
                        .then(res => res.data.data.posts)
                        .catch(console.error);
    return posts;
}

export async function createPost(content: EncryptedContent) : Promise<Post> {
    let post = await axios
                        .post(API_URL, {
                            query: `mutation {createPost(keyName:"${content.keyName}",data:"${content.content}") {id,keyName,data}}`
                        })
                        .then(res => res.data.data.createPost)
                        .catch(console.error);
    return post;
}

export async function getNewKeyPair(keyName: string) : Promise<KeyPair> {
    let keyValues = await axios
                            .get(API_URL + "?query={keyPair{private,public}}")
                            .then(res => res.data.data.keyPair)
                            .catch(console.error);
    if (keyValues == undefined){
        return null;
    }
    return {name: keyName, private: keyValues.private, public: keyValues.public};
}
