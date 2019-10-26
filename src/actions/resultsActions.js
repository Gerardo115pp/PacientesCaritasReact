export const setResults = results_array => {
    return {
        type: 'SET_RESULTS',
        results: results_array
    }
}

export const updateSelectedResult = new_result => {
    return {
        type: 'UPDATE_SELECTED_RESULT',
        new_data: new_result
    }
}

export const setSelected = selected => {
    return{
        type: "SET_SELECTED_RESULT",
        selected
    }
}