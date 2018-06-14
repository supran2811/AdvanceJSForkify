export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    resultList: document.querySelector('.results__list'),
    results: document.querySelector('.results')
}

export const elementStrings = {
    loader : 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin',loader);
}

export const removeLoader = () => {
        document.querySelector(`.${elementStrings.loader}`).remove();
}