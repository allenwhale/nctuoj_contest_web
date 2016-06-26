import {
    handleActions
} from 'redux-actions';

const initialState = {
    problemList: [],
    problem: {},
    submitFormShow: false,
    newProblemFormShow: false,
    errMsg: '',
    successMsg: '',
};


export default handleActions({

    GET_PROBLEM_LIST: {
        next(state, action) {
            return {
                ...state,
                problemList: action.payload.msg,
                errMsg: '',
                successMsg: '',
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
                successMsg: 'Success',
            };
        },
        throw(state, action) {
            console.log('e', action.payload);
            return {
                ...state,
                errMsg: action.payload.msg,
                successMsg: '',
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
                successMsg: 'Update Successfully',
            };
        },
        throw(state, action) {
            console.log('e', action.payload);
            return {
                ...state,
                errMsg: action.payload.msg,
                successMsg: '',
            }
        }
    },

    GET_PROBLEM: {
        next(state, action) {
            return {
                ...state,            
                problem: action.payload.msg,
                successMsg: '',
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
