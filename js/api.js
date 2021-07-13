const createRequest = (onSuccess, onError, url, options) => {
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onError();
    })
    .then((result) => {
      if (onSuccess) {
        onSuccess(result);
      }
    })
    .catch(() => {
      onError();
    });
};

export {createRequest};
