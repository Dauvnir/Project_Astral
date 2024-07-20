import styled from "styled-components";
import useFetchSites from "../hooks/useFetchSites";
import PropTypes from "prop-types";
// import { BarLoader } from "react-spinners";
// import { useState } from "react";

// const Spinner = styled.div`
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	width: 100vw;
// 	height: 10rem;
// 	position: relative;
// 	padding: 1rem;
// 	z-index: 1;
// `;

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	z-index: 2;
	position: relative;
	width: 8rem;
	height: 12rem;
	border-radius: 10px;
	justify-self: center;
	color: white;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	&:hover {
		transform: scale(1.2);
	}
	@media (min-width: 1000px) {
		width: 9rem;
		height: 13rem;
	}
`;

const Img = styled.img`
	height: 100%;
	width: 100%;
	object-fit: contain;
	-webkit-filter: drop-shadow(12px 12px 25px rgba(0, 0, 0, 0.5));
	filter: url("data:image/svg+xml;utf8,<svg height='0' xmlns='http://www.w3.org/2000/svg'><filter id='drop-shadow'><feGaussianBlur in='SourceAlpha' stdDeviation='4'/><feOffset dx='12' dy='12' result='offsetblur'/><feFlood flood-color='rgba(0,0,0,0.5)'/><feComposite in2='offsetblur' operator='in'/><feMerge><feMergeNode/><feMergeNode in='SourceGraphic'/></feMerge></filter></svg>#drop-shadow");
	-ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#444')";
	filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#444')";
`;
const ScanlationList = ({ scanlationSiteHandle, scanlationHandler }) => {
	const uniqueSites = useFetchSites();

	const uniqueSitesHandle = (site) => () => {
		scanlationSiteHandle(site);
		scanlationHandler(false);
	};
	// if (isLoading) {
	// 	return (
	// 		<Spinner>
	// 			<BarLoader height={5} width={400} color="#d9d9d9" />;
	// 		</Spinner>
	// 	);
	// }
	return (
		<>
			{uniqueSites.map((site, index) => (
				<Wrap key={index} onClick={uniqueSitesHandle(site)}>
					<Img src={`/assets/scanlations/${site}.png`} alt={site} />
				</Wrap>
			))}
		</>
	);
};
ScanlationList.propTypes = {
	scanlationSiteHandle: PropTypes.func.isRequired,
	scanlationHandler: PropTypes.func,
};
export default ScanlationList;
