import Header from './components/Header.js';
import SearchBox from './components/SearchBox.js';
import Dropdown from './components/Dropdown.js';

import Recommand from './api/Recommand.js';
import Search from './api/Search.js';
export default class App {
    constructor($target) {
        
        new Header($target);
        const recommand = new Recommand();
        const search = new Search();
        const dropdown = new Dropdown($target); 


        // new SearchBox($target, new Recommand(), new Search(), new Dropdown($target));
        new SearchBox({
            $target,
            onRecommand: async (e, input) => {
                if(e.keyCode === 13) return;
                if(e.keyCode === 27) {
                    dropdown.clear(); 
                    dropdown.create(); 
                    dropdown.setData('');
                    return;
                }
                
                if(e.keyCode === 40) {
                    dropdown.downHighlight();
                    return;
                }
    
                if(e.keyCode === 38) {
                    dropdown.upHighlight();
                    return; 
                }
    
                console.log(e.keyCode, input.value);
                const data = await recommand.setKeyword(input.value);
                dropdown.setData(data);
            },
            onSearch: async (e, value) => {
                e.preventDefault();
                const data = await search.setSearch(value);
                console.log(data);
                dropdown.clear();
                dropdown.create();
            }
        });


        
        
        
    }
}
