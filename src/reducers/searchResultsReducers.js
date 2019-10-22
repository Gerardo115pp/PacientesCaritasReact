const initialState = {
    results: []
}

export default function(state=initialState,action)
{
    switch(action.type)
    {
        case "SET_RESULTS":
            return{
                results: action.results
            }
        default:
            return state;
            
    }
}