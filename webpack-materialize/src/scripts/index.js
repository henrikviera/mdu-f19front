import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import '../styles/index.scss';

// init modals
document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.modal');
    let instances = M.Modal.init(elems);
});