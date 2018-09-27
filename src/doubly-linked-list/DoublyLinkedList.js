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
}