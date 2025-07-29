import React from 'react';
import { twJoin } from '@uniwebcms/module-sdk';

export default function Feature(props) {
    const { block } = props;

    const { pretitle, title, subtitle } = block.getBlockContent();

    const {
        max_width = 'md',
        max_items_per_row = 3,
        child_card_roundness = 'none',
        with_custom_children_wrapper = false,
        child_card_space_in_between = 'medium',
    } = block.getBlockProperties();

    const { childBlocks } = block;
    const hasChildBlocks = childBlocks.length > 0;
    const ChildBlockRenderer = block.getChildBlockRenderer();

    const gridClassName = ['grid mx-auto grid-cols-1'];

    if (max_width === 'sm') {
        gridClassName.push('max-w-4xl');
    } else if (max_width === 'md') {
        gridClassName.push('max-w-5xl');
    } else if (max_width === 'lg') {
        gridClassName.push('max-w-6xl');
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

    if (pretitle || title || subtitle) {
        gridClassName.push('mt-16');
    }

    if (child_card_space_in_between === 'small') {
        gridClassName.push('gap-4');
    } else if (child_card_space_in_between === 'medium') {
        gridClassName.push('gap-8');
    } else if (child_card_space_in_between === 'large') {
        gridClassName.push('gap-12');
    }

    let ChildrenWrapper = with_custom_children_wrapper ? React.Fragment : 'div';
    let childrenWrapperProps = with_custom_children_wrapper
        ? {}
        : { className: twJoin(gridClassName) };

    return (
        <section className="container-7xl">
            <div className="text-center max-w-2xl mx-auto">
                <p className="font-semibold text-primary-500 uppercase tracking-wide">{pretitle}</p>
                <h2 className={twJoin('font-semibold text-4xl sm:text-5xl', pretitle && 'mt-4')}>
                    {title}
                </h2>
                {subtitle && (
                    <div className="mt-6 space-y-4 text-lg text-text-color max-w-prose mx-auto">
                        {subtitle}
                    </div>
                )}
            </div>
            {hasChildBlocks ? (
                <ChildrenWrapper {...childrenWrapperProps}>
                    <ChildBlockRenderer
                        block={block}
                        childBlocks={childBlocks}
                        extra={{ borderRoundness: child_card_roundness }}
                    ></ChildBlockRenderer>
                </ChildrenWrapper>
            ) : null}
        </section>
    );
}
