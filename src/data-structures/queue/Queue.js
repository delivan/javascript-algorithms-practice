import LinkedList from '../linked-list/LinkedList';

export default class Queue {
    constructor() {
        this.linkedList = new LinkedList();
    }


    /**
     * @return {boolean}
     */
    isEmpty() {
        return !this.linkedList.head;
    }

    /**
     * @return {*}
     */
    peek() {
        if (this.isEmpty()) {
            return null;
        }

        return this.linkedList.head.value;
    }

    /**
     * @return {*}
     */
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        return this.linkedList.deleteHead().value;
    }

    /**
     * @param {*} value
     */
    enqueue(value) {
        this.linkedList.append(value);
    }

    /**
     * @param [callback]
     * @return {string}
     */
    toString(callback) {
        return this.linkedList.toString(callback);
    }

    /**
     * @return {*[]}
     */
    toArray() {
        return this.linkedList.toArray().map(linkedListNode => linkedListNode.value);
    }
}