import Comparator from '../../utils/Comparator';

/**
 * Min Heap과 Max Heap의 부모 클래스
 */
export default class Heap {
    /**
     * @constructs Heap
     * @param {Function} [comparatorFunction]
     */
    constructor(comparatorFunction) {
        if (new.target === Heap) {
            throw new TypeError('Cannot construct Heap instance directly');
        }

        // Heap을 구현할 Array
        this.heapContainer = [];
        this.compare = new Comparator(comparatorFunction);
    }

    /**
     * @param {number} parentIndex
     * @return {number}
     */
    getLeftChildIndex(parentIndex) {
        return (2 * parentIndex) + 1;
    }

    /**
     * @param {number} parentIndex
     * @return {number}
     */
    getRightChildIndex(parentIndex) {
        return (2 * parentIndex) + 2;
    }

    /**
     * @param {number} childIndex
     * @return {number}
     */
    getParentIndex(childIndex) {
        return Math.ceil(childIndex / 2) - 1;
    }

    /**
     * @param {number} parentIndex
     * @return {boolean}
     */
    hasLeftChild(parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }

    /**
     * @param {number} parentIndex
     * @return {boolean}
     */
    hasRightChild(parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }

    /**
     * @param {number} childIndex 
     * @return {boolean}
     */
    hasParent(childIndex) {
        return this.getParentIndex(childIndex) >= 0;
    }

    /**
     * @param {number} parentIndex
     * @return {*}
     */
    leftChild(parentIndex) {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    }
    
    /**
     * @param {number} parentIndex
     * @return {*}
     */
    rightChild(parentIndex) {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    }

    /**
     * @param {number} childIndex
     * @return {*}
     */
    parent(childIndex) {
        return this.heapContainer[this.getParentIndex(childIndex)];
    }

    /**
     * @param {number} indexOne 
     * @param {number} indexTwo 
     */
    swap(indexOne, indexTwo) {
        const tmp = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = tmp;
    }
    
    /**
     * @return {*}
     */
    peek() {
        if (this.heapContainer.length === 0) {
            return null;
        }

        return this.heapContainer[0];
    }

    /**
     * @return {*}
     */
    poll() {
        if (this.heapContainer.length === 0) {
            return null;
        }
        
        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop();
        }

        const item = this.heapContainer[0];

        // 가장 마지막 element를 Head로 이동
        this.heapContainer[0] = this.heapContainer.pop();
        this.heapifyDown();

        return item;
    }

    /**
     * @param {*} item 
     * @param {Comparator} comparator 
     * @return {Number[]}
     */
    find(item, comparator = this.compare) {
        const foundItemIndices = [];

        // 찾은 element의 index들을 저장
        for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
            if (comparator.equal(item, this.heapContainer[itemIndex])) {
                foundItemIndices.push(itemIndex);
            }

            return foundItemIndices;
        }
    }

    /**
     * @param {*} item 
     * @param {Comparator} comparator
     * @return {Heap}
     */
    remove(item, comparator = this.compare) {
        // 삭제할 element들의 수를 저장
        const numberOfItemsToRemove = this.find(item, comparator).length;

        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
            // 삭제한 element의 배열 자리가 heapify로 채워질 것이기 때문에
            // find로 찾은 각각의 index를 저장해놓는다.
            const indexToRemove = this.find(item, comparator).pop();

            // 만약에 삭제할 element가 가장 마지막 child element 라면 
            // heapify를 할 필요가 없기 때문에 그냥 삭제한다.
            if (indexToRemove === (this.heapContainer.length - 1)) {
                this.heapContainer.pop();
            } else {
                // 가장 마지막 element를 삭제할 element의 자리로 이동시킨다.
                this.heapContainer[indexToRemove] = this.heapContainer.pop();
                
                // 삭제한 element 자리의 부모 element를 가져온다. 
                const parentItem = this.parent(indexToRemove);

                // 만약 부모 element가 없거나 heap의 조건이 만족하면 heapifyDown 한다.
                // 그렇지 않으면 heapifyUp 한다.
                if (
                    this.hasLeftChild(indexToRemove)
                    && (
                        !parentItem
                        || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])
                    )
                ) {
                    this.heapifyDown(indexToRemove);
                } else {
                    this.heapifyUp(indexToRemove);
                }
            }
        }
        
        return this;
    }

    /**
     * @return {string}
     */
    toString() {
        return this.heapContainer.toString();
    }

    /**
     * 
     * @param {number} customStartIndex 
     */
    heapifyUp(customStartIndex) {
        // 가장 끝 element나 파라미터로 받은 index의 element를 시작으로 
        // 부모 element와 비교하여 heap 조건에 맞을 때 까지 swap한다.
        let currentIndex = customStartIndex || this.heapContainer.length - 1;

        while (
            this.hasParent(currentIndex)
            && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
        ) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    heapifyDown(customStartIndex = 0) {
        // 가장 첫 element나 파라미터로 받은 index의 element를 시작으로
        // 자식 element와 비교하여 heap 조건에 맞을 때 까지 swap한다.
        let currentIndex = customStartIndex;
        let nextIndex = null;

        while (this.hasLeftChild(currentIndex)) {
            if (
                this.hasRightChild(currentIndex)
                && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
            ) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            if (this.pairIsInCorrectOrder(
                this.heapContainer[currentIndex],
                this.heapContainer[nextIndex]
            )) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }

    /**
     * 
     * @param {*} firstElement 
     * @param {*} secondElement
     * @return {boolean}
     */
    pairIsInCorrectOrder(firstElement, secondElement) {
        // 두 element가 heap 조건에 맞는지 체크합니다.
        // Min Heap은 firstElement가 항상 작거나 같아야 합니다.
        // Max Heap은 firstElement가 항상 크거나 같아야 합니다.
        throw new Error(`
            ${firstElement}와 ${secondElement} value로 
            heap 조건 비교 메소드를 실행해야 합니다.
        `)
    }
}