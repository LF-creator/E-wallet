import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewCard, fetchRandomUser } from "../../redux/cardSlice";
import "./card.css";
import amexImage from "../../style/img/amex.jpg";
import visaImage from "../../style/img/Visa.jpg";
import bitcoinImage from "../../style/img/Bitcoin.jpg";
import { useNavigate } from "react-router-dom";

const cardData = {
  cardName: "",
  cardNumber: "",
  cardMonth: "",
  cardYear: "",
  ccv: "",
  bankName: "American Express",
};

const Card = () => {
  const creditCard = useSelector((state) => state.cardInfo);
  const dispatch = useDispatch();
  const [values, setValues] = useState(cardData);
  const navigate = useNavigate();

  useEffect(() => {
  dispatch(fetchRandomUser())
    .then((response) => {
      const { first, last } = response.payload.name;
      const wholeName = `${first} ${last}`.toUpperCase();
      setValues((prev) => ({
        ...prev,
        cardName: wholeName,
      }));
    })
    .catch((error) => {
      console.error("Failed to fetch random user: ", error);
    });
}, [dispatch]);

  const handleChange = (e) => {
    const nextCard = {
      ...values,
      [e.target.name]: e.target.value,
    };
    setValues(nextCard);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (creditCard.cardInformation.length < 4) {
      dispatch(fetchRandomUser())
        .then((response) => {
          const { first, last } = response.payload.name;
          const wholeName = `${first} ${last}`.toUpperCase();
          const updatedValues = {
            ...values,
            cardName: wholeName,
          };
          dispatch(addNewCard(updatedValues));
          setValues(cardData);
          navigate("/ewallet");
        })
        .catch((error) => {
          console.error("Failed to fetch random user: ", error);
        });
    } else {
      alert("Max limit reached.");
    }
  };

  return (
    <div className="card-page">
      <div className="card-preview">
        <div className="credit-card">
          <div className="credit-card-img">
            {values.bankName === "American Express" ? (
              <img src={amexImage} id="MyAmex" alt="American Express" />
            ) : values.bankName === "Visa" ? (
              <img src={visaImage} id="MyVisa" alt="Visa" />
            ) : (
              <img src={bitcoinImage} id="MyBit" alt="Bitcoin" />
            )}
          </div>

          <div className="credit-card-credentials">{values.cardNumber}</div>
          <span className="credit-ccv">{values.ccv}</span>
          <div className="credit-card-nameid">
            <div className="credit-card-info-name">
              <div className="valid">Name</div>
              <div>{values.cardName}</div>
            </div>

            <div className="credit-card-info-expiry">
              <div className="valid">Valid to</div>
              <div>
                {values.cardMonth} / {values.cardYear}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-form">
        <form className="myForm" onSubmit={handleSubmit}>
          <label>
            Number
            <input
              type="text"
              maxLength="16"
              name="cardNumber"
              value={values.cardNumber}
              onChange={handleChange}
            />
          </label>

          <div>
            <label>Expiration Date</label>
            <div>
              Month
              <input
                type="text"
                maxLength="2"
                name="cardMonth"
                value={values.cardMonth}
                onChange={handleChange}
              />
            </div>
            <div>
              Year
              <input
                type="text"
                maxLength="2"
                name="cardYear"
                value={values.cardYear}
                onChange={handleChange}
              />
            </div>
          </div>

          <label>
            CCV
            <input
              type="text"
              maxLength="3"
              name="ccv"
              value={values.ccv}
              onChange={handleChange}
            />
          </label>

          <select name="bankName" value={values.bankName} onChange={handleChange}>
            <option value="American Express">American Express</option>
            <option value="Visa">Visa</option>
            <option value="Bitcoin">Bitcoin</option>
          </select>

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Card;