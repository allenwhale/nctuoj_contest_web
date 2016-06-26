import {
    handleActions
} from 'redux-actions';
import swal from 'sweetalert';

const initialState = {
    problemList: [],
    problem: {},
    submitFormShow: false,
    newProblemFormShow: false,
};


export default handleActions({

    GET_PROBLEM_LIST: {
        next(state, action) {
            return {
                ...state,
                problemList: action.payload.msg,
            };
        },
        throw(state, action) {
            swal('Problem List Error', action.payload.msg, "error");
            return {
                ...state,
                problemList: [],
            };
        }
    },

    POST_PROBLEM: {
        next(state, action) {
            swal("New Problem", "Add Problem Successfully", "success");
            return {
                ...state,
                problemList: state.problemList.concat([action.payload.msg]),
                newProblemFormShow: false,
            };
        },
        throw(state, action) {
            swal("New Problem Error", action.payload.msg, "error");
            return {
                ...state,
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
            swal('Update Problem', 'Problem Updated Successfully', "success");
            return {
                ...state,
                problem: action.payload.msg,
                problemList: replcaeProblem(state.problemList, action.payload.msg),
                newProblemFormShow: false,
            };
        },
        throw(state, action) {
            swal('Update Problem Error', action.payload.msg, "error");
            return {
                ...state,
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
            swal('Get Problem Error', action.payload.msg, "error");
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
