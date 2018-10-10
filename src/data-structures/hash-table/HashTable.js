import LinkedList from '../linked-list/LinkedList';

const defaultHashTableSize = 32;

export default class HashTable {
    /**
     * @param {number} hashTableSize 
     */
    constructor(hashTableSize = defaultHashTableSize) {
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());

        this.keys = {};
    }

    /**
     * @param {string} key 
     * @return {number} 
     */
    hash(key) {
        const hash = Array.from(key).reduce(
            (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
            0,
        );

        return hash % this.buckets.length;
    }

    /**
     * @param {string} key
     * @param {*} value
     */
    set(key, value) {
        const keyHash = this.hash(key);
        this.keys[key] = keyHash;
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

        if (!node) {
            bucketLinkedList.append({ key, value })
        } else {
            node.value.value = value;
        }
    }

    /**
     * @param {string} key 
     * @return {*}
     */
    delete(key) {
        const keyHash = this.hash(key);
        delete this.keys[key];
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

        if (node) {
            bucketLinkedList.delete(node.value);
        }

        return null;
    }

    /**
     * @param {string} key
     * @return {*}
     */
    get(key) {
        const bucketLinkedList = this.buckets[this.hash(key)];
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

        return node ? node.value.value : undefined;
    }

    /**
     * @param {string} key
     * @return {boolean}
     */
    has(key) {
        return Object.hasOwnProperty.call(this.keys, key);
    }

    getKeys() {
        return Object.keys(this.keys);
    }
}