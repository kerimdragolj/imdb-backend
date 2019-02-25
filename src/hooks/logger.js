// A hook that logs service method before, after and error

module.exports = function () {
  return function (hook) {
    let message = `${hook.type}: ${hook.path} - Method: ${hook.method}`;

    if (hook.type === 'error') {
      message += `: ${hook.error.message}`;
    }

    console.info(message);
    console.debug('hook.data', hook.data);
    console.debug('hook.params', hook.params);

    if (hook.result) {
      console.debug('hook.result', hook.result);
    }

    if (hook.error) {
      console.error(hook.error);
    }
  };
};
