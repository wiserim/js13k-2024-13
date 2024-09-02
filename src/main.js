import game from './game';

import {Text} from './entity/text';
import {Person} from './entity/person';
import {Board} from './entity/board';
import {File} from './entity/file';
import {PersonFile} from './entity/person-file';

window.game = game;

game.scenes['board']  = new Board();
/*
game.scenes['file']  = new File();
game.scenes['text']  = new Text({x: 160, y: 120, background: '#f00', text: [
    'abcdefghijklmnopqrstvuwxyz',
    '1234567890+-,.!?'
]});
*/
game.scenes['personFile']  = new PersonFile();
game.scenes['personFile'].active = 0;

for(let person of game.scenes['board'].getAll()) {
    person.generatePortrait();
    person.on('click', () => {
        game.scenes['personFile'].person = person;
        game.scenes['personFile'].show();
    });
}

game.init();

console.log(game.scenes['text'])