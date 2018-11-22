import React,{Component} from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import { Immediate } from './immediate';
import { Bussiness } from './bussiness';

class SeeHow extends Component {
    constructor() {
        super();
        this.state = {
            isTabFirst: true,
            isTabSecond: false,
        }
    }
    onTabClick=(e)=> {
        if (e.target.name === "immediate") {
            this.setState({
                isTabFirst: true
            })
        }else if (e.target.name === "business") {
            this.setState({
                isTabFirst: false
            })
        }
    }
    render() {
        return(
            <div className="xs-12 seehow">
                <div className="xs-12 top">
                    <h1 className="title">SEE HOW IT WORKS</h1>
                    <p className="lead">Discover how OSISO works perfectly for all business types </p>
                    <ButtonGroup>
                        <Button className={this.state.isTabFirst === true ? "active normal": "normal"} name="immediate" onClick={this.onTabClick}>Immediate</Button>
                        <Button className={this.state.isTabFirst === false ? "active normal": "normal"} name="business" onClick={this.onTabClick}>Business</Button>
                    </ButtonGroup>
                </div>
                {this.state.isTabFirst ? <Immediate/> : <Bussiness/>}
            </div>
        )
    }
}

export default SeeHow;