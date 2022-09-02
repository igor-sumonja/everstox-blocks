import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { mobileImageID, mobileImageURL, tabletImageID, tabletImageURL, desktopImageID, desktopImageURL} = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			{ mobileImageID &&
				<img src={ mobileImageURL }	className={ `wp-image-${ mobileImageID } banner__mobile-img` }	/>
			}
			{ tabletImageID &&
				<img src={ tabletImageURL }	className={ `wp-image-${ tabletImageID } banner__tablet-img` }	/>
			}
			{ desktopImageID &&
				<img src={ desktopImageURL } className={ `wp-image-${ desktopImageID } banner__desktop-img` } />
			}
			<div className="inner-wrapper">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
