import {
    handleActions
} from 'redux-actions';
import Config from './Config';
import swal from 'sweetalert';

const initialState = {
};


export default handleActions({
    REJUDGE_PROBLEM: {
        next(state, action){
            return {
                ...state,
            };
        }, 
        throw(state, action){
            swal('Rejudge Error', action.payload.msg, 'error');
            return {
                ...state,
            }
        }
    },
    REJUDGE_SUBMISSION: {
        next(state, action){
            return {
                ...state,
            };
        }, 
        throw(state, action){
            swal('Rejudge Error', action.payload.msg, 'error');
            return {
                ...state,
            }
        }
    }

}, initialState);
