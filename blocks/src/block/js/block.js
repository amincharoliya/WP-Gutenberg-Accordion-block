const { Dashicon } = wp.components;
const { RichText, InspectorControls, PanelColorSettings, InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

//Import Styles
import "../css/style.scss";

registerBlockType('accordion-block/main', {   
    title: 'Accordion Block',
    icon: 'menu',
    category: 'common',

    attributes: {

        title: {
          source: 'string',
          source: 'html',
          selector: '.accordion__title'
        },
        content: {
            source: 'string',
            source: 'html',
            selector: '.accordion__body__inner'
        },
        headBackground: {
            source: 'string',
            default: '#89d4df'
        },
        headColor: {
            source: 'string',
            default: '#222'
        },
        bodyBackground: {
            source: 'string',
            default: '#e8f3f5'
        },
        bodyColor: {
            source: 'string',
            default: '#222'
        }

    },

    edit( { attributes, setAttributes  } ) {
        const ALLOWED_BLOCKS = [ 'core/image', 'core/paragraph', 'core/list' ];

        return (
            <>
                <InspectorControls>
                    <PanelColorSettings 
                        title={__('Header Style')}
                        colorSettings={[
                            {
                                value: attributes.headBackground.color,
                                onChange: content => setAttributes({ headBackground: content }),
                                label: __('Heading background color')
                            },
                            {
                                value: attributes.headColor.color,
                                onChange: content => setAttributes({ headColor: content }),
                                label: __('Heading Text color')
                            }
                        ]}
                    />
                    <PanelColorSettings 
                        title={__('Body Style')}
                        colorSettings={[
                            {
                                value: attributes.bodyBackground.color,
                                onChange: content => setAttributes({ bodyBackground: content }),
                                label: __('Body background color')
                            },
                            {
                                value: attributes.bodyColor.color,
                                onChange: content => setAttributes({ bodyColor: content }),
                                label: __('Body Text color')
                            }
                        ]}
                    />
                </InspectorControls>
                <div className="accordion__block">
                    <div className="accordion__head" style={ { backgroundColor: attributes.headBackground, color: attributes.headColor } }>
                        <h3>
                            <RichText
                                onChange={ content => setAttributes({ title: content }) }
                                value={ attributes.title }
                                placeholder={__('Enter title')}
                                className={__('accordion__title')}
                            />
                        </h3>
                        <span className="accordion__toggle">
                            <Dashicon icon="plus-alt2" />
                        </span>
                    </div>
                    <div className="accordion__body" style={ { backgroundColor: attributes.bodyBackground, color: attributes.bodyColor } }>
                        <div className="accordion__body__inner">
                            <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
                        </div>
                    </div>
                </div>

            </>
        )

    },

    save( { attributes } ) {

        let accordionHeadStyle = {
            backgroundColor: attributes.headBackground,
            color: attributes.headColor
        };

        let accordionBodyStyle = {
            backgroundColor: attributes.bodyBackground,
            color: attributes.bodyColor,
            display: 'none'
        };

        return (
            <div className="accordion__block">
                <div className="accordion__head" style={ accordionHeadStyle }>
                    <RichText.Content className="accordion__title" tagName="h3" value={ attributes.title } />
                    <span className="accordion__toggle"><Dashicon icon="plus-alt2" /></span>
                </div>
                <div className="accordion__body" style={ accordionBodyStyle }>
                    <div className="accordion__body__inner">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        )
    }

});
