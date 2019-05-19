// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    name
    lessons {
      items {
        id
        title
        successRatio
      }
      nextToken
    }
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    name
    lessons {
      items {
        id
        title
        successRatio
      }
      nextToken
    }
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    name
    lessons {
      items {
        id
        title
        successRatio
      }
      nextToken
    }
  }
}
`;
export const onCreateLesson = `subscription OnCreateLesson {
  onCreateLesson {
    id
    title
    successRatio
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
export const onUpdateLesson = `subscription OnUpdateLesson {
  onUpdateLesson {
    id
    title
    successRatio
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
export const onDeleteLesson = `subscription OnDeleteLesson {
  onDeleteLesson {
    id
    title
    successRatio
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
export const onCreateQuestion = `subscription OnCreateQuestion {
  onCreateQuestion {
    id
    ask
    answer
    lesson {
      id
      title
      successRatio
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
export const onUpdateQuestion = `subscription OnUpdateQuestion {
  onUpdateQuestion {
    id
    ask
    answer
    lesson {
      id
      title
      successRatio
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
export const onDeleteQuestion = `subscription OnDeleteQuestion {
  onDeleteQuestion {
    id
    ask
    answer
    lesson {
      id
      title
      successRatio
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
