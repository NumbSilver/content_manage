import {SAVE_TITLE} from '../action_types'

let InitState = ''
export default function menuReducer(preState = InitState,action) {
    const {type,data} = action
    let newState 
    switch (type) {
        case SAVE_TITLE:
            newState = data;
            return newState;

        default:
            return preState;
    }
}