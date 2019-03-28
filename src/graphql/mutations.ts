// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    lessons {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    name
    lessons {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    name
    lessons {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const createLesson = `mutation CreateLesson($input: CreateLessonInput!) {
  createLesson(input: $input) {
    id
    title
    user {
      id
      name
      lessons {
        nextToken
      }
    }
    questions {
      items {
        id
        ask
        answer
      }
      nextToken
    }
  }
}
`;
export const updateLesson = `mutation UpdateLesson($input: UpdateLessonInput!) {
  updateLesson(input: $input) {
    id
    title
    user {
      id
      name
      lessons {
        nextToken
      }
    }
    questions {
      items {
        id
        ask
        answer
      }
      nextToken
    }
  }
}
`;
export const deleteLesson = `mutation DeleteLesson($input: DeleteLessonInput!) {
  deleteLesson(input: $input) {
    id
    title
    user {
      id
      name
      lessons {
        nextToken
      }
    }
    questions {
      items {
        id
        ask
        answer
      }
      nextToken
    }
  }
}
`;
export const createQuestion = `mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
    id
    ask
    answer
    lesson {
      id
      title
      user {
        id
        name
      }
      questions {
        nextToken
      }
    }
  }
}
`;
export const updateQuestion = `mutation UpdateQuestion($input: UpdateQuestionInput!) {
  updateQuestion(input: $input) {
    id
    ask
    answer
    lesson {
      id
      title
      user {
        id
        name
      }
      questions {
        nextToken
      }
    }
  }
}
`;
export const deleteQuestion = `mutation DeleteQuestion($input: DeleteQuestionInput!) {
  deleteQuestion(input: $input) {
    id
    ask
    answer
    lesson {
      id
      title
      user {
        id
        name
      }
      questions {
        nextToken
      }
    }
  }
}
`;
