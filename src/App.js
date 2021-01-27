import Header from './components/Header.js';
import SearchBox from './components/SearchBox.js';
import Dropdown from './components/Dropdown.js';

import Recommand from './api/Recommand.js';
import Search from './api/Search.js';
export default class App {
    constructor($target) {
        
        new Header($target);
        new SearchBox($target, new Recommand(), new Search(), new Dropdown($target));

        
        
    }
}
