import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

// Solution to avoid multiple calls to fetchUser
export const fetchPostAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    const posts = getState().posts;
    const userIds = _.uniq(_.map(posts, 'userId'));
};

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (userId) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${userId}`);
    dispatch({ type: 'FETCH_USER', payload: response.data });
};

// Memoized approach.
// export const fetchUser = (userId) => dispatch => _fetchUser(userId, dispatch);
// const _fetchUser = _.memoize(async (userId, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${userId}`);
//     dispatch({ type: 'FETCH_USER', payload: response.data });
// });
