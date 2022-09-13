/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

const MY_TEMPLATE = [
	[ 'core/paragraph' ]
];

 export default function Edit( props ) {

	const {
		attributes: { tabLabel },
		setAttributes
	} = props;

 	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<h4>Tab Label</h4>
			<TextControl
				className={ "tab-label_input" }
				value={ tabLabel }
				onChange={ tabLabel => setAttributes({ tabLabel }) }
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
