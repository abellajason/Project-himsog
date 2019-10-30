const config  = {
  BACKEND_URL: '192.168.5.116:3030',
  STORAGE_KEY: 'feathers-jwt',
};

Object.keys(config).forEach(function(key) {
  process.env[key] = config[key];
});

module.exports = config;
