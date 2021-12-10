import { html } from "../libs.js";
import { getAllCars, getCarsByPage, getCount } from "../api/data.js";


const listingsTemplate = (cars, page, count) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    
    <div class="listings">

        <!-- Display all records -->
        ${cars.length > 0 ? cars.map(carTemplate) : html`<p class="no-cars">No cars in database.</p>`}
        <!-- Display if there are no records -->
        <div class="pages">
            ${page > 1 ? html`<a href="?page=${page-1}" class="button-carDetails">&lt;Prev page </a>` : null}
            ${count > page ? html`<a href="?page=${page+1}" class="button-carDetails"> Next page&gt;</a>` : null}
        </div>
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
            <a href='/details/${car._id}' class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;


export async function showListings(ctx) {
    let page = ctx.querystring.split('=')[1] || 1;
    const [cars, count] = await Promise.all([getCarsByPage(page), getCount()])

    ctx.render(listingsTemplate(cars, Number(page), count));
    ctx.updateNav();

}


