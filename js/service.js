const createRequest = (onSuccess, onError, url, options) => {
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError();
      }
    })
    .then((result) => {
      if (result) {
        onSuccess(result);
      }
    })
    .catch(() => {
      onError();
    });
};

export {createRequest};
