import { useState } from "react";
import { useSelector } from "react-redux";
import "./ewallet.css";
import BitcoinImage from '../../style/img/Bitcoin.jpg';
import AmexImage from '../../style/img/amex.jpg';
import VisaImage from '../../style/img/Visa.jpg';
import { useDispatch } from "react-redux";
import { deleteCard } from "../../redux/cardSlice"; 

const Ewallet = () => {
  const creditCard = useSelector((state) => state.cardInfo);
  const dispatch = useDispatch();
  
  const [state, setState] = useState({
    cardInformation: creditCard.cardInformation,
    activeObject: 0,
  });
  
  const deleteCardHandler = (cardIndex) => {
    dispatch(deleteCard(cardIndex));
  };

  console.log(deleteCard);
  console.log(deleteCardHandler);

  const toggleActive = (index) => {
    setState({ ...state, activeObject: index });
  };

  const toggleActiveStyle = (index) => {
    if (index === state.activeObject) {
      return "active";
    } else {
      return "inactive";
    
    }
  };
  

  return (
    <>
      <h1 id="Userid">Active Card</h1>
      <ul>
      {state.cardInformation.map((credit, index) => {
        return (
          <li
            key={index}
            className={toggleActiveStyle(index)}
            onClick={() => {
              toggleActive(index);
            }}
          >
            <div className="credit-card">
              
                <div className="credit-card-img">
                  {credit.bankName === "American Express" ? (
                    <img src={AmexImage} id="MyAmex" alt="American Express" />
                  ) : credit.bankName === "Visa" ? (
                    <img src={VisaImage} id="MyVisa" alt="Visa" />
                  ) : (
                    <img src={BitcoinImage} id="MyBit" alt="Bitcoin" />
                  )}
                </div>
                <br></br>

                <div className="credit-card-credentials">{credit.cardNumber}</div>
                <span className="credit-ccv">{credit.ccv}</span>
                <div className="credit-card-nameid">
                  <div className="credit-card-info-name">
                    <div className="credit-card-info-label">
                      CARDHOLDER'S NAME
                    </div>
                    <div value={credit.cardName}>{credit.cardName}</div>
                  </div>
                      
                  <div className="credit-card-info-expiry">
                    <div className="credit-card-info-label">VALID UP TO</div>
                    <div>
                      {" "}
                      {credit.cardMonth} / {credit.cardYear}
                    </div>
                    
                  </div>
                  
                </div>
                
              </div>
              <button onClick={() => deleteCardHandler(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Ewallet;
