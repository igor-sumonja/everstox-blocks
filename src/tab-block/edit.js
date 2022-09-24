import { __ } from '@wordpress/i18n';
import {InnerBlocks, useBlockProps, InspectorControls, ColorPaletteControl } from '@wordpress/block-editor';
import { PanelBody, PanelRow  } from '@wordpress/components';
import './editor.scss';


export default function Edit( { attributes, setAttributes, clientId } ) {

	const ALLOWED_BLOCKS = [ 'everstox/tab' ];

	// Loop inner blocks (TAB) and fetch their tabLabel attribute
	const getLabelsArray = () => {
		const innerBlocks = wp.data.select( 'core/block-editor' ).getBlocks( clientId )
		let tabLabels = [];
		innerBlocks.forEach( (block) => {
			tabLabels.push( block.attributes.tabLabel)
		} )
		return tabLabels;
	}

	// update attribute array with innerBlocks labels
	const updateTabsLabels = () => {
		setAttributes ({ tabLabelsArray: getLabelsArray()  });
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Set tab toggle background color', 'everstox' ) }
				>
					<PanelRow>
						<ColorPaletteControl
							value={ attributes.tabColor }
							onChange={ newValue => setAttributes({tabColor: newValue}) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }  onChange={ () => updateTabsLabels() }>
				<h2>Tabbed Layout Block</h2>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
			</div>
		</>
	);
}
