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
        default:
            return state;
            
    }
}