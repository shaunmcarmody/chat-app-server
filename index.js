const server = require('./api');

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
server.listen(port, () => console.log(`\n** Server running on port ${port} **\n`));
