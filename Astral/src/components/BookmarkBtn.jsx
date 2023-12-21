const BookmarkBtn = () => {
	return (
		<div style={{ width: '56px', height: '56px', cursor: 'pointer', marginInline: '-.45rem 1rem' }}>
			<svg
				width='64'
				height='64'
				viewBox='0 0 64 64'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				filter='filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'>
				<g filter='url(#filter0_d_172_2073)'>
					<rect
						x='4.9668'
						y='0.5'
						width='54.5333'
						height='54.5333'
						rx='9.5'
						fill='#1D2535'
						stroke='#AFBFD5'
					/>
				</g>
				<path
					d='M31.8294 31.399L21.3 45.8329V11.9333H43.1667V45.8329L32.6373 31.399L32.2334 30.8452L31.8294 31.399Z'
					stroke='#75026A'
				/>
				<defs>
					<filter
						id='filter0_d_172_2073'
						x='0.466797'
						y='0'
						width='63.5332'
						height='63.5332'
						filterUnits='userSpaceOnUse'
						colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feColorMatrix
							in='SourceAlpha'
							type='matrix'
							values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
							result='hardAlpha'
						/>
						<feOffset dy='4' />
						<feGaussianBlur stdDeviation='2' />
						<feComposite in2='hardAlpha' operator='out' />
						<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
						<feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_172_2073' />
						<feBlend
							mode='normal'
							in='SourceGraphic'
							in2='effect1_dropShadow_172_2073'
							result='shape'
						/>
					</filter>
				</defs>
			</svg>
		</div>
	);
};

export default BookmarkBtn;
