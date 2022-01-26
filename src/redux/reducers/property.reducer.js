import { propertyTypes } from "../types/property.type";


const propertyReducer = (state = { properties: [], showPopup: false }, action) => {
    switch (action.type) {
        case propertyTypes.FETCH_PROPERTY_START:
            return {
                ...state,
                loading: true,
            }
        case propertyTypes.FETCH_PROPERTY_SUCCESS:
            return {
                ...state,
                loading: false,
                properties: action.properties,
                error: null
            }
        case propertyTypes.FETCH_PROPERTY_FAIL:

            return {
                ...state,
                loading: false,
                // error: action.error
            }

        case propertyTypes.CREATE_PROPERTY_START:
            return {
                ...state,
                creatingProperty: true,
                loading: true,
            }
        case propertyTypes.CREATE_PROPERTY_SUCCESS:
            return {
                ...state,
                propertyCreated: true,
                creatingProperty: false,
                loading: false,
                propertyID: action.id,
                success: true,
            }
        case propertyTypes.CREATE_PROPERTY_FAILURE:
            return {
                ...state,
                loading: false,
                propertyCreated: false,
                creatingProperty: false,
                error: action.error,
                success: false,
            }

        case propertyTypes.UPDATE_PROPERTY_START:
            return {
                ...state,
                updatingProperty: true,
                loading: true,
            }
        case propertyTypes.UPDATE_PROPERTY_SUCCESS:
            return {
                ...state,
                propertyUpdated: true,
                loading: false,
                propertyID: action.id,
                success: true,
            }
        case propertyTypes.UPDATE_PROPERTY_FAILURE:
            return {
                ...state,
                loading: false,
                propertyUpdated: false,
                error: action.error,
                success: false,
            }

        case propertyTypes.DELETE_PROPERTY_START:
            return {
                ...state,
                deletingProperty: true,
                loading: true,
            }
        case propertyTypes.DELETE_PROPERTY_SUCCESS:
            return {
                ...state,
                propertyDELETEd: true,
                loading: false,
                propertyID: action.id,
                success: true,
            }
        case propertyTypes.DELETE_PROPERTY_FAILURE:
            return {
                ...state,
                loading: false,
                propertyDELETEd: false,
                error: action.error,
                success: false,
            }
        case propertyTypes.RESET_PROPERTY:
            return {
                ...state,
                loading: false,
                creatingProperty: false,
                propertyCreated: false,
                error: null,
                success: false,
            }

        case propertyTypes.TOGGLE_POPUP:
            return {
                ...state,
                showPopup: !state.showPopup,
                payloadToUpdate: action.payloadToUpdate,
            };

        default:
            return state
    }
}

export default propertyReducer