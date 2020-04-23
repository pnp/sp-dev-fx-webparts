import * as React from "react";
import * as ReactDOM from "react-dom";
import MagnifierProps from './IMagnifierProps';
import ImageMagnifierLensProps from './IImageMagnifierLensProps';
import ImageMagnifierLensState from './IImageMagnifierLensState';
import IOffset from './IOffset';

export class Magnifier extends React.Component<MagnifierProps, {}> {
    render (): React.ReactElement<MagnifierProps> {
        let props = this.props;
        let halfSize = props.size / 2;
        let magX = props.zoomImage.width / props.smallImage.width;
        let magY = props.zoomImage.height / props.smallImage.height;
        let bgX = -(props.offsetX*magX - halfSize);
        let bgY = -(props.offsetY*magY - halfSize);
        let isVisible = props.offsetY < props.smallImage.height &&
                        props.offsetX < props.smallImage.width &&
                        props.offsetY > 0 &&
                        props.offsetX > 0;
        return (
            <div style={{
                position: 'absolute',
                display: isVisible ? 'block' : 'none',
                top: props.y,
                left: props.x,
                width: props.size,
                height: props.size,
                marginLeft: -halfSize + props.cursorOffset.x,
                marginTop: -halfSize + props.cursorOffset.y,
                backgroundColor: 'white',
                borderRadius: props.size,
                boxShadow: `1px 1px 6px rgba(0,0,0,0.3)`
            }}>
                <div style={{
                    width: props.size,
                    height: props.size,
                    backgroundImage: `url(${props.zoomImage.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${bgX}px ${bgY}px`,
                    borderRadius: props.size
                }} />
            </div>
        );
    }
}

export class ImageMagnifierLens extends React.Component<ImageMagnifierLensProps, ImageMagnifierLensState> {
    private portalElement: HTMLDivElement = null;

    constructor(props: ImageMagnifierLensProps, state: ImageMagnifierLensState) {
        super(props);

        this.setState({
            x: 0,
            y: 0,
            offsetX: -1,
            offsetY: -1
        });
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        if (!this.portalElement) {
            this.portalElement = document.createElement('div');
            document.body.appendChild(this.portalElement);
        }
        this.componentDidUpdate();
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.body.removeChild(this.portalElement);
        this.portalElement = null;
    }

    onMouseMove = (e: any) => {
        var offset = this.getOffset(ReactDOM.findDOMNode(this));

        this.setState({
            x: e.x + window.scrollX,
            y: e.y + window.scrollY,
            offsetX: e.x - offset.x,
            offsetY: e.y - offset.y
        });
    }

    componentDidUpdate() {
        ReactDOM.render(<Magnifier
            size={this.props.size}
            smallImage={this.props.image}
            zoomImage={this.props.zoomImage}
            cursorOffset={this.props.cursorOffset}
            {...this.state}
        />, this.portalElement);
    }

    private getOffset(el: HTMLDivElement): IOffset {
        let x = 0;
        let y = 0;
    
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            x += el.offsetLeft - el.scrollLeft;
            y += el.offsetTop - el.scrollTop;
            el = el.offsetParent as HTMLDivElement; //el.offsetParent;
        }
        return { x, y };
    }
    
    render () {
        return (
            <img {...this.props} src={this.props.image.src} />
        );
    }
}

export default ImageMagnifierLens;