const path = require("path");
const  webpack  = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const config = {
    entry: {
        app: './assets/js/script.js',
        events: './assets/js/events.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js'
    },
    output: {
      path: path.join(__dirname + "/dist"), //should be changed
      filename: "[name].bundle.js"
},
module: {
    rules: [
        {
            test: /\.jpg$/i,
            use: [
                {
                    loader: 'file-loader',
//options object below the loader assignment that contains a name function, which returns the name of the file with the file extension
                    options: {
                        esmoodule: false,
                        name(file) {
                            return "[path][name].[ext]"
                        },
                        publicPath: function(url) {
                            return url.replace("../", "/assets/")
//publicPath property, which is also a function that changes our assignment URL by replacing the ../ from our require() statement with /assets/
                        }
                    }
                },
                {
                    loader: 'image-webpack-loader'
                }
            ]
        }
    ]
},
plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new BundleAnalyzerPlugin({
        analyzerMode: "static", //the report outputs to an HTML file in the dist folder
//We can also set this value to disable to temporarily stop the reporting and automatic opening of this report in the browser
    })
],
mode: 'development'
};

module.exports = config;