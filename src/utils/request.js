export default async function (url, method = 'GET', body, getAccessTokenSilently, loginWithRedirect) {
  try {


    let token = getAccessTokenSilently;



    let response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body
    });

    let data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    await loginWithRedirect;
  }
}


