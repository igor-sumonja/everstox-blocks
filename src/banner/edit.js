import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, Button } from '@wordpress/components';
import './editor.scss';

export default function Edit({attributes, setAttributes}) {

	const {mobileImageID, mobileImageURL, tabletImageID,  tabletImageURL, desktopImageID,  desktopImageURL } = attributes;

	/* Set selected image for specific size passed as argument */
	const onUpdateImage = ( image, size ) => {
		// set attributes names based on size
		const idAttr = `${size}ImageID`;
		const urlAttr = `${size}ImageURL`;
		setAttributes( {
			[idAttr]: image.id,
			[urlAttr]: image.url
		} );
	};


	const ALLOWED_MEDIA_TYPES = [ 'image' ];

	function MyMediaUploader({ updateFn, selectedImageID, buttonLabel }) {
		return (
			<MediaUploadCheck>
				<MediaUpload
					title={ __( 'Background image', 'image-selector-example' ) }
					onSelect={ updateFn }
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					value={ selectedImageID }
					render={ ( { open } ) => (
						<Button
							className={ 'editor-post-featured-image__toggle' }
							onClick={ open }
							text={ buttonLabel }
						>
						</Button>
					) }
				/>
			</MediaUploadCheck>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Set images', 'everstox' ) }
				>

					<PanelRow>
						<MyMediaUploader
							selectedImageID={mobileImageID}
							buttonLabel={ __( 'Set mobile background image', 'everstox' ) }
							updateFn={(media) => onUpdateImage(media, 'mobile')}
						/>
						{ mobileImageID && <div><img src={mobileImageURL} /></div> }
					</PanelRow>
					<PanelRow>
						<MyMediaUploader
							selectedImageID={tabletImageID}
							buttonLabel={ __( 'Set tablet background image', 'everstox' ) }
							updateFn={(media) => onUpdateImage(media, 'tablet')}
						/>
						{ tabletImageID && <div><img src={tabletImageURL} /></div> }
					</PanelRow>
					<PanelRow>
						<MyMediaUploader
							selectedImageID={desktopImageID}
							buttonLabel={ __( 'Set desktop background image', 'everstox' ) }
							updateFn={(media) => onUpdateImage(media, 'desktop')}
						/>
						{ desktopImageID && <div><img src={desktopImageURL} /></div> }
					</PanelRow>

				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ mobileImageID &&
					<img src={ mobileImageURL }	className={ `wp-image-${ mobileImageID } banner__mobile-img` } 	/>
				}
				{ tabletImageID &&
					<img src={ tabletImageURL }	className={ `wp-image-${ tabletImageID } banner__tablet-img` } 	/>
				}
				{ desktopImageID &&
					<img src={ desktopImageURL } className={ `wp-image-${ desktopImageID } banner__desktop-img` }  />
				}
				<div className='inner-wrapper'>
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
