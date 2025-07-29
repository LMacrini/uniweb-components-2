import React from 'react';

export default function FeatureGrid(props) {
    const { block } = props;

    const { childBlocks } = block;
    const ChildBlockRenderer = block.getChildBlockRenderer();

    return (
        <section className="container-7xl">
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-[22rem] gap-4">
                <ChildBlockRenderer
                    block={block}
                    childBlocks={childBlocks}
                    pure={true}
                ></ChildBlockRenderer>
            </div>
        </section>
    );
}
