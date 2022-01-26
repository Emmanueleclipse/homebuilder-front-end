import { PaymentTypes } from "../types/payment.types";


const paymentReducer = (state = { sucessPayments: [], cancelledPayments: [] }, action) => {
    switch (action.type) {
        case PaymentTypes.FETCH_SUCCESSPAYMENT_START:
            return {
                ...state,
                loading: true,
            }
        case PaymentTypes.FETCH_SUCCESSPAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                sucessPayments: action.sucessPayments
            }
        case PaymentTypes.FETCH_SUCCESSPAYMENT_FAIL:

            return {
                ...state,
                loading: false,
                error: action.error
            }

        case PaymentTypes.FETCH_CANCELPAYMENT_START:
            return {
                ...state,
                loading: true,
            }
        case PaymentTypes.FETCH_CANCELPAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                cancelledPayments: action.cancelledPayments
            }
        case PaymentTypes.FETCH_CANCELPAYMENT_FAIL:

            return {
                ...state,
                loading: false,
                error: action.error
            }

        default:
            return state
    }
}

export default paymentReducer