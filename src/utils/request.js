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
    if(method === "POST"){
      response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        },
        body
      });
    }

    if(method === "DELETE"){
      response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    let data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    await loginWithRedirect;
  }
}


