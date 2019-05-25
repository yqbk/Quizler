import { createSelector } from 'reselect'

export const lessonsSelector = state => state.lessons.lessons || []

export const lessonSelector = id => console.log('TEST', id) || 
  createSelector(
    lessonsSelector,
    lessons => {
      console.log('1')
      const test = lessons.filter(lesson => lesson.id === id)
      console.log('2')

      return test
    },
  )
