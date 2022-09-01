import classnames from 'classnames';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { verticalAlignment, mediaLeftSide, reverseOnDesktop } = attributes;

	const classes = classnames( {
		[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		'has-col-reversed': mediaLeftSide,
		'is-large-view-reversed': reverseOnDesktop
	} );

	const blockProps = useBlockProps.save( {
		className: classes,
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
