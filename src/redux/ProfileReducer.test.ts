import {postType, profileType} from "../types/types_for_app";
import {actions} from "./ProfileReducer";
import profileReducer from "./ProfileReducer";



let initialState = {
    posts: [
        {id: 1, message: 'How r u?', likesCount: 15},
        {id: 2, message: 'Its my 1 post', likesCount: 122},
    ] as Array<postType>,
    newPostText: 'It-s my new post',
    profile: null as profileType | null,
    status: '',
    profileSaved: false
}

test('number of posts should have increased ', () => {
    // 1. test data
    let action = actions.addPost('it-kamasutra')
    // 2. action
    let newState = profileReducer(initialState, action)
    // 3. expectation
    expect(newState.posts.length).toBe(3)
})

test('new post should be correct', () => {
    // 1. test data
    let action = actions.addPost('it-kamasutra')
    // 2. action
    let newState = profileReducer(initialState, action)
    // 3. expectation
    expect(newState.posts[2].message).toBe('it-kamasutra')
})
test('after deleting length should be decremented', () => {
    // 1. test data
    let action = actions.deletePost(1);
    // 2. action
    let newState = profileReducer(initialState, action);
    // 3. expectation
    expect(newState.posts.length).toBe(1);
});

test('after deleting length should not be decremented if id is incorrect', () => {
    // 1. test data
    let action = actions.deletePost(1000)
    // 2. action
    let newState = profileReducer(initialState, action)
    // 3. expectation
    expect(newState.posts.length).toBe(2)
})
