export enum ContentType {
    IMAGE,
    TEXT
}

export interface Content {
    type : ContentType,
    value : ByteString
}

export interface EncryptedContent {
    user: string;
    keyName: string;
    content: ByteString;
}

export interface KeyPair {
    name: string;
    private: ByteString;
    public: ByteString;
}

export interface PublicKey {
    user: string;
    name: string;
    key: ByteString;
}