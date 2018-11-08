import LinkedListNode from "./LinkedListNode";
import Comparator from "../../utils/Comparator";

export default class LinkedList {
    /**
     * @param {Function} [comparatorFunction]
     */
    constructor(comparatorFunction) {
        /** @var LinkedListNode */
        this.head = null;

        /** @var LinkedListNode */
        this.tail = null;

        this.compare = new Comparator(comparatorFunction);
    }

    /**
     * @param {*} value
     * @return {LinkedList}
     */
    prepend(value) {
        // 새로운 노드를 head로 만든다.
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        // 만약 tail이 없다면 새로운 노드를 또한 tail로 만든다.
        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    /**
     * @param {*} value
     * @return {LinkedList}
     */
    append(value) {
        const newNode = new LinkedListNode(value);

        // 만약 head가 없다면 새로운 노드를 또한 head로 만든다.
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        // 새로운 노드를 tail로 만든다.
        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    /**
     * @param {*} value
     * @return {LinkedListNode}
     */
    delete(value) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;

        // 만약 head가 삭제되어야 한다면 그 다음노드를 head로 만든다.
        while (this.head && this.compare.equal(this.head.value, value)) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            // 만약 다음노드가 삭제되어야 한다면 다음다음노드를 다음노드로 만든다.
            while (currentNode.next) {
                if (this.compare.equal(currentNode.next.value, value)) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                }
                else {
                    currentNode = currentNode.next;
                }
            }
        }

        // tail노드가 삭제되어야 하는지 확인한다.
        if (this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    /**
     * @param {Object} findParams
     * @param {*} findParams.value
     * @param {function} [findParams.callback]
     * @return {LinkedListNode}
     */
    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {
            // 만약 callback이 정의되어 있다면 callback으로 node를 찾는다. 
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            // 만약 value가 정의되어 있다면 value로 node를 찾는다.
            if (value && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    /**
     * @return {LinkedListNode}
     */
    deleteTail() {
        const deletedTail = this.tail;
        
        if (this.head === this.tail) {
            // linked list에 오직 한 노드만 있을 때
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        // 삭제할 노드 바로 전 노드의 next를 null로 할당한다.
        let currentNode = this.head;
        while (currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;

        return deletedTail;
    }

    /**
     * @return {LinkedListNode}
     */
    deleteHead() {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    /**
     * @param {*[]} values
     * @return {LinkedList}
     */
    fromArray(values) {
        values.forEach(value => this.append(value));
    
        return this;
    }

    /**
     * @return {LinkedListNode[]}
     */
    toArray() {
        const nodes = [];

        let currentNode = this.head;
        while(currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
     * @param {function} [callback]
     * @return {string}
     */
    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString();
    }

    /**
     * @returns {LinkedList}
     */
    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currNode) {
            // 다음노드를 저장하고
            nextNode = currNode.next;

            // 현재노드의 다음노드를 이전노드로 변경하고
            currNode.next = prevNode;
            
            // 한 노드씩 이동한다.
            prevNode = currNode;
            currNode = nextNode;
        }

        // head와 tail을 리셋한다.
        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}

