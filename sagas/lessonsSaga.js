import { call, put } from 'redux-saga/effects';
import LessonsActions from '../state/lessonsReducer';
import API, { graphqlOperation } from '@aws-amplify/api';
import { listLessons } from '../src/graphql/queries';
import { createLesson } from '../src/graphql/mutations';

export function* getLessonsFlow() {
  try {
    const operation = graphqlOperation(listLessons);
    const test = () => API.graphql(operation);

    const graphqlData = yield call(test);

    const response = graphqlData.data;

    if (response) {
      yield put(LessonsActions.getLessonsSuccess(response.listLessons.items));
    } else {
      yield put(LessonsActions.getLessonsFailure('Connection problems :('));
    }
  } catch (error) {
    yield put(LessonsActions.getLessonsFailure(error.message));
  }
}

export function* addLessonFlow({ title }) {
  try {
    console.log('title', title);

    // addLesson = async () => {
    //   const lessonTitle = this.state.title;

    //   console.log('1. lessonTitle', lessonTitle);

    //   if (lessonTitle === '') return;

    //   const lessons = [...this.state.lessons, { title: lessonTitle }];

    //   console.log('2. state', this.state);

    //   this.setState({ lessons, title: '' });
    //   try {
    // await API.graphql(graphqlOperation(createLesson, { input: { title: lessonTitle } }));

    const operation = graphqlOperation(createLesson, { input: { title: title } });
    const addLessonApi = () => API.graphql(operation);

    const graphqlData = yield call(addLessonApi);

    const response = graphqlData.data;

    console.log('response', response);

    //     console.log('lesson successfully created.');
    //     Analytics.record({
    //       name: 'Lesson created',
    //       attributes: {
    //         lessonTitle: lessonTitle,
    //       },
    //     });
    //   } catch (err) {
    //     console.log('error creating lesson...', err);
    //   }
    // };

    // const operation = graphqlOperation(listLessons);
    // const test = () => API.graphql(operation);

    // const graphqlData = yield call(test);

    // const response = graphqlData.data;

    if (response) {
      yield put(LessonsActions.addLessonSuccess(response));
    } else {
      yield put(LessonsActions.addLessonFailure(`Add lesson failure: ${title}`));
    }
  } catch (error) {
    yield put(LessonsActions.addLessonFailure(error.message));
  }
}

export function* removeLessonFlow(data) {
  try {
    console.log('data', data);

    // addLesson = async () => {
    //   const lessonTitle = this.state.title;

    //   console.log('1. lessonTitle', lessonTitle);

    //   if (lessonTitle === '') return;

    //   const lessons = [...this.state.lessons, { title: lessonTitle }];

    //   console.log('2. state', this.state);

    //   this.setState({ lessons, title: '' });
    //   try {
    //     await API.graphql(graphqlOperation(createLesson, { input: { title: lessonTitle } }));

    //     console.log('lesson successfully created.');
    //     Analytics.record({
    //       name: 'Lesson created',
    //       attributes: {
    //         lessonTitle: lessonTitle,
    //       },
    //     });
    //   } catch (err) {
    //     console.log('error creating lesson...', err);
    //   }
    // };

    // const operation = graphqlOperation(listLessons);
    // const test = () => API.graphql(operation);

    // const graphqlData = yield call(test);

    // const response = graphqlData.data;

    // if (response) {
    yield put(LessonsActions.addLessonSuccess(data));
    // } else {
    //   yield put(LessonsActions.getLessonsFailure('Connection problems :('));
    // }
  } catch (error) {
    yield put(LessonsActions.addLessonFailure(error.message));
  }
}
