import { render, page } from "./libs.js";
import { showListings } from "./views/allListings.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showMyListings } from "./views/myListings.js";
import { showHome } from "./views/home.js";
import { showSearch } from "./views/search.js";
import { hasUserInfo, getUserInfo } from "./util.js";
import { logout } from "./api/data.js";


const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);


page(decorateContext);
page('/', showHome);
page('/home', showHome)
page('/login', showLogin);
page('/register', showRegister);
page('/allListings', showListings);
page('/create', showCreate);
page('/search', showSearch)
page('/myListings', showMyListings)
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
updateNav();

page.start()

function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, root);
    ctx.updateNav = updateNav;

    next();
}

async function onLogout() {
    await logout();
    page.redirect('/');
    
}


function updateNav() {

    if (hasUserInfo()) {
        const username = getUserInfo().username;
        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        document.getElementById('welcome').textContent = `Welcome, ${username}`;
    } else {
        document.getElementById('guest').style.display = 'block';
        document.getElementById('profile').style.display = 'none';
    }
}