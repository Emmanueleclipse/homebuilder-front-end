import axios from "../../axios";

import { PaymentTypes } from "../types/payment.types";

export const fetchSucessPayments =
  ({ token }) => {
    return dispatch => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      dispatch({ type: PaymentTypes.FETCH_SUCCESSPAYMENT_START });
      axios.get("payments/success/", config).then(response => {
        console.log(response.data)
        dispatch({
          type: PaymentTypes.FETCH_SUCCESSPAYMENT_SUCCESS,
          sucessPayments: response.data,
        });

      }).catch(error => {
        dispatch({ type: PaymentTypes.FETCH_SUCCESSPAYMENT_FAIL, error: error.response });
      })
    }
  }


export const fetchCancelledPayments =
  ({ token }) => {
    return dispatch => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      dispatch({ type: PaymentTypes.FETCH_CANCELPAYMENT_START });
      axios.get("payments/cancel/", config).then(response => {
        console.log(response.data)
        dispatch({
          type: PaymentTypes.FETCH_SUCCESSPAYMENT_SUCCESS,
          cancelledPayments: response.data,
        });

      }).catch(error => {
        dispatch({ type: PaymentTypes.FETCH_SUCCESSPAYMENT_FAIL, error: error.response });
      })
    }
  }






