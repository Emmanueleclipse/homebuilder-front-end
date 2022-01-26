import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Paypal } from "../../assets/PayPal.svg";
import { ReactComponent as Stripe } from "../../assets/stripe.svg";
import Button from "../../components/button/button.component";
import { useHistory } from "react-router-dom";
import Select from 'react-select'
import countryList from 'react-select-country-list'

import axios from "../../axios";
import "./payment.styles.scss";

const Payment = (props) => {
  const history = useHistory();
  const options = useMemo(() => countryList().getData(), [])
  const PaymentMethod = props.match.params.method
  const [loadingMessage, setLoadingMessage] = useState(null)
  const { token } = useSelector((state) => state.authReducer);
  const [errors, seterrors] = useState(null)
  const [Cardname, setcardname] = useState(null)
  const [ExpYear, setExpYear] = useState(null)
  const [ExpMonth, setExpMonth] = useState(null)
  const [CardNumber, setCardNumber] = useState(null)
  const [CVCNumber, setCVCNumber] = useState(null)
  const [Fullname, setFullname] = useState(null)
  const [BILLINGADDRESS, setBILLINGADDRESS] = useState(null)
  const [CITY, setCITY] = useState(null)
  const [ZIPCODE, setZIPCODE] = useState(null)
  const [COUNTRY, setCOUNTRY] = useState(null)
  const [showform, setshowform] = useState(false)
  const [cardNumbererror, setcardNumbererror] = useState(false)

  const dispatch = useDispatch();
  const stripePayment = (e) => {

    if (e)
      e?.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (CardNumber < 17) {
      setcardNumbererror(true)
    }
    else {
      setLoadingMessage("Creating Subscription...")
      setcardNumbererror(false)
      let data = {
        "subscription_type": PaymentMethod,
        "card_holder_name": Fullname,
        "card_number": CardNumber?.match(/(\d{4})/g).join(" "),
        "expiration_month": ExpMonth,
        "expiration_year": ExpYear,
        "cvc": CVCNumber,
        "city": CITY,
        "country": COUNTRY?.value,
        "billing_address": BILLINGADDRESS,
        "zip_code": ZIPCODE
      }

      axios.post('/payments/stripe-subscription/', data, config).then(response => {

        setLoadingMessage(response?.data?.message)
        seterrors(null)
      }).catch(error => {
        setLoadingMessage("")

        if (error?.response?.data?.detail) {
          seterrors(error?.response?.data?.detail)
        }
        else if (error?.response?.data?.message) {
          seterrors(error?.response?.data?.message)
        }
        else {
          seterrors("Subscription failed")
        }




        seterrors(error?.response?.data?.subscription_type && error?.response?.data?.subscription_type[0])

      })
    }


  }


  const paypalPayment = () => {

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let data = {
      "subscription_type": PaymentMethod,
    }
    axios.post('/payments/paypal-subscription/', data, config).then(response => {
      setLoadingMessage("success")
      let url = response.data.approve_link

      if (url) {
        window.open(url, '_blank')
      }
    }).catch(error => {

      seterrors(error.response.data.subscription_type[0])

    })
  }
  const changeHandler = value => {
    setCOUNTRY(value)
  }
  const handleCardNumber = (number) => {
    const value = number.replace(/\D/g, "");
    if (value.length < 17) {
      setCardNumber(value)
    }
  };

  const handleCVCNumber = (number) => {
    const value = number.replace(/\D/g, "");
    if (value.length < 4) {
      setCVCNumber(value)
    }
  };
  const handleMonth = (number) => {
    const value = number.replace(/\D/g, "");
    if (value.length < 3) {
      setExpMonth(value)
    }
  };
  const handleYear = (number) => {
    const value = number.replace(/\D/g, "");
    if (value.length < 5) {
      setExpYear(value)
    }
  };
  const handleZipCode = (number) => {
    const value = number.replace(/\D/g, "");
    setZIPCODE(value)
  };
  return (
    <div className="billing-page">
      <div className="billing-page-container">
        <div className="billing-page-heading">
          <p onClick={() => history.push("/")} style={{ color: 'blue', cursor: 'pointer' }}>Back To Dashboard</p>
          <h2>Payment</h2>
          <p>Choose Payment method below</p>
        </div>
        <div className="payment-container">
          <div className="payment-method-container">

            <div className="payment-method-card" onClick={() => setshowform(true)}>
              <Stripe />
              {/* <div>Pay with Stripe</div> */}


            </div>

            <div className="payment-method-card" onClick={paypalPayment}>
              {/* <div>Pay With PayPal</div> */}
              <Paypal />

            </div>
          </div>

        </div>
        {showform &&
          <form action="" onSubmit={stripePayment} >
            <div className="payment-info-container">
              <div className="payment-info-left">
                <div className="payment-info-head">Credit Card Info</div>
                <div className="payment-info-form">
                  <div className="payment-info-input">
                    <label className="payment-label" htmlFor="">
                      CARDHOLDER'S NAME
                    </label>
                    <input className="payment-input" type="text" value={Cardname} onChange={(e) => setcardname(e.target.value)} />
                  </div>
                  <div className="payment-info-input">
                    <label className="payment-label" htmlFor="">
                      Card Number
                    </label>
                    <input className="payment-input" type="text" value={CardNumber} onChange={(e) => handleCardNumber(e.target.value)} />
                    {cardNumbererror ? <p style={{ color: 'red' }}>{"Kindly Enter 16 Digit Card Number"}</p> : null}
                  </div>
                  <div className="payment-info-input-group">
                    <div className="payment-info-input">
                      <label className="payment-label" htmlFor="">
                        Exp Month
                      </label>
                      <input className="payment-input" type="text" value={ExpMonth} onChange={(e) => handleMonth(e.target.value)} />
                    </div>
                    <div className="payment-info-input">
                      <label className="payment-label" htmlFor="">
                        Exp Year
                      </label>
                      <input className="payment-input" type="text" value={ExpYear} onChange={(e) => handleYear(e.target.value)} />
                    </div>
                  </div>
                  <div className="payment-info-input">
                    <label className="payment-label" htmlFor="">
                      CVC Number
                    </label>
                    <input className="payment-input" type="text" value={CVCNumber} onChange={(e) => handleCVCNumber(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="payment-info-right">
                <div className="payment-info-head">Billing Info</div>
                <div className="payment-info-form">
                  <div className="payment-info-input">
                    <label className="payment-label" htmlFor="">
                      FULL NAME
                    </label>
                    <input className="payment-input" type="text" value={Fullname} onChange={(e) => setFullname(e.target.value)} />
                  </div>
                  <div className="payment-info-input">
                    <label className="payment-label" htmlFor="">
                      BILLING ADDRESS
                    </label>
                    <input className="payment-input" type="text" value={BILLINGADDRESS} onChange={(e) => setBILLINGADDRESS(e.target.value)} />
                  </div>
                  <div className="payment-info-input" style={{ marginTop: '7%' }}>
                    <label className="payment-label" htmlFor="">
                      COUNTRY
                    </label>
                    <Select options={options} value={COUNTRY} onChange={changeHandler} />
                  </div>
                  <div className="payment-info-input-group" >
                    <div className="payment-info-input">
                      <label className="payment-label" htmlFor="" >
                        CITY
                      </label>
                      <input className="payment-input" type="text" value={CITY} onChange={(e) => setCITY(e.target.value)} />
                    </div>
                    <div className="payment-info-input">
                      <label className="payment-label" htmlFor="">
                        ZIP CODE
                      </label>
                      <input className="payment-input" type="text" placeholder="4600" value={ZIPCODE} onChange={(e) => handleZipCode(e.target.value)} />
                    </div>
                  </div>

                  <div >
                    {errors ? <p style={{ color: 'red' }}>{errors}</p> : null}
                    <Button type="submit">Complete Payment</Button>

                    <div className="row">
                      <div className="col-12">

                        {loadingMessage ? <p style={{ font: "normal 500 18px 'roboto'", color: 'green' }}>{loadingMessage}</p> : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        }
      </div>
    </div>
  );
};

export default Payment;
