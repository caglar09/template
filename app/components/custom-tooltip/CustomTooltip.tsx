import { View, Text } from "react-native";
import React, { useState } from "react";
import { Tooltip, TooltipProps } from "@rneui/themed";

const CustomTooltip = ({
	children,
	...rest
}: TooltipProps & {
	children: React.ReactElement;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<Tooltip
			{...rest}
			visible={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
		>
			{children}
		</Tooltip>
	);
};

export { CustomTooltip };
