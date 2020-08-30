module.exports = {
    chainWebpack: config => {
        config.output.filename('js/[name].[hash].js').end()
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000'
            }
        }
    }
};
