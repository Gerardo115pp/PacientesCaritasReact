const initialState = {
    results: [],
    selected_result: null
}

export default function(state=initialState,action)
{
    switch(action.type)
    {
        case "SET_RESULTS":
            return{
                selected_result: null,
                results: action.results
            }
        case "SET_SELECTED_RESULT":
            return{
                ...state,
                selected_result: action.selected
            }
        case "UPDATE_SELECTED_RESULT":
            state.results[state.selected_result] = action.new_data;
            return state;
        case "RESET":
            return{
                results: [],
                selected_result: null
            }
        default:
            return state;
            
    }
}