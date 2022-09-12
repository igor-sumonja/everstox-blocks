/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { subscribe } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

const MY_TEMPLATE = [
	[ 'core/paragraph' ]
];

 export default function Edit( props ) {

	const {
		attributes: { tabLabel, blockIndex },
		setAttributes
	} = props;

	const parentBlockID = wp.data.select( 'core/block-editor' ).getBlockParentsByBlockName(props.clientId, ['everstox/tabs']);
	let	savedBlockIndex = blockIndex;
	const getBlockIndex = wp.data.select( 'core/block-editor' ).getBlockOrder( parentBlockID ).indexOf( props.clientId );

	const unsubscribe = subscribe( () => {
		let newBlockIndex = wp.data.select( 'core/block-editor' ).getBlockOrder( parentBlockID ).indexOf( props.clientId );
		let blockIndexChange = newBlockIndex !== savedBlockIndex;

		if(blockIndexChange){
			//update attributes when blocks move up or down
			unsubscribe()
			setAttributes({ blockIndex: newBlockIndex});
			wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( parentBlockID, { updateChild: true } );
		}

	} );

	const onChangeTabLabel = newTabLabel => {
		setAttributes({ tabLabel: newTabLabel});
		setAttributes({ blockIndex: getBlockIndex});
		wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( parentBlockID, { updateChild: true } );
	};

	 const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<h4>Tab Label</h4>
			<TextControl
				className={ "tab-label_input" }
				value={ tabLabel }
				onChange={onChangeTabLabel}
				placeholder="Add Tab Label"
				type="text"
			/>
			<h4>Tab Content</h4>
			<InnerBlocks
				template={ MY_TEMPLATE }
			/>
		</div>
	);
}
