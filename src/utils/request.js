export default async function (url, getAccessTokenSilently, loginWithRedirect) {
  try {
    let token = await getAccessTokenSilently();



    //no post request, we can extend here, data or method,
    //create a Post API here


    let response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    await loginWithRedirect();
  }
}
