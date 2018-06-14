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
                <a class="results__link results__link--active" href="${recipe.recipe_id}">
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

export const clearResults = () => elements.resultList.innerHTML = '';

export const renderResults = recipes => {
     recipes.forEach(renderRecipe);
}