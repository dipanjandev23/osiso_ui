import React,{Component} from 'react';

class Button extends Component {
    render() {
        const {title,onAction,progress,bgcolor} = this.props;
        return (
            <div className="xs-12">
                <button onClick={onAction} style={{backgroundColor: `${bgcolor}`}}>
                    {progress === false ? title : null}
                </button>
            </div>
        )
    }
}

export default Button;