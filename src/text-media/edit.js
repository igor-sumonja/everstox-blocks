import classnames from "classnames";
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { pullRight, pullLeft } from '@wordpress/icons';
import { Toolbar, PanelBody, PanelRow, ToggleControl, } from '@wordpress/components';
import { InnerBlocks, useBlockProps, BlockControls, BlockVerticalAlignmentControl, InspectorControls } from '@wordpress/block-editor';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'everstox/column' ];

const MY_TEMPLATE = [
	[ 'everstox/column', {},
		[
			[ 'core/heading', { level: 4, placeholder: 'Type here..' } ],
			[ 'core/paragraph', { placeholder: 'Type here...' } ],
	 	]
	],
	[ 'everstox/column', {}, [ [ 'core/image' ] ] ]
];


export default function Edit({attributes, setAttributes}) {

	const { verticalAlignment, mediaLeftSide, reverseOnDesktop } = attributes;

	const toolbarControls = [
		{
			icon: pullRight,
			title: __( 'Media col position', 'everstox' ),
			isActive: mediaLeftSide === false,
			onClick: () => setAttributes( { mediaLeftSide: false } ),
		},
		{
			icon: pullLeft,
			title: __( 'Media col position', 'everstox' ),
			isActive: mediaLeftSide === true,
			onClick: () => setAttributes( { mediaLeftSide: true } ),
		},
	];

	const classes = classnames( {
		[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		'has-col-reversed': mediaLeftSide,
		'is-large-view-reversed': reverseOnDesktop
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
					title={ __( 'Ordering', 'everstox' ) }
				>
					<PanelRow>
						<ToggleControl
							label={ __( 'Media swap on desktop', 'everstox' ) }
							help={reverseOnDesktop ? "Yes" : "No"}
							checked={reverseOnDesktop}
							onChange={() => setAttributes({ reverseOnDesktop: !reverseOnDesktop })}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<Toolbar controls={ toolbarControls } />
				<BlockVerticalAlignmentControl
					onChange={ alignmentChange }
					value={ verticalAlignment }
				/>
			</BlockControls>
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ MY_TEMPLATE }
				/>
			</div>
		</>
	);
}
