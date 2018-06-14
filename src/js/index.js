import Search from "./models/Search";
import { elements , renderLoader, removeLoader } from './views/base';
import * as searchView from './views/searchView';

const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();

    if(query) {
       state.search = new Search(query);
       renderLoader(elements.results);
       await state.search.getResults();
       removeLoader();
       searchView.clearInput();
       searchView.clearResults();
       searchView.renderResults(state.search.results);
       
    }
}

elements.searchForm.addEventListener('submit' , e => {
    e.preventDefault();
    controlSearch();
})