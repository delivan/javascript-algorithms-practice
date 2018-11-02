import MinHeap from '../MinHeap';
import Comparator from '../../../utils/Comparator';

describe('MinHeap은 ', () => {
    it('빈 MinHeap 클래스를 생성해야한다', () => {
        const minHeap = new MinHeap();

        expect(minHeap).toBeDefined();
        expect(minHeap.peek()).toBeNull();
        expect(minHeap.isEmpty()).toBe(true);
    });

    it('데이터를 Heap에 추가하고 Heapify up 해야한다', () => {
        const minHeap = new MinHeap();

        minHeap.add(5);
        expect(minHeap.isEmpty()).toBe(false);
        expect(minHeap.peek()).toBe(5);
        expect(minHeap.toString()).toBe('5');

        minHeap.add(3);
        expect(minHeap.peek()).toBe(3);
        expect(minHeap.toString()).toBe('3,5');

        minHeap.add(7);
        expect(minHeap.peek()).toBe(3);
        expect(minHeap.toString()).toBe('3,5,7');

        minHeap.add(1);
        expect(minHeap.peek()).toBe(1);
        expect(minHeap.toString()).toBe('1,3,7,5');

        minHeap.add(1);
        expect(minHeap.peek()).toBe(1);
        expect(minHeap.toString()).toBe('1,1,7,5,3');
    });

    it('데이터를 Heap에서 Poll하고 Heapify down 해야한다', () =>{
        const minHeap = new MinHeap();

        minHeap.add(5);
        minHeap.add(3);
        minHeap.add(7);
        minHeap.add(1);
        minHeap.add(1);

        expect(minHeap.toString()).toBe('1,1,7,5,3');

        expect(minHeap.poll()).toBe(1);
        expect(minHeap.toString()).toBe('1,3,7,5');

        expect(minHeap.poll()).toBe(1);
        expect(minHeap.toString()).toBe('3,5,7');

        expect(minHeap.poll()).toBe(3);
        expect(minHeap.toString()).toBe('5,7');

        expect(minHeap.poll()).toBe(5);
        expect(minHeap.toString()).toBe('7');

        expect(minHeap.poll()).toBe(7);
        expect(minHeap.toString()).toBe('');

        expect(minHeap.poll()).toBeNull();
        expect(minHeap.toString()).toBe('');
    });

    it('또한 오른쪽 자식에서도 Heapify down 해야한다.', () => {
        const minHeap = new MinHeap();
    
        minHeap.add(3);
        minHeap.add(12);
        minHeap.add(10);
    
        expect(minHeap.toString()).toBe('3,12,10');
    
        minHeap.add(11);
        expect(minHeap.toString()).toBe('3,11,10,12');
    
        expect(minHeap.poll()).toBe(3);
        expect(minHeap.toString()).toBe('10,11,12');
    });

    it('데이터의 indices를 찾을 수 있어야 한다', () => {
        const minHeap = new MinHeap();

        minHeap.add(3);
        minHeap.add(12);
        minHeap.add(10);
        minHeap.add(11);
        minHeap.add(11);
    
        expect(minHeap.toString()).toBe('3,11,10,12,11');

        expect(minHeap.find(5)).toEqual([]);
        expect(minHeap.find(3)).toEqual([0]);
        expect(minHeap.find(11)).toEqual([1, 4]);
    });

    it('데이터를 Heapify up 하면서 삭제할 수 있어야 한다', () => {
        const minHeap = new MinHeap();

        minHeap.add(3);
        minHeap.add(10);
        minHeap.add(5);
        minHeap.add(6);
        minHeap.add(7);
        minHeap.add(4);
        minHeap.add(6);
        minHeap.add(8);
        minHeap.add(2);
        minHeap.add(1);
    
        expect(minHeap.toString()).toBe('1,2,4,6,3,5,6,10,8,7');
        expect(minHeap.remove(8).toString()).toEqual('1,2,4,6,3,5,6,10,7');
        expect(minHeap.remove(7).toString()).toEqual('1,2,4,6,3,5,6,10');
        expect(minHeap.remove(1).toString()).toEqual('2,3,4,6,10,5,6');
        expect(minHeap.remove(2).toString()).toEqual('3,6,4,6,10,5');
        expect(minHeap.remove(6).toString()).toEqual('3,5,4,10');
        expect(minHeap.remove(10).toString()).toEqual('3,5,4');
        expect(minHeap.remove(5).toString()).toEqual('3,4');
        expect(minHeap.remove(3).toString()).toEqual('4');
        expect(minHeap.remove(4).toString()).toEqual('');
    });

    it('사용자가 정의한 comparator로 데이터를 Heapify up 하면서 삭제할 수 있어야 한다', () => {
        const minHeap = new MinHeap();
        minHeap.add('dddd');
        minHeap.add('ccc');
        minHeap.add('bb');
        minHeap.add('a');
    
        expect(minHeap.toString()).toBe('a,bb,ccc,dddd');
    
        const comparator = new Comparator((a, b) => {
          if (a.length === b.length) {
            return 0;
          }
    
          return a.length < b.length ? -1 : 1;
        });
    
        minHeap.remove('hey', comparator);
        expect(minHeap.toString()).toBe('a,bb,dddd');
    });

    it('원하는 데이터를 삭제하고 Heap이 조건에 맞게 정렬되어야 한다.', () => {
        const minHeap = new MinHeap();
    
        minHeap.add(1);
        minHeap.add(2);
        minHeap.add(3);
        minHeap.add(4);
        minHeap.add(5);
        minHeap.add(6);
        minHeap.add(7);
        minHeap.add(8);
        minHeap.add(9);
    
        expect(minHeap.toString()).toBe('1,2,3,4,5,6,7,8,9');
    
        minHeap.remove(2);
        expect(minHeap.toString()).toBe('1,4,3,8,5,6,7,9');
    
        minHeap.remove(4);
        expect(minHeap.toString()).toBe('1,5,3,8,9,6,7');
    });
})