import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '1',
        date: '2019-03-09T17:20:05.135Z',
        title: 'First Post!',
        content: 'Hello!',
        user: '0',
        reactions: {
            thumbsUp: 2,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
        },
    },
    {
        id: '2',
        date: '2020-12-09T17:20:05.135Z',
        title: 'Second Post',
        content: 'More text',
        user: '1',
        reactions: {
            thumbsUp: 1,
            hooray: 1,
            heart: 1,
            rocket: 1,
            eyes: 0,
        },
    },
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.find((post) => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
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
                const existingPost = state.find((post) => post.id === id);
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
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
