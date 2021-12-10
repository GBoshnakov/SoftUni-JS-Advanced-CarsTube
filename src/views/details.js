import { html } from "../libs.js";
import { deleteCar, getCarById } from "../api/data.js";
import { getUserInfo } from "../util.js";


const detailsTemplate = (car, onDelete, isOwner = false) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>

        <div class="listings-buttons">
            ${isOwner 
                ? html`<a href="/edit/${car._id}" class="button-list">Edit</a>
                       <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>`
                : null}
        </div>
    </div>
</section>`;




export async function showDetails(ctx) {
    const carId = ctx.params.id
    const car = await getCarById(carId)

    const userInfo = getUserInfo();
    const isOwner = userInfo && userInfo.id == car._ownerId;

    ctx.render(detailsTemplate(car, onDelete, isOwner));

    async function onDelete() {
        await deleteCar(carId);
        ctx.page.redirect('/allListings');
    }
}