import {
    handleActions
} from 'redux-actions';
import swal from 'sweetalert';
import Config from './Config';

const emptyExecute = {
    description: '',
    file_name: '',
    commands: {},
}

const initialState = {
    executeList: {},
    executeListStatus: false,
    execute: emptyExecute,
    newExecuteShow: false,
};


export default handleActions({

    ADD_COMMAND: (state, actions) => {
        var commands = state.execute.commands;
        var id = Math.max.apply(null, Object.keys(commands)) + 1;
        commands[id] = {id};
        const execute = {
            ...state.execute,
            commands,
        }
        return {
            ...state,
            execute: execute,
        };
    },

    GET_EXECUTE: {
        next(state, action) {
            var cnt = 1;
            action.payload.msg.commands = action.payload.msg.commands.map((item) => ({
                ...item,
                id: cnt++,
            }));
            action.payload.msg.commands = Config.mapArrayToObject(action.payload.msg.commands);
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
        var commands = state.execute.commands;
        delete commands[action.payload];
        const execute = {
            ...state.execute,
            commands,
        };
        return {
            ...state,
            execute: execute,
        };
    },

    PUT_EXECUTE: {
        next(state, action) {
            var executeList = state.executeList;
            executeList[action.payload.msg.id] = action.payload.msg;
            swal("Update Execute", "Update Execute Successfully", "success");
            return {
                ...state,
                executeList,
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
            var executeList = state.executeList;
            executeList[action.payload.msg.id] = action.payload.msg;
            return {
                ...state,
                executeList,
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
        var commands = state.execute.commands;
        commands[action.payload.id] = action.payload;
        return {
            ...state,
            execute: {
                ...state.execute,
                commands,
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
                executeList: Config.mapArrayToObject(action.payload.msg),
                executeListStatus: true,
            };
        },
        throw(state, action) {
            swal('Get Execute List Error', action.payload.msg, "error");
            return {
                ...state,
                executeList: {},
                executeListStatus: false,
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

}, initialState);
