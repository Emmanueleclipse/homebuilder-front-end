import { messageTypes } from "../types/message.types"

const messageReducer = (state={messages:[]},action) => {
    switch (action.type) {
        case messageTypes.FETCH_MESSAGE_START:
            return { 
                ...state,
                loading:true,
            }
        case messageTypes.FETCH_MESSAGE_SUCCESS:
            return { 
                ...state,
                loading:false,
                messages:action.messages
            }
        case messageTypes.FETCH_MESSAGE_FAIL:
            return { 
                ...state,
                loading:false,
                error:action.error
            }
    
        case messageTypes.CREATE_MESSAGE_START:
            return { 
                ...state,
                loading:true,
            }
        case messageTypes.CREATE_MESSAGE_SUCCESS:
            return { 
                ...state,
                loading:false,
                success:true,
            }
        case messageTypes.CREATE_MESSAGE_FAILURE:
            return { 
                ...state,
                loading:false,
                error:action.error,
                success:false,
            }
        case messageTypes.RESET_CREW:
            return { 
                ...state,
                loading:false,
                error:null,
                success:false,
            }
    
        default:
            return state
    }
}

export default messageReducer