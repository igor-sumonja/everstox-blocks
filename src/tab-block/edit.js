import { InnerBlocks } from '@wordpress/block-editor';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';


 export default function Edit( { setAttributes, clientId } ) {

	const ALLOWED_BLOCKS = [ 'everstox/tab' ];

	// get new tab labels on each update
	const blockUpdate = () => {
		const innerBlocks = wp.data.select( 'core/block-editor' ).getBlocks( clientId )
		let tabLabels = [];
		innerBlocks.forEach( (block) => {
			tabLabels.push( block.attributes.tabLabel)
		} )
		return tabLabels;
	}

	const updateTabLabels = () => {
		let labelsArray = blockUpdate();
		setAttributes ({ tabLabelsArray: labelsArray  });
	}

	return (
		<div { ...useBlockProps() }  onChange={ () => updateTabLabels() }>
			<h2>Tabbed Layout Block</h2>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
		</div>
	);
}
