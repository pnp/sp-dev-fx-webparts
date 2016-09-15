var externalTemplate = (function() {
    var properties = {
            key: 'CarouselTemplate',
            text: 'Carousel template',
            mappings: 'Path,Title,Filename,PictureThumbnailURL',
            scripts: [{
                url: 'https://code.jquery.com/jquery-1.12.4.min.js',
                funcName: 'jQuery'
            }, {
                url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.cycle2/2.1.6/jquery.cycle2.min.js',
                funcName: 'cycle'
            }],
            styles: []
        },
        component = React.createClass({
            displayName: 'Component',

            componentDidMount: function() {
                this._startCarousel();
            },

            _startCarousel: function() {
                jQuery(function() {
                    jQuery('.cycle-slideshow').cycle();
                });
            },

            render: function render() {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        "Carousel template sample"
                    ),
                    React.createElement(
                        "div",
                        { className: "cycle-slideshow" },
                        this.props.results.map(function (result, index) {
                            return React.createElement("img", { src: result.PictureThumbnailURL, key: index });
                        })
                    )
                );
            }
        });

    return {
        properties: properties,
        component: component
    }
})();