const initialTopicsState = {
    topics: []
};

export const TopicReducer = (state = initialTopicsState, action) => {
    switch (action.type) {
        case "FETCH_TOPICS":
            return { ...state, topics: action.payload };

        case "CREATE_TOPIC":
            return { ...state, topics: [...state.topics, action.payload] };

        case "EDIT_TOPIC":
            return {
                ...state,
                topics: state.topics.map(topic =>
                    topic.id === action.payload.id ? action.payload : topic
                )
            };

        case "DELETE_TOPIC":
            return { ...state, topics: state.topics.filter(topic => topic.id !== action.payload) };

        default:
            return state;
    }
};

