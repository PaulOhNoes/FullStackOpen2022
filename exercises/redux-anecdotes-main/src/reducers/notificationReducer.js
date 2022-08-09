import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: 'Welcome!',
  reducers: {
    replaceNotification(state, action){
      const content = action.payload
      return(
        state = content
      )
    }
  }
})

export const {replaceNotification} = notificationSlice.actions

export const setNotifcation = (content, seconds) => {
  return dispatch => {
    dispatch(replaceNotification(content))
    setTimeout(() => {
      dispatch(replaceNotification(''))
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer