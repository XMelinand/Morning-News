export default function (userToken = '', action) {
    if (action.type == "addUserToken") {
        console.log('added?', action.userToken);

    return action.userToken;
    } else {
    return userToken;
    }
}
