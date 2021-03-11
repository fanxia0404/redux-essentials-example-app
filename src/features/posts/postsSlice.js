import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts');
    return response.posts;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user: userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0,
                        },
                    },
                };
            },
        },
        postUpdated: {
            reducer(state, action) {
                const { id, title, content, user, date } = action.payload;
                const existingPost = state.posts.find((post) => post.id === id);
                if (existingPost) {
                    existingPost.title = title;
                    existingPost.content = content;
                    existingPost.user = user;
                    existingPost.date = date;
                }
            },
            prepare({ id, title, content, user }) {
                return {
                    payload: {
                        id,
                        date: new Date().toISOString(),
                        title,
                        content,
                        user,
                    },
                };
            },
        },
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.posts = state.posts.concat(action.payload);
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostById = (state, postId) =>
    state.posts.posts.find((post) => post.id === postId);

export default postsSlice.reducer;
