module.exports = {
    devServer: (devServerConfig) => {
        devServerConfig.allowedHosts = 'all'; // allow all hosts
        return devServerConfig;
    },
};