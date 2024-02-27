import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useGeneralStyles } from "app/assets";
import { ModelItem } from "app/components";
import { AIModels } from "app/config";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AppNavigation } from "app/navigation/type";
import { StackNavigationProp } from "@react-navigation/stack";

const HomeScreen = () => {
	const navigation = useNavigation<StackNavigationProp<AppNavigation>>();
	const { generalStyles } = useGeneralStyles();

	useEffect(() => {
		navigation.setOptions({
			headerLeftContainerStyle: generalStyles.pl0,
		});
	}, []);

	return (
		<View style={[generalStyles.container]}>
			<FlatList
				data={AIModels}
				keyExtractor={(item) => item.version}
				contentContainerStyle={{ paddingBottom: 105 }}
				renderItem={({ item, index }) => (
					<ModelItem
						item={item}
						index={index}
						onPress={() => navigation.navigate("Process", { model: item })}
					/>
				)}
			/>
		</View>
	);
};

export { HomeScreen };
