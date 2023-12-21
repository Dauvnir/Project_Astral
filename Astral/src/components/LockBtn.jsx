const LockBtn = () => {
	return (
		<div style={{ width: '56px', height: '56px', cursor: 'pointer' }}>
			<svg
				width='64'
				height='64'
				viewBox='0 0 64 64'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<g filter='url(#filter0_d_172_2059)'>
					<rect
						x='4.5'
						y='0.5'
						width='54.5333'
						height='54.5333'
						rx='9.5'
						fill='#1D2535'
						stroke='#AFBFD5'
					/>
					<path
						d='M18.7 23.6833C18.7 16.9179 24.1845 11.4333 30.9499 11.4333C37.7154 11.4333 43.1999 16.9179 43.1999 23.6833V32.6667H18.7V23.6833Z'
						fill='#E5E9F1'
					/>
					<path
						d='M23.6001 23.6833C23.6001 19.624 26.8908 16.3333 30.9501 16.3333C35.0094 16.3333 38.3001 19.624 38.3001 23.6832V31.0332H23.6001V23.6833Z'
						fill='#1D2535'
					/>
					<rect x='18.7' y='26.1333' width='24.5' height='17.9667' rx='3' fill='#E5E9F1' />
				</g>
				<defs>
					<filter
						id='filter0_d_172_2059'
						x='0'
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
						<feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_172_2059' />
						<feBlend
							mode='normal'
							in='SourceGraphic'
							in2='effect1_dropShadow_172_2059'
							result='shape'
						/>
					</filter>
				</defs>
			</svg>
		</div>
	);
};

export default LockBtn;
