export const highlight = event => {
    event.currentTarget.classList.toggle('highlighted');
};

export const setActive = event => {
    event.preventDefault();

    const { currentTarget } = event;
    const navItems = currentTarget.parentNode.querySelectorAll('nav li');

    navItems.forEach(navItem => {
        navItem.classList.remove('active');
    });

    const pages = document.querySelectorAll('[id*="page"]');

    pages.forEach(page => {
        if (page.dataset.page === currentTarget.dataset.page) {
            page.classList.add('active');
        } else {
            page.classList.remove('active')
        }
    });

    currentTarget.classList.add('active');
};

export const getStudioGhibliFilmData = (url, selector) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const outerContainer = document.querySelector(selector);
            const logo = document.createElement('img');
            logo.id = 'logo';
            logo.src = '/assets/images/studio-ghibli-logo.png';
            outerContainer.appendChild(logo);

            const section = document.createElement('section');
            outerContainer.appendChild(section);
            section.classList.add('container');

            data.forEach(movie => {
                const card = document.createElement('div');
                card.classList.add('card');

                const h1 = document.createElement('h1');
                h1.textContent = movie.title;

                const p = document.createElement('p');
                p.textContent = movie.description;

                section.appendChild(card);
                card.appendChild(h1);
                card.appendChild(p);

                if (movie.title === 'My Neighbor Totoro') {
                    movie.url = 'https://404.com/whatever';
                }

                fetch(movie.url)
                    .then(response => {
                        if (response.ok) {
                            const a = document.createElement('a');
                            a.href = movie.url;
                            a.classList.add('movie-link');
                            a.textContent = 'Link';
                            p.appendChild(a);
                        }
                        console.log(response);
                    })
                    .catch(err => console.debug(err));
            });
        })
        .catch(error => console.log(error));
};

export const getRecipePuppyData = (url, selector) => {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        const searchParams = new URLSearchParams();
        for (const pair of new FormData(document.forms['recipe-fetch-form'])) {
            searchParams.append(pair[0], pair[1]);
        }

        fetch(`${proxyUrl}${url}${searchParams && `?${searchParams}`}`)
    .then(response => response.json())
    .then(data => {
        const outerContainer = document.querySelector(selector);
        outerContainer.innerHTML = ''; // Clear container

        const section = document.createElement('section');
        outerContainer.appendChild(section);
        section.classList.add('container');

        const h1 = document.createElement('h1');
        h1.classList.add('w-100', 'text-center');
        h1.textContent = `${data.title} Results`;
        section.insertAdjacentElement('beforebegin', h1);

        const sortedRecipes = sortRecipeByTitle(data.results);

        sortedRecipes.forEach(recipe => {
            const { title, ingredients, href, thumbnail } = recipe;

            const card = document.createElement('div');
            card.classList.add('card');

            const cardTitle = document.createElement('h2');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = title;

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body', 'm-0', 'pt-0', 'pb-5', 'px-5');

            if (thumbnail) {
                fetch(proxyUrl + thumbnail, {'Retry-After': 3600})
                    .then(response => {
                        if (response.ok) {
                            cardBody.insertAdjacentHTML('afterbegin', `<img src="${thumbnail}" class="d-block mb-3 mx-auto" alt="${title}"/>`);
                        } else {
                            cardBody.insertAdjacentHTML('afterbegin', `<img src="/images/utensils-icon.png" class="d-block mb-3 mx-auto" alt="${title}"/>`);
                        }
                    })
                    .catch(err => console.debug(`Failed to fetch ${thumbnail} due to ${err}`));
            } else {
                cardBody.insertAdjacentHTML('afterbegin', `<img src="assets/images/utensils-icon.png" class="d-block mb-3 mx-auto" alt="${title}"/>`);
            }

            const ingredientsArray = ingredients.trim().split(',');
            ingredientsArray.map((ingredient, index) => {
                const ingredientLink = document.createElement('a');
                ingredientLink.href = '#';

                ingredient = ingredient.trim();
                ingredientLink.setAttribute('data-ingredient', ingredient);
                ingredientLink.textContent = ingredient;
                cardBody.appendChild(ingredientLink);

                const lastIngredient = ingredientsArray.length === index + 1;
                if (!lastIngredient) {
                    ingredientLink.insertAdjacentHTML('afterend', ', ');
                }

                ingredientLink.addEventListener('click', event => {
                    event.preventDefault();
                    const form = document.forms['recipe-fetch-form'];
                    const input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', 'i');
                    input.setAttribute('value', ingredient);
                    form.appendChild(input);

                    const submitEvent = new Event('submit');

                    form.dispatchEvent(submitEvent);
                });
            });

            section.appendChild(card);
            card.appendChild(cardTitle);
            card.appendChild(cardBody);

            fetch(proxyUrl + href, { 'Retry-After': 3600 })
                .then(response => {
                    if (response.ok) {
                        const recipeLink = document.createElement('a');
                        recipeLink.href = href;
                        recipeLink.target = '_blank';
                        recipeLink.classList.add('card-link', 'm-0', 'mt-3', 'd-block', 'text-center', 'btn', 'btn-default');
                        recipeLink.textContent = 'View Recipe';
                        cardBody.appendChild(recipeLink);
                    }
                })
                .catch(err => console.debug(`Failed to fetch ${href} due to ${err}`));
        });
    })
    .catch(error => console.log(error));
};

const sortRecipeByTitle = arr => arr
.filter(item => item.title)
.sort((item1, item2) => {
    if (item1.title < item2.title) {
        return -1;
    } else if (item1.title > item2.title) {
        return 1;
    }

    return 0;
});