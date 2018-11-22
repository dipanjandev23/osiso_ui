import React, { Component } from 'react';
import Banner1 from '../../../../assets/Banner1.jpg';
import Banner2 from '../../../../assets/Banner2.jpg';
import Banner3 from '../../../../assets/Banner3.jpg';
import Banner4 from '../../../../assets/Banner4.jpg';
import Banner5 from '../../../../assets/Banner5.jpg';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import Axios from 'axios';
import swal from 'sweetalert';
import Loading from '../../../../Routes/loading';

import {media, ip} from '../../../../helpers/apiEndpoints';

class Customers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            items: [
                // {
                //     src: Banner1,
                //     altText: '1',
                //     caption: ''
                // },
                // {
                //     src: Banner2,
                //     altText: '2',
                //     caption: ''
                // },
                // {
                //     src: Banner3,
                //     altText: '3',
                //     caption: ''
                // },
                // {
                //     src: Banner4,
                //     altText: '4',
                //     caption: ''
                // },
                // {
                //     src: Banner5,
                //     altText: '5',
                //     caption: ''
                // }
            ]
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    componentDidMount(){

         // swal ( "Please wait..." );
         Loading // Calling Loader
         Axios({
             url: media,
             method: `GET`
         })
         .then (({data})=>{
             //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
             if(data.status === "success")
             {
                 this.setState({
                     items: data.images.map((image, i) => ({
                        src: ip + image,
                        altText: i + 1,
                        caption: ''
                    }))
                 })
             }
         })
         .catch(data=>{
             swal ( "Oops" ,  "Something went wrong" ,  "error" );
         })

    }

    render() {

        const { activeIndex, items } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });


        return (    
            <div className="cus_con">
                {/* <div className="xs-12 customers">
                    <h1 className="title">TAKE A LOOK AT OUR HAPPY CUSTOMERS</h1>
                    <p className="lead">We’ve got business type that cover all sizes and budgets</p>
                </div> */}
                <div className="xs-12">

                    <Carousel
                        activeIndex={activeIndex}
                        next={this.next}
                        previous={this.previous}
                    >
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default Customers;