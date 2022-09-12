import { InnerBlocks } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

 export default function Edit( props ) {

	 const ALLOWED_BLOCKS = [ 'everstox/tab' ];

	const {
		attributes,
		setAttributes,

	} = props;
	const { tabLabelsArray, updateChild } = attributes;

	const buildTabLabelsArray = () =>{
		//function gets child block attributes and saves as an array to parent attributes
		const parentBlockID = props.clientId;
		const { innerBlockCount } = useSelect(select => ({
			innerBlockCount: select('core/block-editor').getBlockCount(parentBlockID)
		}));

		let tabLabels = [];

		for (let block = 0; block < innerBlockCount; block++) {
			let tabLabel = wp.data.select( 'core/block-editor' ).getBlocks( parentBlockID )[block].attributes.tabLabel;
			tabLabels.push(tabLabel);
		}

		return tabLabels;
	}

	let labelsArray = buildTabLabelsArray();
	let labelLengthChange = labelsArray.length !== tabLabelsArray.length;

	if( labelLengthChange || updateChild ){
		setAttributes ({ tabLabelsArray: labelsArray  });
		setAttributes ({ updateChild: false });
	}

	return (
		<div { ...useBlockProps() }>
			<h2>Tabbed Layout Block</h2>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
		</div>
	);
}
