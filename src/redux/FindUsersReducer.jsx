let initialState = {
    users: [
        {
            id: 1, fallowed: false, fullName: 'Dima', status: 'good', location:
                {city: 'Vladivostok', country: 'Russia'}
        },
        {
            id: 2, fallowed: true, fullName: 'Alis', status: 'hate', location:
                {city: 'Vladivostok', country: 'Russia'}
        },
        {
            id: 3, fallowed: false, fullName: 'Nika', status: 'Js is top', location:
                {city: 'Vladivostok', country: 'Russia'}
        },
        {
            id: 4, fallowed: true, fullName: 'Bill', status: 'Gravity falls', location:
                {city: 'Vladivostok', country: 'Russia'}
        },
    ]
}

const FindUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}
export default FindUsersReducer