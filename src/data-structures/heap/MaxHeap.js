import Heap from './Heap';

export default class MaxHeap extends Heap {
    /**
     * @param {*} firstElement 
     * @param {*} secondElement 
     * @return {boolean}
     */
    pairIsInCorrectOrder(firstElement, secondElement) {
        return this.compare.greaterThanOrEqual(firstElement, secondElement);
    }
}