import Search from "./models/Search";
import { elements , renderLoader, removeLoader } from './views/base';
import * as searchView from './views/searchView';
import Recipe from "./models/Recipe";

const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();

    if(query) {
       state.search = new Search(query);
       renderLoader(elements.results);
       try{
        await state.search.getResults();
        removeLoader();
        searchView.clearInput();
        searchView.clearResults();
        searchView.renderResults(state.search.results);
       } catch(error) {}
    }
}

elements.searchForm.addEventListener('submit' , e => {
    e.preventDefault();
    controlSearch();
});

elements.resultsPages.addEventListener('click' , e => {
    searchView.clearResults();
    const btn = e.target.closest('.btn-inline');
    const goTo = parseInt(btn.dataset.goto,10);
    searchView.renderResults(state.search.results,goTo);
  }
);

const controlRecipe = async () => {
  const id = window.location.hash.replace('#','');
  
  if(id){
    state.recipe = new Recipe(id);
    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServing();
      console.log(state.recipe);
    }catch(error) {}
  }
}

['load','hashchange'].forEach(event => window.addEventListener(event,controlRecipe));
