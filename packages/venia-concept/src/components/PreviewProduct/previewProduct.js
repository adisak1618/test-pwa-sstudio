import React, { Component } from 'react';
import { oneOf, shape, string } from 'prop-types';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
import Card from '../Card';
import styled from 'styled-components';
import classify from '../../classify';
import defaultClasses from './previewProduct.css';
import Slider from "react-slick";
import { Query } from '@magento/venia-drivers';
import categoryQuery from '../../queries/getCategory.graphql';
const getRootClassName = priority => `root_${priority}Priority`;

export class Button extends Component {
    static propTypes = {
        classes: shape({
            content: string,
            root: string,
            root_highPriority: string,
            root_normalPriority: string
        }).isRequired,
        priority: oneOf(['high', 'normal']).isRequired,
        type: oneOf(['button', 'reset', 'submit']).isRequired
    };

    static defaultProps = {
        priority: 'normal',
        type: 'button'
    };

    render() {
        const { children, classes, priority, type, categoryId, ...restProps } = this.props;

        const rootClassName = classes[getRootClassName(priority)];
        const settings = {
            dots: true,
            // infinite: true,
            // speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
          };
        return (
            <div className={rootClassName} type={type} {...restProps}>
                <Query query={categoryQuery} variables={{ id: categoryId, pageSize: 6, currentPage: 1, onServer: false, idString: categoryId }}>
                    {({ loading, error, data }) => {
                        if (error) {
                            return (
                                <div className={classes.fetchError}>
                                    Data Fetch Error: <pre>{error.message}</pre>
                                </div>
                            );
                        }
                        if (loading) {
                            return fullPageLoadingIndicator;
                        }
                        if (data.products && data.products.items && data.products.items.length === 0) {
                            return (
                                <div className={classes.noResults}>
                                    No child categories found.
                                </div>
                            );
                        }
                        return (
                            <SliderWrapper>
                                <HeaderSection>
                                    <Header>{data.category.name}</Header>
                                </HeaderSection>
                                <Content>
                                    <Slider {...settings}>
                                        {data.products.items.map(item => (
                                            <div key={item.url_key}>
                                                <Card data={item}/>
                                            </div>
                                        ))}
                                    </Slider>
                                </Content>
                            </SliderWrapper>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default classify(defaultClasses)(Button);

const HeaderSection = styled.div`
    background-color: rgb(208, 2, 27);
    height: 200px;
    padding: 20px 5px;
`

const Content = styled.div`
    margin-top: -100px;
`

const Header = styled.h3`
    font-size: 32px !important;
    font-weight: bold !important;
    padding: 10px;
    color: #FFF;
    text-transform: uppercase;
`

const SliderWrapper = styled.div`
    margin-bottom: 80px;
    .slick-prev, .slick-next {
        display: none !important;
    }
    .slick-dots {
        li {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 4px;
            margin: 0 5px;
            padding: 0;
            cursor: pointer;
        }
        li.slick-active {
            background-color: transparent;
            button:before {
                opacity: .75;
                color: #000;
            }
            button:after {
                -webkit-transform: scale(1,1);
                -ms-transform: scale(1,1);
                transform: scale(1,1);
                -webkit-transition: -webkit-transform 3s;
                -webkit-transition: transform 3s;
                transition: transform 3s;
            }
        }
        li button:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            height: 4px;
            opacity: 1;
            background-color: #e6e6e6;
        }
        li button:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background-color: black;
            -webkit-transform: scale(0,1);
            -ms-transform: scale(0,1);
            transform: scale(0,1);
            -webkit-transform-origin: left center;
            -ms-transform-origin: left center;
            transform-origin: left center;
        }
    }
`
