import { expect } from 'chai';
import * as foo from '../src/index';
import { RUN_REMOTE_TESTS } from './test_util';

suite("foo", () => {
    test("add", () => {
        const res = foo.add(1, 2);
        expect(res).to.equal(3);
    });

    if (RUN_REMOTE_TESTS){
        test('do horribly long test', (done) => {
            console.log('running remote test');
            setTimeout(() => {
                expect(Math.random()).equal(7);
                done();
            }, 1000);
        });    
    }
});