import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { mobileImageID, mobileImageURL, tabletImageID, tabletImageURL, desktopImageID, desktopImageURL} = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			{ mobileImageID &&
				<img src={ mobileImageURL }	className={ `wp-image-${ mobileImageID } banner__mobile-img` }	alt="" />
			}
			{ tabletImageID &&
				<img src={ tabletImageURL }	className={ `wp-image-${ tabletImageID } banner__tablet-img` }	alt="" />
			}
			{ desktopImageID &&
				<img src={ desktopImageURL } className={ `wp-image-${ desktopImageID } banner__desktop-img` } alt="" />
			}
			<div className="inner-wrapper">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
