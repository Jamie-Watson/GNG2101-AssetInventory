import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Navbar({username}){
    return(<nav class="navbar navbar-expand-lg navbar-light bg-light" style={{}}>
        <a class="navbar-brand" href="#">{username}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item active">
                <button class="nav-link" href="#" onClick={handleSignInClick}>Sign Out</button>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Search</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Scan</a>
            </li>
            </ul>
        </div>
    </nav>);
}