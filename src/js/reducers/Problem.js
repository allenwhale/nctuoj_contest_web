import {
    handleActions
} from 'redux-actions';
import Config from './Config';
import swal from 'sweetalert';

const emptyProblem = {
    id: 0,
    title: '',
    executes: {},
    verdict: {},
};

const initialState = {
    problemList: {},
    problemListStatus: false,
    problem: emptyProblem,
    newProblemFormShow: false,
};


export default handleActions({

    ADD_PROBLEM_EXECUTE: (state, action) => {
        var executes = state.problem.executes;
        executes[action.payload.id] = action.payload;
        return {
            ...state,
            problem: {
                ...state.problem,
                executes,
            },
        };
    },

    DELETE_PROBLEM_EXECUTE: (state, action) => {
        var executes = state.problem.executes;
        delete executes[action.payload.id];
        return {
            ...state,
            problem: {
                ...state.problem,
                executes,
            },
        };
    },

    PUT_PROBLEM_EXECUTE: {
        next(state, action) {
            swal('Update Problem Execute', 'Update Problem Execute Successfully', "success");
            return {
                ...state,
                problem: {
                    ...state.problem,
                    executes: Config.mapArrayToObject(action.payload.msg),
                }
            };
        },
        throw(state, action) {
            swal("Update Problem Execute Error", action.payload.msg, "error");
            return {
                ...state,
            };
        }
    },

    PUT_PROBLEM_VERDICT: {
        next(state, action) {
            swal('Update Problem Verdict', 'Update Problem Verdict Successfully', 'success');
            return {
                ...state,
                problem: {
                    ...state.problem,
                    verdict: action.payload.msg,
                }
            };
        },
        throw(state, action) {
            swal('Update Problem Verdict Error', action.payload.msg, 'error');
            return {
                ...state,
            };
        },
    },

    GET_PROBLEM_LIST: {
        next(state, action) {
            return {
                ...state,
                problemList: Config.mapArrayToObject(action.payload.msg),
                problemListStatus: true,
            };
        },
        throw(state, action) {
            swal('Problem List Error', action.payload.msg, "error");
            return {
                ...state,
                problemList: {},
                problemListStatus: false,
            };
        }
    },

    POST_PROBLEM: {
        next(state, action) {
            swal("New Problem", "Add Problem Successfully", "success");
            var problemList = state.problemList;
            problemList[action.payload.msg.id] = action.payload.msg;
            return {
                ...state,
                problemList,
                newProblemFormShow: false,
            };
        },
        throw(state, action) {
            swal("New Problem Error", action.payload.msg, "error");
            return {
                ...state,
                problem: emptyProblem,
            }
        }
    },

    PUT_PROBLEM: {
        next(state, action) {
            var problemList = state.problemList;
            problemList[action.payload.msg.id] = action.payload.msg;
            swal('Update Problem', 'Problem Updated Successfully', "success");
            return {
                ...state,
                problem: action.payload.msg,
                problemList,
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
                problem: emptyProblem,
            };
        }
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
        };
    },

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
