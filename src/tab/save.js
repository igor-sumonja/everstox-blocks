import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {

	const blockProps = useBlockProps.save( {
		className: 'tab-panel',
		role: 'tabpanel',
		tabIndex: 0
	} );

	return (
		<div { ...blockProps } >
			<InnerBlocks.Content />
		</div>
	);
}
