import Heap from '../Heap';

describe('Heap 이', () => {
    it('Heap 클래스의 인스턴스로 생성되지 않아야 한다.', () => {
        const instantiateHeap = () => {
            const heap = new Heap();
            heap.add(5);
        };

        expect(instantiateHeap).toThrow();
    });
})