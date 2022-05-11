
const userResponse = {
  user: {
    userId: "9a68ff4f-c05e-4c3b-b888-70f1b613c325",
    userName: "newUser",
    email: "newuser@mail.de",
    createdAt: 1652254141932,
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlhNjhmZjRmLWMwNWUtNGMzYi1iODg4LTcwZjFiNjEzYzMyNSIsInVzZXJuYW1lIjoicHdxb2wxNCIsImVtYWlsIjoicG93cXdsQG1haWwuZGUiLCJpYXQiOjE2NTIyNTQxNDEsImV4cCI6MTY1MjI2MTM0MX0.xIoRc51JcMNNsDtiDhFGCQR0_qTQClLE08mAF4dYYo8",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlhNjhmZjRmLWMwNWUtNGMzYi1iODg4LTcwZjFiNjEzYzMyNSIsInVzZXJuYW1lIjoicHdxb2wxNCIsImVtYWlsIjoicG93cXdsQG1haWwuZGUiLCJpYXQiOjE2NTIyNTQxNDEsImV4cCI6MTY1MjI3NTc0MX0.SNlmCu1FRKeIqWMI7GsgMUJ84t4hM293qubLat-mNmI"
  }
}

export const createNewUser = {
  apiOperation: {
    summary: 'create new user by email and password',
  },
  apiResponse: {
    status: 201,
    description: 'created new user',
    type: userResponse,
  },
};

export const findUserById = {
  apiOperation: {
    summary: 'find one user by id',
  },
  apiResponse: {
    status: 200,
    description: 'founded user',
    type: userResponse,
  },
};

export const updateCurrentUser = {
  apiOperation: {
    summary: 'update current user ',
  },
  apiResponse: {
    status: 200,
    description: 'updated user',
    type: userResponse,
  },
};

