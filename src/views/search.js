import { html } from "../libs.js";
import { searchCars } from "../api/data.js";



const searchTemplate = (cars, onSearch, text='') => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value=${text}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        <!-- Display all records -->
        ${cars.length > 0 ? cars.map(carTemplate) : html`<p class="no-cars"> No results.</p>`}

        <!-- Display if there are no matches -->
        
    </div>
</section>`;

const carTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;


export async function showSearch(ctx) {
    const query = ctx.querystring.split('=')[1];
    let cars = [];

    if (query) {
        cars = await searchCars(decodeURIComponent(Number(query)));
    }

    ctx.render(searchTemplate(cars, onSearch, query));

    function onSearch(event) {
        const searched = event.target.parentNode.querySelector('#search-input');
        ctx.page.redirect('/search?query=' + encodeURIComponent(searched.value))
    }
}