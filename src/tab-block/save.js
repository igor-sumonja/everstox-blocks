import { InnerBlocks } from '@wordpress/block-editor';
const { RawHTML } = wp.element;
import { useBlockProps } from '@wordpress/block-editor';

export default function save({attributes}) {
	const { tabLabelsArray	} = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps } >
			<ul className="tab-labels" role="tablist" aria-label="tabbed content">
				{tabLabelsArray.map((label, i) => {
					return ( <li className={i == 0 ? "tab-label active" : "tab-label"}
								 style={{backgroundColor: attributes.tabColor}}
								 role="tab" aria-selected={i == 0 ? "true" : "false"}
								 aria-controls={label} tabindex="0">
						{label}
					</li>
					);
				})}
			</ul>
			<div className="tab-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
