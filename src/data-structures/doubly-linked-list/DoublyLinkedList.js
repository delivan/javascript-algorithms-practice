import DoublyLinkedListNode from './DoublyLinkedListNode';
import Comparator from '../../utils/Comparator';

export default class DoublyLinkedList {
    /**
     * @param {Function} [comparatorFunction]
     */
    constructor(comparatorFunction) {
        /** @var DoublyLinkedListNode */
        this.head = null;

        /** @var DoublyLinkedListNode */
        this.tail = null;

        this.compare = new Comparator(comparatorFunction);
    }

    /**
     * @param {*} value
     * @return {DoublyLinkedList}
     */
    prepend(value) {
        // Make new node to be a head.
        const newNode = new DoublyLinkedListNode(value, null, this.head);

        // If there is head, then it won't be head anymore.
        // Therefore, make its previous reference to be new node (new head).
        // Then mark the new node as head
        if (this.head) {
            this.head.previous = newNode;
        } 
        this.head = newNode;

        // If there is no tail yet let's make new node a tail.
        if (!this.tail) {
            this.tail = newNode;
        }
        
        return this;
    }

    /**
     * @param {*} value
     * @return {DoublyLinkedListNode}
     */
    append(value) {
        // Make new node to be a tail.
        const newNode = new DoublyLinkedListNode(value, this.tail, null);

        // If there is tail, then it won't be tail anymore.
        // Therefore, make its next reference to be new node (new tail).
        // Then mark the new node as tail
        if (this.tail) {
            this.tail.next = newNode;
        }
        this.tail = newNode;

        // If there is no head yet let's make new node a head.
        if (!this.head) {
            this.head = newNode;
        }

        return this;
    }

    /**
     * @param {*} value
     * @return {DoublyLinkedListNode}
     */
    delete(value) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        let currentNode = this.head;

        while (currentNode) {
            if (this.compare.equal(currentNode.value, value)) {
                deletedNode = currentNode;

                if (currentNode.next === null && currentNode.previous === null) {
                    this.head = null;
                    this.tail = null;
                }
                else if (currentNode.next === null) {
                    currentNode.previous.next = null;
                    this.tail = currentNode.previous;
                } 
                else if (currentNode.previous === null) {
                    currentNode.next.previous = null;
                    this.head = currentNode.next;
                }
                else {
                    currentNode.previous.next = currentNode.next;
                    currentNode.next.previous = currentNode.previous;
                }
            }
            currentNode = currentNode.next;
        }

        return deletedNode;
    }

    /**
     * @param {Object} findParams
     * @param {*} findParams.value
     * @param {function} [findParams.callback]
     * @return {DoublyLinkedListNode}
     */

    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {
            // If callback is specified then try to find node by callback.
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            // If value is specified then try to compare by value.
            if (value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    /**
     * @return {DoublyLinkedListNode}
     */
    deleteTail() {
        if (!this.tail) {
            return null;
        }

        if (this.head === this.tail) {
            // If There is only one node in linked list.
            const deletedTail = this.tail;
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        // If there are many nodes in linked list.
        const deletedTail = this.tail;

        this.tail = this.tail.previous;
        this.tail.next = null;

        return deletedTail;
    }

    /**
     * @return {DoublyLinkedListNode}
     */
    deleteHead() {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;
        if (this.head.next) {
            // If There are many nodes in linked list.
            this.head = this.head.next;
            this.head.previous = null;
        } else {
            // If There is only one node in linked list.
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    /**
     * @return {DoublyLinkedListNode[]}
     */
    toArray() {
        const nodes = [];
        
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
     * @param {*[]} values - Array of values that need to be converted to linked list.
     * @return {DoublyLinkedList}
     */
    fromArray(values) {
        values.forEach(value => this.append(value));

        return this;
    }

    /**
     * @param {function} [callback]
     * @return {string}
     */
    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString();
    }

    /**
     * Reverse a linked list.
     * @returns {DoublyLinkedList}
     */
    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currNode) {
            prevNode = currNode.previous;
            nextNode = currNode.next;
            currNode.previous = nextNode;
            currNode.next = prevNode

            currNode = nextNode;
        }

        prevNode = this.tail;
        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}