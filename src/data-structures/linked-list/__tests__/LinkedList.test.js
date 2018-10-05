import LinkedList from '../LinkedList';

describe('LinkedList', () => {
    it('should create empty linked list', () => {
        const linkedList = new LinkedList();
        expect(linkedList.toString()).toBe('');
    });

    it('should prepend node to linked list', () => {
        const linkedList = new LinkedList();

        linkedList.prepend(2);
        
        expect(linkedList.head.toString()).toBe('2');
        expect(linkedList.tail.toString()).toBe('2');

        linkedList.append(1);
        linkedList.prepend(3)

        expect(linkedList.toString()).toBe('3,2,1');
    });

    it('should append node to linked list', () => {
        const linkedList = new LinkedList();

        expect(linkedList.head).toBeNull();
        expect(linkedList.tail).toBeNull();

        linkedList.append(1);
        linkedList.append(2);

        expect(linkedList.toString()).toBe('1,2');
        expect(linkedList.tail.next).toBeNull();
    });

    it('should be possible to store objects in the list and to print them out', () => {
        const linkedList = new LinkedList();

        const nodeValue1 = { value: 1, key: 'key1' };
        const nodeValue2 = { value: 2, key: 'key2' };
        linkedList
            .append(nodeValue1)
            .prepend(nodeValue2);
        const nodeStringifier = value => `${value.key}:${value.value}`;
        expect(linkedList.toString(nodeStringifier)).toBe('key2:2,key1:1');
    });

    it('should find node by value', () => {
        const linkedList = new LinkedList();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);
        linkedList.append(4);
        expect(linkedList.find({ value: 1 }).toString()).toBe('1');
        expect(linkedList.find({ value: 5})).toBeNull();
    });

    it('should find node by callback', () => {
        const linkedList = new LinkedList();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);
        linkedList.append(4);

        const equalOne = (value) => value === 1;
        const equalFive = (value) => value === 5;
        expect(linkedList.find({ callback: equalOne }).toString()).toBe('1')
        expect(linkedList.find({ callback: equalFive })).toBeNull();
    });

    it('should find node by means of custom compare function', () => {
        const comparatorFunction = (a, b) => {
            if (a.customValue === b.customValue) {
                return 0;
            }

            return a.customValue < b.customValue ? -1 : 1;
        };

        const linkedList = new LinkedList(comparatorFunction);
        linkedList
            .append({ value: 1, customValue: 'test1'})
            .append({ value: 2, customValue: 'test2'})
            .append({ value: 3, customValue: 'test3'});

        const node = linkedList.find({
            value: { value: 2, customValue: 'test2' }
        });

        expect(node).toBeDefined();
        expect(node.value.value).toBe(2);
        expect(node.value.customValue).toBe('test2');
        expect(linkedList.find({ value: 2, customValue: 'test5' })).toBeNull();
    });

    it('should delete node by value from linked list', () => {
        const linkedList = new LinkedList();

        expect(linkedList.delete(5)).toBeNull();

        linkedList.append(1);
        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);
        linkedList.append(3);
        linkedList.append(3);
        linkedList.append(4);
        linkedList.append(5);
        expect(linkedList.head.toString()).toBe('1');
        expect(linkedList.tail.toString()).toBe('5');
        
        const deletedNode = linkedList.delete(3);
        expect(deletedNode.value).toBe(3);
        expect(linkedList.toString()).toBe('1,1,2,4,5');

        linkedList.delete(1);
        expect(linkedList.toString()).toBe('2,4,5');
    
        linkedList.delete(2);
        expect(linkedList.toString()).toBe('4,5');

        linkedList.delete(4);
        expect(linkedList.toString()).toBe('5');

        linkedList.delete(5);
        expect(linkedList.toString()).toBe('');
    });

    it('should delete tail node from linked list', () => {
        const linkedList = new LinkedList();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);
        expect(linkedList.tail.toString()).toBe('3');

        linkedList.deleteTail();
        expect(linkedList.tail.toString()).toBe('2')

        linkedList.deleteTail();
        linkedList.deleteTail();
        expect(linkedList.tail).toBeNull();
    });

    it('should delete head node from linked list', () => {
        const linkedList = new LinkedList();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);
        expect(linkedList.head.toString()).toBe('1');

        linkedList.deleteHead();
        expect(linkedList.head.toString()).toBe('2');
        
        linkedList.deleteHead();
        linkedList.deleteHead();
        expect(linkedList.head).toBeNull();
    });

    it('should make linked list from array list', () => {
        const linkedList = new LinkedList();
        const arrayList = [1, 2, 3, 4];
        expect(linkedList.fromArray(arrayList).toString()).toBe('1,2,3,4');
    });

    it('should reverse list from linked list', () => {
        const linkedList = new LinkedList();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);
        linkedList.append(4);
        expect(linkedList.reverse().toString()).toBe('4,3,2,1');
    });
})