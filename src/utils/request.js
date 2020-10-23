export default async function (url, getAccessTokenSilently, loginWithRedirect, method = 'GET', body) {
  try {


    let token = await getAccessTokenSilently();
    let response = null;

    if(method === "GET"){
      response = await fetch(url, {
        method: method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

    }
    else{
      response = await fetch(url, {
        method: method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body
      });
    }

    let data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    await loginWithRedirect;
  }
}


