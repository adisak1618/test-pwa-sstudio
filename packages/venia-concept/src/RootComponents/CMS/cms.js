import React, { Component } from 'react';
import CategoryList from '../../components/CategoryList';
import HilightProduct from '../../components/PreviewProduct';

export default class CMS extends Component {
    render() {
        return (
            <div>
                <CategoryList title="Shop by category" id={2} />
                <HilightProduct categoryId={3} />
                <HilightProduct categoryId={14} />
                <HilightProduct categoryId={10} />
                <HilightProduct categoryId={7} />
                <HilightProduct categoryId={13} />
            </div>
        );
    }
}
