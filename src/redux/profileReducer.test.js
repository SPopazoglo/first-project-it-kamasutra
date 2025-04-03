import profileReducer, {
  addPostActionCreator,
  deletePost,
} from './profileReducer'

let state = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 5 },
    { id: 2, message: "Hello! It's my first post", likesCount: 10 },
    { id: 3, message: 'blalba', likesCount: 3 },
    { id: 4, message: 'yess!!!', likesCount: 105 },
  ],
}

it('length of posts should be increment', () => {
  // 1. test data
  let action = addPostActionCreator('text hello')

  // 2. action
  let newState = profileReducer(state, action)

  // 3. expectation
  expect(newState.posts.length).toBe(5)
})

it('message of new post should be correct', () => {
  // 1. test data
  let action = addPostActionCreator('text hello')

  // 2. action
  let newState = profileReducer(state, action)

  // 3. expectation

  expect(newState.posts[4].message).toBe('text hello')
})

it('after deleting length of messages should be decrement', () => {
  // 1. test data
  let action = deletePost(1)

  // 2. action
  let newState = profileReducer(state, action)

  // 3. expectation

  expect(newState.posts.length).toBe(3)
})

it("after deleting length of messages should'nt be changed if id is incorrect", () => {
  // 1. test data
  let action = deletePost(1000)

  // 2. action
  let newState = profileReducer(state, action)

  // 3. expectation

  expect(newState.posts.length).toBe(4)
})
