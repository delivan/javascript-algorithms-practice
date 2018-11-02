import Heap from './Heap';

export default class MinHeap extends Heap {
    /**
     * @param {*} firstElement 
     * @param {*} secondElement
     * @return {boolean}
     */
    pairIsInCorrectOrder(firstElement, secondElement) {
        return this.compare.lessThanOrEqual(firstElement, secondElement);
    }
}