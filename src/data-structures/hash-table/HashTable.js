import LinkedList from '../linked-list/LinkedList';

// Hash Table의 sizes는 collision이 발생하는 횟수에 영향을 줍니다.
// Hash Table의 size가 클수록 collision의 발생이 줄어듭니다.
// Collision이 어떻게 처리되는지 보여주기 위해 Hash Table의 size를 작게 했습니다.
const defaultHashTableSize = 32;

export default class HashTable {
    /**
     * @param {*} HashTableSize 
     */
    constructor(HashTableSize = defaultHashTableSize) {
        // 입력한 size의 hash table을 만들고 각 bucket에 빈 linked list를 할당합니다.
        this.buckets = Array(HashTableSize).fill(null).map(() => new LinkedList());

        // key들을 빠르게 훑을 수 있게 따로 객체에 저장합니다.
        this.keys = {};
    }

    /**
     * @param {string} key 
     * @return {number}
     */
    hash(key) {
        // hash는 단순하게 입력받은 key의 각 글자의 charcode의 합으로 계산합니다.
        // 그러나 이는 굉장히 단순한 방법이므로 당신은 polynomial string hash 같은 
        // 좀 더 세련된 방법을 사용할 수 있습니다.
        // ex) hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
        // 여기서 charCodeAt(i)는 key의 i번째 chararcter code이고 n은 key의 길이입니다.
        // PRIME은 31같이 아무 소수나 될 수 있습니다.
        const hash = Array.from(key).reduce(
            (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
            0,
        );

        // hash한 수를 우리의 table size에 맞게 줄여줍니다.
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
            // 새로운 node를 insert합니다.
            bucketLinkedList.append({ key, value });
        } else {
            // 존재하는 node의 value를 update합니다.
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
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key});

        if (node) {
            return bucketLinkedList.delete(node.value);
        }

        return null;
    }

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

    /**
     * @return {string[]};
     */
    getKeys() {
        return Object.keys(this.keys);
    }
}