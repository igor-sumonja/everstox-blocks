import lodash from "lodash";
import classnames from "classnames";
const { times } = lodash;
import { __ } from '@wordpress/i18n';
const { createBlock } = wp.blocks;
const { useSelect, useDispatch } = wp.data;
import { PanelBody, PanelRow, RangeControl } from '@wordpress/components';
import { InnerBlocks, useBlockProps, BlockControls, BlockVerticalAlignmentControl, InspectorControls } from '@wordpress/block-editor';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'everstox/column' ];

const MY_TEMPLATE = [
	[ 'everstox/column' ],
	[ 'everstox/column' ]
];


export default function Edit({attributes, setAttributes, clientId}) {

	const innerBlocks = useSelect((select) => select('core/block-editor').getBlock(clientId).innerBlocks);
	const { replaceInnerBlocks } = useDispatch("core/block-editor");

	const { verticalAlignment, columns } = attributes;

	const classes = classnames( {
		[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		[ `has-${ columns }-columns` ]: columns,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	// Change handler to set Block `attributes`
	const alignmentChange = ( alignment ) =>
		setAttributes( { verticalAlignment: alignment } );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Column settings', 'everstox' ) }
				>
					<PanelRow>
						<RangeControl
							label="Columns"
							value={ innerBlocks.length }
							min={ 2 }
							max={ 3 }
							onChange={ ( count ) => {

								let inner_columns = innerBlocks;

								if (innerBlocks.length < count) {
									inner_columns = [
										...inner_columns,
										// Invokes the iteratee n times returning the array
										...times(count - innerBlocks.length, () =>
											createBlock("everstox/column")
										)
									];
								} else if (innerBlocks.length > count) {
									inner_columns = inner_columns.slice(0, count);
								}

								replaceInnerBlocks(clientId, inner_columns, false);
							} }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<BlockVerticalAlignmentControl
					onChange={ alignmentChange }
					value={ verticalAlignment }
				/>
			</BlockControls>
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ MY_TEMPLATE }
					renderAppender={ () => { return innerBlocks.length < 3 ? <InnerBlocks.ButtonBlockAppender /> : null }
				}
				/>
			</div>
		</>
	);
}
