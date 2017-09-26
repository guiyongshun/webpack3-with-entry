import words from './b';

export default function createNode(){
    let node = document.createElement('div');

    node.textContent = words.greetText;

    return node;
}

export function jim(){
    return 'jim'
}

let person = {
    word: 'haha',
    say(){
        alert(this.word);
    }
}

export {person}