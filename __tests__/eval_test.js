import { parseDocumentNode } from '../src/eval';
import { TestScheduler } from 'jest';
// import { TestScheduler } from 'jest';

describe('parser', () => {
    test('parse chars node', () => {
        const obj = {type: "chars", "contents": "foo"}
        expect(parseDocumentNode(obj)).toBe("foo")
    })
})
