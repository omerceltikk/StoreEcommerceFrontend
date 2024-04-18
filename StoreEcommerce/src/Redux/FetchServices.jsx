

export const FetchGetMethod = async (url) => {
  const currUser = JSON.parse(localStorage.getItem("user"));

  const getUrl = await fetch(`${process.env.APP_API_BASE_ENDPOINT}${url}`, {
    method: 'GET',
    mode: "cors",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
       "Authorization": currUser?.accessToken
    },
  })
    .then((res) => res.json())

  return getUrl;
}
export const FetchDeleteMethod = async (url, id) => {
  const currUser = JSON.parse(localStorage.getItem("user"));

  await fetch(`${process.env.APP_API_BASE_ENDPOINT}${url}/${id}`, {
    method: 'DELETE',
    mode: "cors",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      "Authorization": currUser?.accessToken

    }
  }).catch((e) => console.log(e))
}



export const FetchPostMethod = (url, body) => {
  const currUser = JSON.parse(localStorage.getItem("user"));

  const request = fetch(`${process.env.APP_API_BASE_ENDPOINT}${url}`, {
    method: 'POST',
    mode: "cors",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      "Authorization": currUser?.accessToken
    },
    body: JSON.stringify(body)
  })
  return request
}
export const FetchPutMethod = (url, body) => {
  const currUser = JSON.parse(localStorage.getItem("user"));
  const request = fetch(`${process.env.APP_API_BASE_ENDPOINT}${url}`, {
    method: 'PUT',
    mode: "cors",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      "Authorization": currUser?.accessToken
    },
    body: JSON.stringify(body)
  })
  return request
}
export const RefreshToken = () => {
  const currUser = JSON.parse(localStorage.getItem("user"));
  const request = fetch(`${process.env.APP_API_BASE_ENDPOINT}/auth/refresh`, {
    method: 'POST',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: currUser.userId,
      refreshToken: currUser.refreshToken,
    })
  })
  return request;
}