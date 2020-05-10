import { parseDocumentNode } from '../src/eval';
import { TestScheduler } from 'jest';
// import { TestScheduler } from 'jest';

describe('parser', () => {
    test('parse chars node', () => {
        const obj = { type: "chars", "contents": "foo" }
        expect(parseDocumentNode(obj)).toBe("foo")
    })

    test('parse paragraph', () => {
        const obj = {
            "type": "paragraph",
            "contents": [
                [
                    {
                        "type": "chars",
                        "contents": "foo"
                    }
                ],
                [
                    {
                        "type": "chars",
                        "contents": "bar"
                    }
                ],
            ]
        }
        const received = parseDocumentNode(obj)
        expect(received).toBe("　foobar\n")
    })

    test('parse header', () => {
        const obj = { type: "header", "contents": [{type: "chars", contents: "foo" }]}
        expect(parseDocumentNode(obj)).toBe("[chapter:foo]\n")
    })

})
