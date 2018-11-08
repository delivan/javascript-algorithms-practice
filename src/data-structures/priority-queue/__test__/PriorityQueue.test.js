import PriorityQueue from '../PriorityQueue';

describe('PriorityQueue는', () => {
    it('기본 priority queue를 만들 수 있어야 한다.', () => {
        const priorityQueue = new PriorityQueue();

        expect(priorityQueue).toBeDefined();
    });

    it('priority를 반영하여 queue에 데이터를 넣을 수 있어야 한다.', () => {
        const priorityQueue = new PriorityQueue();

        priorityQueue.add(10, 1);
        expect(priorityQueue.peek()).toBe(10);

        priorityQueue.add(5, 2);
        expect(priorityQueue.peek()).toBe(10);

        priorityQueue.add(100, 0);
        expect(priorityQueue.peek()).toBe(100);
        expect(priorityQueue.toString()).toBe('100,5,10');
    });

    it('priority를 반영하여 queue에서 데이터를 poll할 수 있어야 한다.', () => {
        const priorityQueue = new PriorityQueue();

        priorityQueue.add(10, 1);
        priorityQueue.add(5, 2);
        priorityQueue.add(100, 0);
        priorityQueue.add(200, 0);

        expect(priorityQueue.poll()).toBe(100);
        expect(priorityQueue.poll()).toBe(200);
        expect(priorityQueue.poll()).toBe(10);
        expect(priorityQueue.poll()).toBe(5);
    });

    it('데이터의 priority를 바꿀 수 있어야 한다.', () => {
        const priorityQueue = new PriorityQueue();

        priorityQueue.add(10, 1);
        priorityQueue.add(5, 2);
        priorityQueue.add(100, 0);
        priorityQueue.add(200, 0);
        
        priorityQueue.changePriority(100, 10);
        priorityQueue.changePriority(10, 20);

        expect(priorityQueue.poll()).toBe(200);
        expect(priorityQueue.poll()).toBe(5);
        expect(priorityQueue.poll()).toBe(100);
        expect(priorityQueue.poll()).toBe(10);
    });

    it('값으로 데이터를 찾을 수 있어야 한다.', () => {
        const priorityQueue = new PriorityQueue();

        priorityQueue.add(10, 1);
        priorityQueue.add(5, 2);
        priorityQueue.add(100, 0);
        priorityQueue.add(200, 0);
        priorityQueue.add(15, 15);
    
        expect(priorityQueue.hasValue(70)).toBe(false);
        expect(priorityQueue.hasValue(15)).toBe(true);
    });
})