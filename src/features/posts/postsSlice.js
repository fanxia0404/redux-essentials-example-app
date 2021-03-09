import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '1',
        date: '2019-03-09T17:20:05.135Z',
        title: 'First Post!',
        content: 'Hello!',
        user: '0',
    },
    {
        id: '2',
        date: '2020-12-09T17:20:05.135Z',
        title: 'Second Post',
        content: 'More text',
        user: '1',
    },
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
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

export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;
