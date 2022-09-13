import {InnerBlocks, useBlockProps} from '@wordpress/block-editor';
import './editor.scss';


export default function Edit( { setAttributes, clientId } ) {

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
		<div { ...useBlockProps() }  onChange={ () => updateTabsLabels() }>
			<h2>Tabbed Layout Block</h2>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
		</div>
	);
}
