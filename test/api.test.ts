import { expect } from 'chai';
import { RUN_REMOTE_TESTS } from './test_util';
import { getPosts, createPost } from '../src/api';


let testContent = {
    user: "TESTUSER",
    keyName: "testKey",
    content: "test content string"
};

if (RUN_REMOTE_TESTS){
    suite("API", () => {
        test("Create new post", async () => {
            let post = await createPost(testContent);
            expect(post.data).to.equal(testContent.content, "Not creating posts correctly");
        });
        test("Get one post" , async () => {
            let post = await getPosts(['5ad2a312312bf10019e8e4e5']);
            expect(post[0].data).to.equal('Hello World!', "Unexpected post returned");
        });
        test("Get many posts" , async () => {
            let posts = await getPosts(['5ad2a312312bf10019e8e4e5', '5ad2a340312bf10019e8e4e7']);
            expect(posts.length).to.equal(2, "Unexpected number of posts returned");
            expect(posts[0].data).to.equal('Hello World!', "Unexpected post returned");
            expect(posts[1].data).to.equal('Hello World 69!', "Unexpected post returned");
        });
        test("Get unexisting post" , async () => {
            let res = await getPosts(['000']);
            expect(res).to.equal(null, "API returns post on invalid id")
        });
    
    });
}