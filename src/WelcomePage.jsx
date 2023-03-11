/* eslint-disable react/jsx-pascal-case */

import Laptop from './components/animations/Animations';
import './welcomestyle.css'
import Navbar_WelcomePage from './components/navbar/Navbar_WelcomePage';
function WelcomePage() {
    
    
    
    return ( 
        
 
  <div>
    <Navbar_WelcomePage />

    <section id="hero">
 <div className="container">
 <div className="row">
 <div className="col">
 <h1>Software<br/>Development</h1>
 <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p>
 <button type="button" className="btn btn-dark btn-large">Learn more</button>
 </div>
 <div className="col img-col">
 <div className="img-fluid">
  <Laptop />
 </div>
 </div>
 </div>
 <div className="row cards">
 <div className="col-md-4 d-flex justify-content-center">
 <div className="card" style={{width: "18rem"}}>
 <div className="card-body">
 <img src="./assets/icon1.svg" className="icon" alt="Service One"/>
 <h5 className="card-title">Web Dev</h5>
 <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
 </div>
 </div>
 </div>
 <div className="col-md-4 d-flex justify-content-center">
 <div className="card" style={{width: "18rem"}}>
 <div className="card-body">
 <img src="./assets/icon2.svg" className="icon" alt="Service Two"/>
 <h5 className="card-title">Machine Learning</h5>
 <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
 </div>
 </div>
 </div>
 <div className="col-md-4 d-flex justify-content-center">
 <div className="card" style={{width: "18rem"}}>
 <div className="card-body">
 <img src="./assets/icon3.svg" className="icon" alt="Service Three"/>
 <h5 className="card-title">Security</h5>
 <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
 </div>
 </div>
 </div>
  </div>
 </div>
</section>
</div>

    );
}

export default WelcomePage;