import anecdoteReducer from '../reducers/anecdoteReducer'
import deepFreeze from 'deep-freeze'

const testState = [
  {
    id: 1,
    content: 'anecdote1',
    votes: 1
  },
  {
    id: 2,
    content: 'anecdote1',
    votes: 2
  },
  {
    id: 3,
    content: 'anecdote1',
    votes: 3
  }
]

describe('anecdoteReducer', () => {
  test('action type increment', () => {
    const state = testState
    const action = {
      type: 'INCREMENT',
      data: {
        id: 2
      }
    }
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toHaveLength(3)
    expect(newState).toContainEqual({
      id: 2,
      content: 'anecdote1',
      votes: 3
    })
  })
  test('action type NEW_NOTE', () => {
    const state = testState
    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'Ooga Booga'
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toHaveLength(4)
  })
})