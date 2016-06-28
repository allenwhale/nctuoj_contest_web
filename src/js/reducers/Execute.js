import {
    handleActions
} from 'redux-actions';
import swal from 'sweetalert';

const emptyExecute = {
    description: '',
    file_name: '',
    commands: [],
}

const initialState = {
    executeList: [],
    execute: emptyExecute,
    newExecuteShow: false,
};


export default handleActions({

    ADD_COMMAND: (state, actions) => {
        const execute = {
            ...state.execute,
            commands: state.execute.commands.concat({
                id: Math.floor(Math.random() * 100000),
            })
        }
        return {
            ...state,
            execute: execute,
        };
    },

    GET_EXECUTE: {
        next(state, action) {
            action.payload.msg.commands = action.payload.msg.commands.map((item) => ({
                ...item,
                id: Math.floor(Math.random() * 100000),
            }));
            return {
                ...state,
                execute: action.payload.msg,
            };
        },
        throw(state, action) {
            swal("Get Execute Error", action.payload.msg, "error");
            return {
                ...state,
                execute: emptyExecute,
            };
        }
    },

    DELETE_COMMAND: (state, action) => {
        const removeCommand = (commands, id) => {
            var res = [];
            for(var i in commands) {
                if(commands[i].id != id) {
                    res.push({
                        ...commands[i],
                        //id: Math.random() * 10000,
                    });
                }
            }
            return res;
        };
        const execute = {
            ...state.execute,
            commands: removeCommand(state.execute.commands, action.payload),
        };
        return {
            ...state,
            execute: execute,
        };
    },

    PUT_EXECUTE: {
        next(state, action) {
            const replaceExecute = (executeList, execute) => {
                var res = [];
                for(var i in executeList) {
                    if(executeList[i].id == execute.id) {
                        res.push(execute);
                    } else {
                        res.push(executeList[i]);
                    }
                }
                return res;
            };
            swal("Update Execute", "Update Execute Successfully", "success");
            return {
                ...state,
                executeList: replaceExecute(state.executeList, action.payload.msg),
            };
        },
        throw(state, action) {
            swal("Update Execute Error", action.payload.msg, "error");
            return {
                ...state,
            };
        }
    },

    POST_EXECUTE: {
        next(state, action) {
            swal("New Execute", "Add Execute Successfully", "success");
            return {
                ...state,
                executeList: state.executeList.concat([action.payload.msg]),
                newExecuteShow: false,
            };
        },
        throw(state, action) {
            swal("New Execute Error", action.payload.msg, "error");
            return {
                ...state,
            };
        }
    },

    UPDATE_COMMAND: (state, action) => {
        const replaceCommand = (commands, command) => {
            var res = [];
            for(var i in commands) {
                if(commands[i].id == command.id) {
                    res.push(command);
                } else {
                    res.push(commands[i]);
                }
            }
            return res;
        };
        return {
            ...state,
            execute: {
                ...state.execute,
                commands: replaceCommand(state.execute.commands, action.payload),
            }
        };
    },

    OPEN_NEW_EXECUTE: (state, action) => {
        return {
            ...state,
            execute: emptyExecute,
            newExecuteShow: true,
        };
    },

    CLOSE_NEW_EXECUTE: (state, action) => {
        return {
            ...state,
            execute: emptyExecute,
            newExecuteShow: false,
        };
    },

    GET_EXECUTE_LIST: {
        next(state, action) {
            return {
                ...state,
                executeList: action.payload.msg,
            };
        },
        throw(state, action) {
            swal('Get Execute List Error', action.payload.msg, "error");
            return {
                ...state,
                executeList: [],
            };
        }
    },

    DELETE_EXECUTE: {
        next(state, action) {
            const removeExecute = (executeList, execute) => {
                var res = [];
                for(var i in executeList) {
                    if(executeList[i].id != execute.id) {
                        res.push(executeList[i]);
                    }
                }
                return res;
            };
            swal('Delete Execute', 'Execute Deleted Successfully', 'success');
            return {
                ...state,
                executeList: removeExecute(state.executeList, action.payload.msg),
                executeConfirmShow: false,
            };
        },
        throw(state, action) {
            swal('Delete Execute Error', action.payload.msg, 'error');
            return {
                ...state,
                executeConfirmShow: false,
            };
        }
    },

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
