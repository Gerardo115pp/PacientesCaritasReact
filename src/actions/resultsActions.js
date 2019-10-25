export const setResults = results_array => {
    return {
        type: 'SET_RESULTS',
        results: results_array
    }
}

export const setSelected = selected => {
    return{
        type: "SET_SELECTED_RESULT",
        selected
    }
}