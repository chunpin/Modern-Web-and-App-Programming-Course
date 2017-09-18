import Component from './component.js';
import Role from './role.js';
import Turn from './turn.js';

import './banner.css';

export default class Banner extends Component {
    static getRootClass() {
        return '.banner';
    }

    constructor(root) {
        super(root);  // this.root , banner div object
        this.roles = {};

        const els = root.querySelectorAll(Role.getRootClass());   //return '.role';
        this.roles['O'] =  new Role(els[0]);
        this.roles['X'] =  new Role(els[1]);

        this.turn = new Turn(root.querySelector('.turn'));
    }

    reset(x) {
        this.roles['O'].reset();
        this.roles['X'].reset();
        this.turn.setTurn(x);
    }

    setScore(x) {
        this.roles[x].setScore();
    }
}



