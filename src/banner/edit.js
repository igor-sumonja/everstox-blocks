import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps, MediaUpload, MediaUploadCheck, InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import { PanelBody, PanelRow, Button } from '@wordpress/components';
import './editor.scss';



export default function Edit({attributes, setAttributes}) {

	const { mobileImageID, mobileImageURL, tabletImageID,  tabletImageURL, desktopImageID,  desktopImageURL} = attributes;

	const onUpdateImageMobile = ( image ) => {
		console.log('onUpdateImageMobile')
		setAttributes( {
			mobileImageID: image.id,
			mobileImageURL: image.url,
		} );
	};
	const onUpdateImageTablet = ( image ) => {
		console.log('onUpdateImageTablet')
		setAttributes( {
			tabletImageID: image.id,
			tabletImageURL: image.url,
		} );
	};
	const onUpdateImageDesktop = ( image ) => {
		setAttributes( {
			desktopImageID: image.id,
			desktopImageURL: image.url,
		} );
	};


	const ALLOWED_MEDIA_TYPES = [ 'image' ];

	function MyMediaUploader({ updateFn, blockAttribute, buttonLabel }) {
		return (
			<MediaUploadCheck>
				<MediaUpload
					title={ __( 'Background image', 'image-selector-example' ) }
					onSelect={ updateFn }
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					value={ blockAttribute }
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

						{
							mobileImageID ?
								<>
									<MyMediaUploader
										blockAttribute={mobileImageID}
										buttonLabel={ __( 'Replace mobile background image', 'everstox' ) }
										updateFn={onUpdateImageMobile}
									/>
									<div>
										<img
											src={mobileImageURL}
										/>
									</div>
								</>
								:
								<MyMediaUploader
									blockAttribute={mobileImageID}
									buttonLabel={ __( 'Set mobile background image', 'everstox' ) }
									updateFn={onUpdateImageMobile}
								/>
						}


					</PanelRow>
					<PanelRow>

						{
							tabletImageID ?
								<>
									<MyMediaUploader
										blockAttribute={tabletImageID}
										buttonLabel={ __( 'Replace tablet background image', 'everstox' ) }
										updateFn={onUpdateImageTablet}
									/>
									<div>
										<img
											src={tabletImageURL}
										/>
									</div>
								</>
								:
								<MyMediaUploader
									blockAttribute={tabletImageID}
									buttonLabel={ __( 'Set tablet background image', 'everstox' ) }
									updateFn={onUpdateImageTablet}
								/>
						}


					</PanelRow>
					<PanelRow>

						{
							desktopImageID ?
								<>
									<MyMediaUploader
										blockAttribute={desktopImageID}
										buttonLabel={ __( 'Replace desktop background image', 'everstox' ) }
										updateFn={onUpdateImageDesktop}
									/>
									<div>
										<img
											src={desktopImageURL}
										/>
									</div>
								</>
								:
								<MyMediaUploader
									blockAttribute={desktopImageID}
									buttonLabel={ __( 'Set desktop background image', 'everstox' ) }
									updateFn={onUpdateImageDesktop}
								/>
						}


					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ mobileImageID && <img
					src={ mobileImageURL }
					className={ `wp-image-${ mobileImageID } banner__mobile-img` }
				/> }
				{ tabletImageID && <img
					src={ tabletImageURL }
					className={ `wp-image-${ tabletImageID } banner__tablet-img` }
				/> }
				{ desktopImageID && <img
					src={ desktopImageURL }
					className={ `wp-image-${ desktopImageID } banner__desktop-img` }
				/> }
				<div className='inner-wrapper'>
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
