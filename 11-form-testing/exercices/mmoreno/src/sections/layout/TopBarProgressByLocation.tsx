import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: {
		"0": "#fff",
		"1.0": "#3cff64",
	},
	shadowBlur: 5,
});

const TopBarProgressByLocation = () => {
	const [progress, setProgress] = useState(false);
	const [previousLocation, setPreviousLocation] = useState("");
	const location = useLocation();

	useEffect(() => {
		setPreviousLocation(location.pathname);
		setProgress(true);
		const hasClickedOnALinkToTheCurrentPage = location.pathname === previousLocation;
		if (hasClickedOnALinkToTheCurrentPage) {
			setPreviousLocation("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	useEffect(() => {
		setProgress(false);
	}, [previousLocation]);

	if (!progress) {
		return <></>;
	}

	return <TopBarProgress />;
};

export default TopBarProgressByLocation;
