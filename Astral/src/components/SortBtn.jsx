const SortBtn = () => {
	return (
		<div style={{ width: '56px', height: '56px', cursor: 'pointer' }}>
			<svg
				width='64'
				height='64'
				viewBox='0 0 64 64'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<rect
					x='0.733398'
					y='0.5'
					width='54.5333'
					height='54.5333'
					rx='9.5'
					fill='#1D2535'
					stroke='#AFBFD5'
				/>
				<circle cx='15.7501' cy='40.0165' r='6.85' stroke='#E5E9F1' />
				<circle cx='38.6166' cy='40.0165' r='6.85' stroke='#E5E9F1' />
				<circle cx='15.7501' cy='15.5167' r='6.85' stroke='#E5E9F1' />
				<circle cx='38.6166' cy='15.5167' r='6.85' stroke='#E5E9F1' />
			</svg>
		</div>
	);
};

export default SortBtn;
