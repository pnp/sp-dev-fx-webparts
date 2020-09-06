var externalTemplate = (function() {
    var properties = {
            key: 'jQueryTemplate',
            text: 'jQuery template',
            mappings: 'Path,Title,Filename,ModifiedOWSDATE',
            scripts: [{
                url: 'https://code.jquery.com/jquery-3.1.0.js',
                name: 'jQuery'
            }],
            styles: [{
                url: '<your-site-url>/sample_style.css'
            }]
        },
        component = React.createClass({
            displayName: 'Component',

            componentDidMount: function() {
                jQuery(function() {
                    var elm = jQuery('h1');
                    elm.text(elm.text() + ' - updated with jQuery').css('color', '#c00000');
                });
            },

            render: function render() {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        "External sample template"
                    ),
                    this.props.results.map(function (result, index) {
                        return React.createElement(
                            "p",
                            { key: index, className: "my-sample-template" },
                            React.createElement(
                                "a",
                                { href: result.Path },
                                result.Title
                            )
                        );
                    })
                );
            }
        });

    return {
        properties: properties,
        component: component
    }
})();