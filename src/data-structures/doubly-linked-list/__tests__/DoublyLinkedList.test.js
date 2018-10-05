import DoublyLinkedList from '../DoublyLinkedList';

describe('DoublyLinkedList', () => {
    it('should create empty linked list', () => {
        const linkedList = new DoublyLinkedList();
        expect(linkedList.toString()).toBe('');
    });

    it('should append node to linked list', () => {
        const linkedList = new DoublyLinkedList();

        expect(linkedList.head).toBeNull();
        expect(linkedList.tail).toBeNull();

        linkedList.append(1);
        linkedList.append(2);

        expect(linkedList.head.next.value).toBe(2);
        expect(linkedList.tail.previous.value).toBe(1);
        expect(linkedList.toString()).toBe('1,2');
    });

    it('should prepend node to linked list', () => {
        const linkedList = new DoublyLinkedList();

        linkedList.prepend(2);
        linkedList.append(3);
        linkedList.prepend(1);

        expect(linkedList.head.value).toBe(1);
        expect(linkedList.tail.value).toBe(3);
        expect(linkedList.toString()).toBe('1,2,3');
    });

    it('should create linked list from array', () => {
        const arrayList = [1, 2, 3];
        const linkedList = new DoublyLinkedList();

        linkedList.fromArray(arrayList);

        expect(linkedList.head.value).toBe(1);
        expect(linkedList.tail.value).toBe(3);
        expect(linkedList.toString()).toBe('1,2,3');
    });

    it('should delete node by value from linked list', () => {
        const linkedList = new DoublyLinkedList();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(2);
        linkedList.append(3);
        linkedList.append(3);
        linkedList.append(3);
        linkedList.append(4);
        linkedList.append(4);
        linkedList.append(4);
        linkedList.append(4);

        linkedList.delete(1);
        expect(linkedList.head.value).toBe(2);

        linkedList.delete(2);
        expect(linkedList.head.value).toBe(3);

        linkedList.delete(3);
        linkedList.delete(4);
        expect(linkedList.head).toBeNull();
        expect(linkedList.tail).toBeNull();
    });

    it('should delete linked list tail', () => {
        const linkedList = new DoublyLinkedList();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(2);
        linkedList.append(3);
        linkedList.append(3);
        linkedList.append(3);
        linkedList.append(4);
        linkedList.append(4);
        linkedList.append(4);
        linkedList.append(4);

        linkedList.deleteTail();
        expect(linkedList.tail.value).toBe(4);

        linkedList.deleteTail();
        linkedList.deleteTail();
        linkedList.deleteTail();
        expect(linkedList.tail.value).toBe(3);


        linkedList.deleteTail();
        linkedList.deleteTail();
        linkedList.deleteTail();
        linkedList.deleteTail();
        linkedList.deleteTail();
        linkedList.deleteTail();
        expect(linkedList.toString()).toBe('');
    });

    it('should delete linked list head', () => {
        const linkedList = new DoublyLinkedList();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(2);
        linkedList.append(3);
        linkedList.append(3);
        linkedList.append(3);
        linkedList.append(4);
        linkedList.append(4);
        linkedList.append(4);
        linkedList.append(4);

        linkedList.deleteHead();
        expect(linkedList.head.value).toBe(2);

        linkedList.deleteHead();
        expect(linkedList.head.value).toBe(2);


        linkedList.deleteHead();
        linkedList.deleteHead();
        linkedList.deleteHead();
        linkedList.deleteHead();
        linkedList.deleteHead();
        linkedList.deleteHead();
        linkedList.deleteHead();
        linkedList.deleteHead();
        expect(linkedList.head).toBeNull();
        expect(linkedList.tail).toBeNull();
    });

    it('should be possible to store objects in the list and to print them out', () => {
        const linkedList = new DoublyLinkedList();

        linkedList.append({ value: 1, key: 'key1'});
        linkedList.append({ value: 2, key: 'key2'});
        
        expect(linkedList.head.value.value).toBe(1);
        expect(linkedList.tail.previous.value.key).toBe('key1');

        const nodeStringifier = value => `${value.key}:${value.value}`;
        expect(linkedList.toString(nodeStringifier)).toBe('key1:1,key2:2');
    });

    it('should find node by value', () => {
        const linkedList = new DoublyLinkedList();

        expect(linkedList.find({ value: 5})).toBeNull();

        linkedList.append(1);
        expect(linkedList.find({ value: 1})).toBeDefined();

        linkedList
            .append(2)
            .append(3);

        const node = linkedList.find({ value: 2 });

        expect(node.value).toBe(2);
        expect(linkedList.find({ value: 5})).toBeNull();
    });

    it('should find node by callback', () => {
        const linkedList = new DoublyLinkedList();

        linkedList
            .append({ value: 1, key: 'key1' })
            .append({ value: 2, key: 'key2' })
            .append({ value: 3, key: 'key3' });
        
        const node = linkedList.find({ callback: value => value.key === 'key2' });

        expect(node).toBeDefined();
        expect(node.value.value).toBe(2);
        expect(node.value.key).toBe('key2');
        expect(linkedList.find({ callback: value => value.key === 'key5' })).toBeNull();
    });

    it('should find node by means of custom compare function', () => {
        const comparatorFunction = (a, b) => {
            if (a.customValue === b.customValue) {
                return 0;
            }

            return a.customValue < b.customValue ? -1 : 1;
        }

        const linkedList = new DoublyLinkedList(comparatorFunction);

        linkedList
            .append({ value: 1, customValue: 'test1' })
            .append({ value: 2, customValue: 'test2' })
            .append({ value: 3, customValue: 'test3' });
        
        const node = linkedList.find({ value: { value: 2, customValue: 'test2'}});

        expect(node).toBeDefined();
        expect(node.value.value).toBe(2);
        expect(node.value.customValue).toBe('test2');
        expect(linkedList.find({ value: { value: 5, customValue: 'test5' }})).toBeNull();
    });

    it('should reverse linked list', () => {
        const linkedList = new DoublyLinkedList();

        linkedList
            .append(1)
            .append(2)
            .append(3);
        
        expect(linkedList.toString()).toBe('1,2,3');

        linkedList.reverse();
        expect(linkedList.toString()).toBe('3,2,1');

        linkedList.reverse();
        expect(linkedList.toString()).toBe('1,2,3');
    });
});
