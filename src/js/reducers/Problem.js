import {
    handleActions
} from 'redux-actions';
import swal from 'sweetalert';

const emptyProblem = {
    id: 0,
    title: '',
    executes: [],
};

const initialState = {
    problemList: [],
    problem: emptyProblem,
    submitFormShow: false,
    newProblemFormShow: false,
};


export default handleActions({

    ADD_PROBLEM_EXECUTE: (state, action) => {
        return {
            ...state,
            problem: {
                ...state.problem,
                executes: state.problem.executes.concat([action.payload]),
            },
        };
    },

    DELETE_PROBLEM_EXECUTE: (state, action) => {
        const removeProblemExecute = (executes, execute) => {
            var res = [];
            for(var i in executes) {
                if(executes[i].id != execute.id) {
                    res.push(executes[i]);
                }
            }
            return res;
        };
        return {
            ...state,
            problem: {
                ...state.problem,
                executes: removeProblemExecute(state.problem.executes, action.payload),
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
                    executes: action.payload.msg,
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
                problem: emptyProblem,
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
                problem: emptyProblem,
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
        };
    },

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
