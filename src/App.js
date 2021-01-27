import Header from './components/Header.js';
import SearchBox from './components/SearchBox.js';
import Recommand from './api/Recommand.js';
import Dropdown from './components/Dropdown.js';

export default class App {
    constructor($target) {
        
        new Header($target);
        new SearchBox($target, new Recommand(), new Dropdown($target));

        
        
    }
}
