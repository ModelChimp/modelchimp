const { NODE_ENV } = process.env;
if (!NODE_ENV) {
    throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

const getServerUrl = () => {
  return null;
}
