var externalTemplate = (function() {
    var properties = {
            key: 'SampleTemplate',
            text: 'Sample template',
            mappings: 'Path,Title,Filename'
        },
        component = React.createClass({
            displayName: 'Component',

            render: function render() {
                console.log(this.props.results);
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
                            null,
                            React.createElement(
                                "a",
                                { key: index, href: result.Path },
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