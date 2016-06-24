import {
    handleActions
} from 'redux-actions';

const initialState = {
    problemList: [],
    currentProblem: {},
    submitFormShow: false,
};


export default handleActions({

    GET_PROBLEM_LIST: {
        next(state, action) {
            console.log('test', action);
            return {
                ...state,
                problemList: action.payload['msg'],
            };
        },
        throw(state, action) {
            return {
                ...state,
                problemList: [],
            };
        }
    },

    GET_CURRENT_PROBLEM: (state, action) => {
        const getCurrentProblem = () => {
            for(var i in state.problemList){
                if(state.problemList[i].id == action.payload){
                    return state.problemList[i];
                }
            }
            return {};
        };
        return {
            ...state,            
            currentProblem: getCurrentProblem(),
        }
    },

    OPEN_SUBMIT_FORM: (state, action) => {
        return {
            ...state,
            submitFormShow: true,
        };
    },

    CLOSE_SUBMIT_FORM: (state, action) => {
        return {
            ...state,
            submitFormShow: false,
        };
    },

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
