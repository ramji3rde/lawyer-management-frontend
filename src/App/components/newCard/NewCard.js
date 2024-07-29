import React from "react";
import './NewCard.css';
import client from "../img/clients-assisted.png";
import billion from "../img/coroprate-transition.png";
import search from "../img/representations.png";
import expereince from "../img/experiences.png";
const NewCard = () => {
  return (
    <div  className="newcard-container">
      <div className="newcard-container-img-text">
        <div className='newcard-img'><img src={billion} alt="billion" height='50px' /></div>
        <div className='newcard-text'>
          <div className="box-numbers">5+</div>
          <div style={{width:'61%'}}>Billion worth cororate tranasactions handled last
            year</div>
        </div>
      </div>
      <div className="newcard-container-img-text">
        <div className='newcard-img'><img src={client} alt="client" height='50px' /></div>
        <div className='newcard-text'>
          <div className="box-numbers">100+</div>
          <div style={{width:'80%'}} >Clients assisted in  setting up in india</div>
        </div>
      </div>
      <div className="newcard-container-img-text">
        <div className='newcard-img' ><img src={search} alt="client" height='50px' /></div>
        <div className='newcard-text'>
          <div className="box-numbers">30+</div>
          <div style={{width:'78%'}}>Clients assisted in  setting up in india</div>
        </div>
      </div>
      <div className="newcard-container-img-text">
        <div className='newcard-img'><img src={expereince} alt="client" height='50px' /> </div>
        <div className='newcard-text'>
          <div className="box-numbers">90+</div>
          <div style={{width:'81%'}}>Years of cummulative partner exprience</div>
        </div>
      </div>
      {/* <div className="container-box">
       <span style={{display:"flex"}}>
          <img src={billion} alt="billion" />
          <p className="box-numbers-1">
          <div className="box-numbers">5+</div>
            Billion worth cororate tranasactions handled last
            year
            </p>
            </span>
            <span style={{display:"flex"}}>
          <img src={client} alt="client" />
         
          <p>
          <div className="box-numbers">100+</div>
          Clients assisted in  setting up in india</p>
          </span>
          <span style={{display:"flex"}}>
            <img src={search} alt="client" />
         
         <p>
         <div className="box-numbers">30+</div>Clients assisted in  setting up in india</p>
         </span>
         <span style={{display:"flex"}}>
        <img src={expereince} alt="client" /> 
        <p>
        <div className="box-numbers">90+</div>
            Years of cummulative partner exprience</p>
        </span>
      </div> */}
    </div>
  );
};

export default NewCard;
