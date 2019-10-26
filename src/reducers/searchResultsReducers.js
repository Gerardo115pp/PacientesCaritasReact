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
                ...state,
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
        default:
            return state;
            
    }
}