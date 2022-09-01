import classnames from 'classnames';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { verticalAlignment, columns } = attributes;

	const classes = classnames( {
		[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		[ `has-${ columns }-columns` ]: columns,
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
