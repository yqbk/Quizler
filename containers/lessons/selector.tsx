import { createSelector } from 'reselect'
import Immutable from 'seamless-immutable'

export const lessonsSelector = state => state.lessons.lessons || []

export const lessonSelector = id =>
  createSelector(
    lessonsSelector,
    lessons => {
      const test = lessons.filter(lesson => lesson.id === id)

      return test
    },
  )

export const progressSelector = () =>
  createSelector(
    lessonsSelector,
    data => {
      const t = Immutable.asMutable(data)
      console.log('in selector')
      console.log('data', data)

      const result = t.reduce((result, lesson, index) => {
        return lesson.successRatio
          ? [
              ...result,
              {
                title: lesson.title,
                labels: lesson.successRatio.map((item, index) => index + 1),
                datasets: [
                  {
                    data: lesson.successRatio.map((item, index) => item * 100),
                  },
                ],
              },
            ]
          : result
      }, [])

      // debugger

      return result
    },
  )
