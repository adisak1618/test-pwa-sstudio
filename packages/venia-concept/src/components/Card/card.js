import React, { Component } from 'react';
import { oneOf, shape, string } from 'prop-types';

import classify from '../../classify';
import defaultClasses from './card.css';
import styled from 'styled-components';
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
        const { children, classes, priority, type, data, ...restProps } = this.props;
        const { small_image, name } = data;

        const rootClassName = classes[getRootClassName(priority)];

        return (
            <div className={rootClassName} type={type} {...restProps}>
              <CardWrapper>
                <Card>
                  <Price>199 USD</Price>
                  <img className={classes.images} alt="product1" src={small_image.url} />
                  <Title>{name}</Title>
                </Card>
              </CardWrapper>
            </div>
        );
    }
}

export default classify(defaultClasses)(Button);

const Price = styled.div`
  position: absolute;
  width: auto;
  background: #000;
  color: #FFF;
  right: -5px;
  bottom: 40px;
  padding: 5px;
  font-weight: bold;
  font-size: 12px;
`

const Card = styled.div`
  position: relative;
  -webkit-box-shadow: -1px 6px 16px -3px rgba(0,0,0,0.26);
  -moz-box-shadow: -1px 6px 16px -3px rgba(0,0,0,0.26);
  box-shadow: -1px 6px 16px -3px rgba(0,0,0,0.26);
  margin-bottom: 20px;
  padding-bottom: 10px;
`

const CardWrapper = styled.div`
  width: 100%;
  padding: 10px;
`

const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 14px;
`