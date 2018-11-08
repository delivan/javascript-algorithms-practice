import TrieNode from '../TrieNode';

describe('TrieNode는', () => {
    it('trie node 인스턴스를 생성할 수 있어야 한다.', () => {
        const trieNode = new TrieNode('c', true);

        expect(trieNode.character).toBe('c');
        expect(trieNode.isCompleteWord).toBe(true);
        expect(trieNode.toString()).toBe('c*');
    });

    it('자식 노드를 추가할 수 있어야 한다.', () => {
        const trieNode = new TrieNode('c');

        trieNode.addChild('a', true);
        trieNode.addChild('o');

        expect(trieNode.toString()).toBe('c:a,o');
    });

    it('자식 노드들을 get할 수 있어야 한다.', () => {
        const trieNode = new TrieNode('c');

        trieNode.addChild('a');
        trieNode.addChild('o');

        expect(trieNode.getChild('a').toString()).toBe('a');
        expect(trieNode.getChild('a').character).toBe('a');
        expect(trieNode.getChild('o').toString()).toBe('o');
        expect(trieNode.getChild('b')).toBeUndefined();
    });

    it('노드가 자식노드를 가지고 있는지 확인할 수 있어야 한다.', () => {
        const trieNode = new TrieNode('c');

        expect(trieNode.hasChildren()).toBe(false);

        trieNode.addChild('a');

        expect(trieNode.hasChildren()).toBe(true);
    });

    it('노드가 특정 자식노드를 가지는지 확인할 수 있어야 한다.', () => {
        const trieNode = new TrieNode('c');

        trieNode.addChild('a');
        trieNode.addChild('o');
    
        expect(trieNode.hasChild('a')).toBe(true);
        expect(trieNode.hasChild('o')).toBe(true);
        expect(trieNode.hasChild('b')).toBe(false);
    });

    it('다음 자식노드들이 뭔지를 알 수 있어야 한다.', () => {
        const trieNode = new TrieNode('c');
    
        trieNode.addChild('a');
        trieNode.addChild('o');
    
        expect(trieNode.suggestChildren()).toEqual(['a', 'o']);
    });

    it('만약 자식노드의 자식들이 없다면 그 자식노드를 삭제할 수 있어야 한다.', () => {
        const trieNode = new TrieNode('c');
        trieNode.addChild('a');
        expect(trieNode.hasChild('a')).toBe(true);

        trieNode.removeChild('a');
        expect(trieNode.hasChild('a')).toBe(false);
    });

    it('만약 자식노드의 자식들이 있다면 그 자식노드를 삭제할 수 없어야 한다.', () => {
        const trieNode = new TrieNode('c');
        trieNode.addChild('a');
        const childNode = trieNode.getChild('a');
        childNode.addChild('r');
    
        trieNode.removeChild('a');
        expect(trieNode.hasChild('a')).toEqual(true);
    });

    it('만약 자식노드가 완성된 단어라면 그 자식노드를 삭제할 수 없어야 한다.', () => {
        const trieNode = new TrieNode('c');
        const IS_COMPLETE_WORD = true;
        trieNode.addChild('a', IS_COMPLETE_WORD);
    
        trieNode.removeChild('a');
        expect(trieNode.hasChild('a')).toEqual(true);
    });
});