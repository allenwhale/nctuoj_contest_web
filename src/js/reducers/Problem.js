import {
    handleActions
} from 'redux-actions';

const initialState = {
    problemList: [],
    problem: {},
    submitFormShow: false,
    newProblemFormShow: false,
    errMsgShow: false,
};


export default handleActions({

    CLOSE_PROBLEM_ERR_MSG: (state, action) => {
        return {
            ...state,
            errMsg: '',
        };
    },

    GET_PROBLEM_LIST: {
        next(state, action) {
            return {
                ...state,
                problemList: action.payload.msg,
                errMsg: '',
            };
        },
        throw(state, action) {
            return {
                ...state,
                problemList: [],
                errMsg: action.payload.msg,
            };
        }
    },

    POST_PROBLEM: {
        next(state, action) {
            console.log('a', action);
            return {
                ...state,
                problemList: state.problemList.concat([action.payload.msg]),
                newProblemFormShow: false,
                errMsg: '',
            };
        },
        throw(state, action) {
            console.log('e', action.payload);
            return {
                ...state,
                errMsg: action.payload.msg,
            }
        }
    },

    PUT_PROBLEM: {
        next(state, action) {
            console.log('a', action);
            const replcaeProblem = (problemList, problem) => {
                var res = [];
                for(var i in problemList){
                    if(problemList[i].id == problem.id){
                        res.push(problem);
                    } else {
                        res.push(problemList[i]);
                    }
                }
                return res;
            }
            return {
                ...state,
                problem: action.payload.msg,
                problemList: replcaeProblem(state.problemList, action.payload.msg),
                newProblemFormShow: false,
                errMsg: '',
            };
        },
        throw(state, action) {
            console.log('e', action.payload);
            return {
                ...state,
                errMsg: action.payload.msg,
            }
        }
    },

    GET_PROBLEM: {
        next(state, action) {
            return {
                ...state,            
                problem: action.payload.msg,
            }
        },
        throw(state, action) {
            return {
                ...state,
                problem: {},
            };
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

    OPEN_NEW_PROBLEM_FORM: (state, action) => {
        return {
            ...state,
            newProblemFormShow: true,
        };
    },

    CLOSE_NEW_PROBLEM_FORM: (state, action) => {
        return {
            ...state,
            newProblemFormShow: false,
            errMsg: '',
        };
    },

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
