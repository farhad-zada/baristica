

export const addressReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':

            const primary =
                action.payload.find(a => a.isPrimary) || action.payload[0]
            return action.payload.map(addr => ({
                ...addr,
                selected: addr._id === primary?._id
            }))

        case 'ADD':
            return [...state, action.payload]

        case 'UPDATE':
            return state.map(addr =>
                addr._id === action.payload._id
                    ? { ...addr, ...action.payload }
                    : addr
            )

        case 'DELETE':
            return state.filter(addr => addr._id !== action.payload)

        case 'SET_PRIMARY':
            return state.map(addr => ({
                ...addr,
                isPrimary: addr._id === action.payload
            }))

        case 'SET_SELECTED':
            return state.map(addr => ({
                ...addr,
                selected: addr._id == action.payload
            }))

        default:
            return state
    }
}
