import React,{Component} from 'react';

class Input extends Component {
    render() {
        const {labelname,type,placeholder,name,onChange,value,customclass,option} = this.props;
        let view;
        switch (type) {
            case 'text': 
            view = (
                <span>
                    <label>{labelname}</label>
                    <input placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} className={customclass} required/>
                </span>
            )
            break;
            case 'textarea': 
            view = (
                <span>
                    <label>{labelname}</label>
                    <textarea placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} className={customclass} required></textarea>
                </span>
            )
            break;
            case 'number': 
            view = (
                <span>
                    <label>{labelname}</label>
                    <input placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} className={customclass} required/>
                </span>
            )
            break;
            case 'password': 
            view = (
                <span>
                    <label>{labelname}</label>
                    <input placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} className={customclass} required/>
                </span>
            )
            break;
            case 'tel': 
            view = (
                <span>
                    <label>{labelname}</label>
                    <input placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} className={customclass} required/>
                </span>
            )
            break;
            case 'date': 
            view = (
                <span>
                    <label>{labelname}</label>
                    <input placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} className={customclass} required/>
                </span>
            )
            break;
            case 'time': 
            view = (
                <span>
                    <label>{labelname}</label>
                    <input placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} className={customclass} required min="08:00" max="17:00"/>
                </span>
            )
            break;
            case 'email': 
            view = (
                <span>
                    <label>{labelname}</label>
                    <input placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} className={customclass} required/>
                </span>
            )
            break;
            case 'select': 
            view = (
                <span>
                    <label>{labelname}</label>
                    <select name={name} value={value} required onChange={onChange} className={customclass}>
                        <option value="">{placeholder}</option>
                        {option.map((op,index)=>(
                            <option value={op} key={index}>{op} kg</option>
                        ))}
                    </select>
                </span>
            )
            break;
            case 'select-loc': 
            view = (
                <span>
                    <label>{labelname}</label>
                    <select name={name} value={value} required onChange={onChange} className={customclass}>
                        <option value="">{placeholder}</option>
                        {option.map((op,index)=>(
                            <option value={op.id} key={index}>{op.name}</option>
                        ))}
                    </select>
                </span>
            )
            break;
            default:
            view = (
                <span>
                    <input/>
                </span>
            )
            break;
        }
        return (
            <div className="xs-12 bottom">
                {view}
            </div>
        )
    }
}

export default Input;