import { configureStore } from '@reduxjs/toolkit';

import postsReducer from '../feaures/posts/postsSlice';

export default configureStore({
    reducer: {
        posts: postsReducer,
    },
});
