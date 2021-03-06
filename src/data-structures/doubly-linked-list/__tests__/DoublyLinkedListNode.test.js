import DoublyLinkedListNode from '../DoublyLinkedListNode';

describe('DoublyLinkedListNode', () => {
    it('should create node with value', () => {
        const node = new DoublyLinkedListNode(1);

        expect(node.value).toBe(1);
        expect(node.previous).toBeNull();
        expect(node.next).toBeNull();
    });

    it('should create node with object as a value', () => {
        const nodeValue = { value: 1, key: 'test' };
        const node = new DoublyLinkedListNode(nodeValue);

        expect(node.value.value).toBe(1);
        expect(node.value.key).toBe('test');
        expect(node.next).toBeNull();
        expect(node.previous).toBeNull();
    });

    it('should link nodes together', () => {
        const node1 = new DoublyLinkedListNode(1);
        const node2 = new DoublyLinkedListNode(2, node1);
        const node3 = new DoublyLinkedListNode(3, node2, node1);

        expect(node1.previous).toBeNull();
        expect(node1.next).toBeNull();
        expect(node1.value).toBe(1);        
        expect(node2.previous).toBeDefined();
        expect(node2.next).toBeNull();
        expect(node2.value).toBe(2);
        expect(node3.previous).toBeDefined();
        expect(node3.next).toBeDefined();
        expect(node3.value).toBe(3);
        expect(node3.next.value).toBe(1);
        expect(node3.previous.previous.value).toBe(1);
    });

    it('should convert node to string', () => {
        const node = new DoublyLinkedListNode(1);

        expect(node.toString()).toBe('1');

        node.value = 'string value';
        expect(node.toString()).toBe('string value');
    });

    it('should convert node to string with custom stringifier', () => {
        const nodeValue = { value: 1, key: 'test' };
        const node =  new DoublyLinkedListNode(nodeValue);
        const toStringCallback = value => `value: ${value.value}, key: ${value.key}`;

        expect(node.toString(toStringCallback)).toBe('value: 1, key: test');
    });
});