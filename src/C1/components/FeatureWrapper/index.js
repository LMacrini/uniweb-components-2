import React from 'react';
import { twJoin } from '@uniwebcms/module-sdk';

export default function FeatureWrapper(props) {
    const { block } = props;

    const {
        max_width = 'medium',
        max_items_per_row = 3,
        child_card_roundness = 'none',
        margin_top = 'none',
        space_between_items = 'medium',
    } = block.getBlockProperties();

    const { childBlocks } = block;
    const ChildBlockRenderer = block.getChildBlockRenderer();

    const gridClassName = ['grid mt-16 mx-auto grid-cols-1'];

    if (max_width === 'small') {
        gridClassName.push('max-w-4xl');
    } else if (max_width === 'medium') {
        gridClassName.push('max-w-5xl');
    } else if (max_width === 'large') {
        gridClassName.push('max-w-6xl');
    } else if (max_width === 'xs') {
        gridClassName.push('max-w-2xl');
    }

    if (max_items_per_row == 2) {
        gridClassName.push('md:grid-cols-2');
    } else if (max_items_per_row == 3) {
        gridClassName.push('md:grid-cols-3');
    }

    if (child_card_roundness === 'small') {
        gridClassName.push('[&>*]:rounded-sm');
    } else if (child_card_roundness === 'medium') {
        gridClassName.push('[&>*]:rounded-md');
    } else if (child_card_roundness === 'large') {
        gridClassName.push('[&>*]:rounded-lg');
    }

    if (margin_top === 'small') {
        gridClassName.push('mt-8');
    } else if (margin_top === 'medium') {
        gridClassName.push('mt-16');
    } else if (margin_top === 'large') {
        gridClassName.push('mt-20');
    }

    if (space_between_items === 'small') {
        gridClassName.push('gap-4');
    } else if (space_between_items === 'medium') {
        gridClassName.push('gap-8');
    } else if (space_between_items === 'large') {
        gridClassName.push('gap-12');
    }

    return (
        <div className={twJoin(gridClassName)}>
            <ChildBlockRenderer
                block={block}
                childBlocks={childBlocks}
                extra={{ borderRoundness: child_card_roundness }}
            ></ChildBlockRenderer>
        </div>
    );
}
