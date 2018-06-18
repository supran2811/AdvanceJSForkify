import { elements } from './base';

export const clearInput = () => elements.searchInput.value = "";

export const getInput = () => elements.searchInput.value;

const limitReciptTitle = (title,limit = 17) => {
    if(title.length > limit) {
        const newTitle = [];
        title.split(' ').reduce((acc , cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        } , 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const htmlMarkup = `
            <li>
                <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="Test">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitReciptTitle(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>`;

    elements.resultList.insertAdjacentHTML('beforeend',htmlMarkup);      
}

const renderButton = (currPage , type) => `
  <button class="btn-inline results__btn--${type}"  data-goto = ${ type === 'next'? ( currPage + 1) : (currPage - 1) }>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type === 'next'?'right':'left'}"></use>
      </svg>
      <span>Page ${type === 'next'?currPage + 1 : currPage - 1}</span>
  </button>
`;

const renderButtons = (page,numOfResult,resultsPerPage) => {
  const pages = Math.ceil(numOfResult/resultsPerPage);
  let button;
  if(page === 1 && pages > 1) {
    button = renderButton(page,'next');
  }
  else if(page < pages) {
    button = `${renderButton(page,'prev')} ${renderButton(page,'next')}`
  }
  else if(page === pages && pages > 1) {
    button = renderButton(page,'prev');
  }

  elements.resultsPages.insertAdjacentHTML('afterbegin',button);
}

export const clearResults = () => {
  elements.resultList.innerHTML = '';
  elements.resultsPages.innerHTML = '';
}

export const renderResults = (recipes , page = 1 , resultsPerPage = 10) => {
     const start = (page-1)*resultsPerPage;
     const end   = page*resultsPerPage;
     recipes.slice(start,end).forEach(renderRecipe);
     renderButtons(page,recipes.length,resultsPerPage);
}