import Trie from '../Trie';

describe('Trie는', () => {
    it('trie 인스턴스를 만들어야 한다.', () => {
        const trie = new Trie();
        
        expect(trie).toBeDefined();
        expect(trie.head.toString()).toBe('*');
    });

    it('단어들을 trie에 추가할 수 있어야 한다.', () => {
        const trie = new Trie();
        
        trie.addWord('cat');
        
        expect(trie.head.toString()).toBe('*:c');
        expect(trie.head.getChild('c').toString()).toBe('c:a');
        
        trie.addWord('car');
        expect(trie.head.toString()).toBe('*:c');
        expect(trie.head.getChild('c').toString()).toBe('c:a');
        expect(trie.head.getChild('c').getChild('a').toString()).toBe('a:t,r');
        expect(trie.head.getChild('c').getChild('a').getChild('t').toString()).toBe('t*');
    });
    
    it('주어진 단어의 다음 글자들을 보여줄 수 있어야 한다.', () => {
        const trie = new Trie();
        
        trie.addWord('cat');
        trie.addWord('cats');
        trie.addWord('car');
        trie.addWord('caption');
        
        expect(trie.suggestNextCharacters('ca')).toEqual(['t', 'r', 'p']);
        expect(trie.suggestNextCharacters('cat')).toEqual(['s']);
        expect(trie.suggestNextCharacters('cab')).toBeNull();
    });
    
    it('단어가 존재하는지 체크할 수 있어야 한다.', () => {
        const trie = new Trie();
        
        trie.addWord('cat');
        trie.addWord('cats');
        trie.addWord('car');
        trie.addWord('caption');
        
        expect(trie.doesWordExist('cat')).toBeTruthy();
        expect(trie.doesWordExist('cap')).toBeTruthy();
        expect(trie.doesWordExist('call')).toBeFalsy();
    });
})