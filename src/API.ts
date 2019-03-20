/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name: string,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateLessonInput = {
  id?: string | null,
  title: string,
  lessonUserId?: string | null,
};

export type UpdateLessonInput = {
  id: string,
  title?: string | null,
  lessonUserId?: string | null,
};

export type DeleteLessonInput = {
  id?: string | null,
};

export type CreateQuestionInput = {
  id?: string | null,
  ask?: string | null,
  answer?: string | null,
  questionLessonId?: string | null,
};

export type UpdateQuestionInput = {
  id: string,
  ask?: string | null,
  answer?: string | null,
  questionLessonId?: string | null,
};

export type DeleteQuestionInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelLessonFilterInput = {
  id?: ModelIDFilterInput | null,
  title?: ModelStringFilterInput | null,
  and?: Array< ModelLessonFilterInput | null > | null,
  or?: Array< ModelLessonFilterInput | null > | null,
  not?: ModelLessonFilterInput | null,
};

export type ModelQuestionFilterInput = {
  id?: ModelIDFilterInput | null,
  ask?: ModelStringFilterInput | null,
  answer?: ModelStringFilterInput | null,
  and?: Array< ModelQuestionFilterInput | null > | null,
  or?: Array< ModelQuestionFilterInput | null > | null,
  not?: ModelQuestionFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    name: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    name: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    name: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateLessonMutationVariables = {
  input: CreateLessonInput,
};

export type CreateLessonMutation = {
  createLesson:  {
    __typename: "Lesson",
    id: string,
    title: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        nextToken: string | null,
      } | null,
    } | null,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        ask: string | null,
        answer: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateLessonMutationVariables = {
  input: UpdateLessonInput,
};

export type UpdateLessonMutation = {
  updateLesson:  {
    __typename: "Lesson",
    id: string,
    title: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        nextToken: string | null,
      } | null,
    } | null,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        ask: string | null,
        answer: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteLessonMutationVariables = {
  input: DeleteLessonInput,
};

export type DeleteLessonMutation = {
  deleteLesson:  {
    __typename: "Lesson",
    id: string,
    title: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        nextToken: string | null,
      } | null,
    } | null,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        ask: string | null,
        answer: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateQuestionMutationVariables = {
  input: CreateQuestionInput,
};

export type CreateQuestionMutation = {
  createQuestion:  {
    __typename: "Question",
    id: string,
    ask: string | null,
    answer: string | null,
    lesson:  {
      __typename: "Lesson",
      id: string,
      title: string,
      user:  {
        __typename: "User",
        id: string,
        name: string,
      } | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateQuestionMutationVariables = {
  input: UpdateQuestionInput,
};

export type UpdateQuestionMutation = {
  updateQuestion:  {
    __typename: "Question",
    id: string,
    ask: string | null,
    answer: string | null,
    lesson:  {
      __typename: "Lesson",
      id: string,
      title: string,
      user:  {
        __typename: "User",
        id: string,
        name: string,
      } | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteQuestionMutationVariables = {
  input: DeleteQuestionInput,
};

export type DeleteQuestionMutation = {
  deleteQuestion:  {
    __typename: "Question",
    id: string,
    ask: string | null,
    answer: string | null,
    lesson:  {
      __typename: "Lesson",
      id: string,
      title: string,
      user:  {
        __typename: "User",
        id: string,
        name: string,
      } | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    name: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetLessonQueryVariables = {
  id: string,
};

export type GetLessonQuery = {
  getLesson:  {
    __typename: "Lesson",
    id: string,
    title: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        nextToken: string | null,
      } | null,
    } | null,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        ask: string | null,
        answer: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListLessonsQueryVariables = {
  filter?: ModelLessonFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLessonsQuery = {
  listLessons:  {
    __typename: "ModelLessonConnection",
    items:  Array< {
      __typename: "Lesson",
      id: string,
      title: string,
      user:  {
        __typename: "User",
        id: string,
        name: string,
      } | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetQuestionQueryVariables = {
  id: string,
};

export type GetQuestionQuery = {
  getQuestion:  {
    __typename: "Question",
    id: string,
    ask: string | null,
    answer: string | null,
    lesson:  {
      __typename: "Lesson",
      id: string,
      title: string,
      user:  {
        __typename: "User",
        id: string,
        name: string,
      } | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListQuestionsQueryVariables = {
  filter?: ModelQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuestionsQuery = {
  listQuestions:  {
    __typename: "ModelQuestionConnection",
    items:  Array< {
      __typename: "Question",
      id: string,
      ask: string | null,
      answer: string | null,
      lesson:  {
        __typename: "Lesson",
        id: string,
        title: string,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    name: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    name: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    name: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateLessonSubscription = {
  onCreateLesson:  {
    __typename: "Lesson",
    id: string,
    title: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        nextToken: string | null,
      } | null,
    } | null,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        ask: string | null,
        answer: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateLessonSubscription = {
  onUpdateLesson:  {
    __typename: "Lesson",
    id: string,
    title: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        nextToken: string | null,
      } | null,
    } | null,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        ask: string | null,
        answer: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteLessonSubscription = {
  onDeleteLesson:  {
    __typename: "Lesson",
    id: string,
    title: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        nextToken: string | null,
      } | null,
    } | null,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        ask: string | null,
        answer: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateQuestionSubscription = {
  onCreateQuestion:  {
    __typename: "Question",
    id: string,
    ask: string | null,
    answer: string | null,
    lesson:  {
      __typename: "Lesson",
      id: string,
      title: string,
      user:  {
        __typename: "User",
        id: string,
        name: string,
      } | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateQuestionSubscription = {
  onUpdateQuestion:  {
    __typename: "Question",
    id: string,
    ask: string | null,
    answer: string | null,
    lesson:  {
      __typename: "Lesson",
      id: string,
      title: string,
      user:  {
        __typename: "User",
        id: string,
        name: string,
      } | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteQuestionSubscription = {
  onDeleteQuestion:  {
    __typename: "Question",
    id: string,
    ask: string | null,
    answer: string | null,
    lesson:  {
      __typename: "Lesson",
      id: string,
      title: string,
      user:  {
        __typename: "User",
        id: string,
        name: string,
      } | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};
