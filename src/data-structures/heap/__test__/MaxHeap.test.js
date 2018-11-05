import MaxHeap from '../MaxHeap';
import Comparator from '../../../utils/Comparator';

describe('MaxHeap은 ', () => {
    it('빈 MaxHeap 클래스를 생성해야한다', () => {
        const maxHeap = new MaxHeap();

        expect(maxHeap).toBeDefined();
        expect(maxHeap.peek()).toBeNull();
        expect(maxHeap.isEmpty()).toBe(true);
    });

    it('데이터를 Heap에 추가하고 Heapify up 해야한다', () => {
        const maxHeap = new MaxHeap();

        maxHeap.add(5);
        expect(maxHeap.isEmpty()).toBe(false);
        expect(maxHeap.peek()).toBe(5);
        expect(maxHeap.toString()).toBe('5');

        maxHeap.add(3);
        expect(maxHeap.peek()).toBe(5);
        expect(maxHeap.toString()).toBe('5,3');

        maxHeap.add(7);
        expect(maxHeap.peek()).toBe(7);
        expect(maxHeap.toString()).toBe('7,3,5');

        maxHeap.add(1);
        expect(maxHeap.peek()).toBe(7);
        expect(maxHeap.toString()).toBe('7,3,5,1');

        maxHeap.add(6);
        expect(maxHeap.peek()).toBe(7);
        expect(maxHeap.toString()).toBe('7,6,5,1,3');
    });

    it('데이터를 Heap에서 Poll하고 Heapify down 해야한다', () =>{
        const maxHeap = new MaxHeap();

        maxHeap.add(5);
        maxHeap.add(3);
        maxHeap.add(7);
        maxHeap.add(1);
        maxHeap.add(6);

        expect(maxHeap.toString()).toBe('7,6,5,1,3');

        expect(maxHeap.poll()).toBe(7);
        expect(maxHeap.toString()).toBe('6,3,5,1');

        expect(maxHeap.poll()).toBe(6);
        expect(maxHeap.toString()).toBe('5,3,1');

        expect(maxHeap.poll()).toBe(5);
        expect(maxHeap.toString()).toBe('3,1');

        expect(maxHeap.poll()).toBe(3);
        expect(maxHeap.toString()).toBe('1');

        expect(maxHeap.poll()).toBe(1);
        expect(maxHeap.toString()).toBe('');

        expect(maxHeap.poll()).toBeNull();
        expect(maxHeap.toString()).toBe('');
    });

    it('또한 오른쪽 자식에서도 Heapify down 해야한다.', () => {
        const maxHeap = new MaxHeap();
    
        maxHeap.add(12);
        maxHeap.add(3);
        maxHeap.add(10);
    
        expect(maxHeap.toString()).toBe('12,3,10');
    
        maxHeap.add(11);
        expect(maxHeap.toString()).toBe('12,11,10,3');
    
        expect(maxHeap.poll()).toBe(12);
        expect(maxHeap.toString()).toBe('11,3,10');
    });

    it('데이터의 indices를 찾을 수 있어야 한다', () => {
        const maxHeap = new MaxHeap();

        maxHeap.add(3);
        maxHeap.add(12);
        maxHeap.add(10);
        maxHeap.add(11);
        maxHeap.add(11);
    
        expect(maxHeap.toString()).toBe('12,11,10,3,11');

        expect(maxHeap.find(5)).toEqual([]);
        expect(maxHeap.find(3)).toEqual([3]);
        expect(maxHeap.find(11)).toEqual([1, 4]);
    });

    it('데이터를 Heapify up 하면서 삭제할 수 있어야 한다', () => {
        const maxHeap = new MaxHeap();

        maxHeap.add(3);
        maxHeap.add(10);
        maxHeap.add(5);
        maxHeap.add(6);
        maxHeap.add(7);
        maxHeap.add(4);
        maxHeap.add(6);
        maxHeap.add(8);
        maxHeap.add(2);
        maxHeap.add(1);
    
        expect(maxHeap.toString()).toBe('10,8,6,7,6,4,5,3,2,1');
        expect(maxHeap.remove(8).toString()).toEqual('10,7,6,3,6,4,5,1,2');
        expect(maxHeap.remove(7).toString()).toEqual('10,6,6,3,2,4,5,1');
        expect(maxHeap.remove(1).toString()).toEqual('10,6,6,3,2,4,5');
        expect(maxHeap.remove(2).toString()).toEqual('10,6,6,3,5,4');
        expect(maxHeap.remove(6).toString()).toEqual('10,5,4,3');
        expect(maxHeap.remove(10).toString()).toEqual('5,3,4');
        expect(maxHeap.remove(5).toString()).toEqual('4,3');
        expect(maxHeap.remove(3).toString()).toEqual('4');
        expect(maxHeap.remove(4).toString()).toEqual('');
    });

    it('사용자가 정의한 comparator로 데이터를 Heapify up 하면서 삭제할 수 있어야 한다', () => {
        const maxHeap = new MaxHeap();
        maxHeap.add('a');
        maxHeap.add('bb');
        maxHeap.add('ccc');
        maxHeap.add('dddd');
    
        expect(maxHeap.toString()).toBe('dddd,ccc,bb,a');
    
        const comparator = new Comparator((a, b) => {
          if (a.length === b.length) {
            return 0;
          }
    
          return a.length < b.length ? -1 : 1;
        });
    
        maxHeap.remove('hey', comparator);
        expect(maxHeap.toString()).toBe('dddd,a,bb');
    });

    it('원하는 데이터를 삭제하고 Heap이 조건에 맞게 정렬되어야 한다.', () => {
        const maxHeap = new MaxHeap();
    
        maxHeap.add(9);
        maxHeap.add(8);
        maxHeap.add(7);
        maxHeap.add(6);
        maxHeap.add(5);
        maxHeap.add(4);
        maxHeap.add(3);
        maxHeap.add(2);
        maxHeap.add(1);
    
        expect(maxHeap.toString()).toBe('9,8,7,6,5,4,3,2,1');
    
        maxHeap.remove(8);
        expect(maxHeap.toString()).toBe('9,6,7,2,5,4,3,1');
    
        maxHeap.remove(5);
        expect(maxHeap.toString()).toBe('9,6,7,2,1,4,3');
    });
})