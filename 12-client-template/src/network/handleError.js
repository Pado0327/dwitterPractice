export function handleError(response) {
  if (response.status > 299 || response.stats < 200) {
    const message =
      response.data && response.data.message
        ? response.data.message
        : 'Something went wrong!';

    console.log(message);
    throw new Error(message);
  }
}
