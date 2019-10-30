const config  = {
  BACKEND_URL: '172.16.0.199:3030',
  STORAGE_KEY: 'feathers-jwt',
};

Object.keys(config).forEach(function(key) {
  process.env[key] = config[key];
});

module.exports = config;
