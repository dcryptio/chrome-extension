import { expect } from 'chai';
import { RUN_REMOTE_TESTS } from './test_util';
import { generateKeyPair } from '../src/encryption/key-generation';
import { ContentType } from '../src/encryption/types';
import { encrypt, decrypt } from '../src/encryption/crypto';

suite("ENCRYPTION", () => {
    test("generateKeys", async () => {
        let keyPair = await generateKeyPair(512, "test");
        expect(keyPair).to.not.equal(null, "Internal function error");
    });
    test("Text encrypt and decrypt", async () =>{
        let username = "USER";
        let keyname = "KEYNAME";
        let keyPair = await generateKeyPair(512, keyname);
        let pubKey = { user: username, name: keyPair.name, key: keyPair.public };
        let content = { type: ContentType.TEXT, value: "THIS IS A TEST STRING" };

        let encrypted = encrypt(content, keyPair, username);

        expect(encrypted.user).to.equal(username, "Encrypt: Wrong user returned");
        expect(encrypted.keyName).to.equal(keyname, "Encrypt: Wrong keyname returned");
        expect(encrypted.content).to.not.equal(null, "Encrypt: Not encripted");        

        let decrypted = decrypt(encrypted, pubKey, ContentType.TEXT);
        expect(decrypted.type).to.equal(content.type, "Decrypted type not equal to initial value");
        expect(decrypted.value).to.equal(content.value, "Decrypted value not equal to initial value");        
    })
});