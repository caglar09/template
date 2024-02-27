import { View } from "react-native";
import React from "react";

import { ExampleProps } from "./type";
import { Text } from "../text";

const Example: React.FC<ExampleProps> = () => {
	return (
		<View>
			<Text>Example</Text>
		</View>
	);
};

export { Example };
