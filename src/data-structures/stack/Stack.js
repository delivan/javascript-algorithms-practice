import LinkedList from '../linked-list/LinkedList';

export default class Stack {
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
    pop() {
        if (this.isEmpty()) {
            return null;
        }

        return this.linkedList.deleteHead().value;
    }

    /**
     * @param {*} value
     */
    push(value) {
        this.linkedList.prepend(value);
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