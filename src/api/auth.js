import configapi from './configapi'

const authenticateApi = async ({
  userNameOrEmailAddress,
  passWord,
  rememberClient,
}) => {
  configapi
    .post(`/TokenAuth/Authenticate`, {
      userNameOrEmailAddress: userNameOrEmailAddress,
      passWord: passWord,
      rememberClient: rememberClient,
    })
    .then((response) => {
      // console.log(response);
      return response;
    });
};

export default authenticateApi;