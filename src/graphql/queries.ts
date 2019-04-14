// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      lessons {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getLesson = `query GetLesson($id: ID!) {
  getLesson(id: $id) {
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
export const listLessons = `query ListLessons(
  $filter: ModelLessonFilterInput
  $limit: Int
  $nextToken: String
) {
  listLessons(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getQuestion = `query GetQuestion($id: ID!) {
  getQuestion(id: $id) {
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
export const listQuestions = `query ListQuestions(
  $filter: ModelQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      ask
      answer
      lesson {
        id
        title
      }
    }
    nextToken
  }
}
`;

export const listQuestionsByTitle = (title: string) => `query ListQuestions(
  $filter: ModelQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestions(title: ${title}, limit: $limit, nextToken: $nextToken) {
    items {
      id
      ask
      answer
      lesson {
        id
        title
      }
    }
    nextToken
  }
}
`;
