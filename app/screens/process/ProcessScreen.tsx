import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
	LayoutRectangle,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Dialog } from "@rneui/themed";
import { Formik } from "formik";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";

import { useGeneralStyles } from "app/assets";
import {
	Text,
	Card,
	ImageSelect,
	ProcessOperationResultModal,
	FullPageLoading,
} from "app/components";
import { SCREEN_WIDTH } from "app/config";
import { AppNavigation } from "app/navigation/type";
import { FalService } from "app/service";
import { useProcessStore } from "app/store";
import { InputTypes } from "app/types";

const ProcessScreen = ({
	navigation,
	route,
}: StackScreenProps<AppNavigation, "Process">) => {
	const { params } = route;
	const { model } = params;
	const [layout, setLayout] = useState<LayoutRectangle>(null);

	const {
		setModel,
		registerInput,
		processing,
		queueStatus,
		reset,
		setProcessing,
		setQueueStatus,
		setShowResult,
	} = useProcessStore();
	const { generalStyles, theme } = useGeneralStyles();
	const { styles } = useStyles(processScreenStyleSheet);

	const initialFormValues = useMemo(
		() =>
			Object.fromEntries(
				model.input.map((input) => [
					input.name,
					input.defaultValue,
					// {
					// 	...input,
					// 	value: input.defaultValue,
					// },
				])
			),
		[model.input]
	);
	const allImageInputs = model.input.filter((s) => s.type === InputTypes.image);
	useEffect(() => {
		navigation.setOptions({
			headerTitle: model.name,
			headerRight: () => (
				<TouchableOpacity style={generalStyles.f0}>
					<Feather name="info" size={24} color={theme.colors.text} />
				</TouchableOpacity>
			),
		});

		setModel(model);

		return () => {
			reset();
		};
	}, [model.version]);

	const predictFN = useCallback(
		async (input: typeof initialFormValues) => {
			try {
				setProcessing(true);
				const result = await FalService.predict(model, input, (data) => {
					setQueueStatus(data);
				});
				console.log("result", JSON.stringify(result));

				if (result.output?.image?.url) {
					await Image.prefetch(result.output?.image?.url, "memory-disk");
				}
				setProcessing(false);
				// @ts-ignore
				setShowResult(true, result);
				console.log("OUTPUT RESULT", JSON.stringify(result, null, 4));
			} catch (error) {
				console.log("predict error", error);
			} finally {
				setProcessing(false);
			}
		},
		[model]
	);

	return (
		<View style={[generalStyles.ph16, generalStyles.pv10, generalStyles.f1]}>
			<View
				style={[
					generalStyles.fdRow,
					generalStyles.f0,
					generalStyles.gap10,
					generalStyles.algiCenter,
					generalStyles.mb12,
				]}
			>
				<View style={generalStyles.f1}>
					<Text style={[generalStyles.lightBody1, styles.descriptionText]}>
						{model.description}
					</Text>
				</View>
			</View>

			<Formik
				initialValues={initialFormValues}
				validateOnChange
				validate={(values) => {
					const errors = {};
					const allKeys = Object.keys(initialFormValues);
					for (let i = 0; i < allKeys.length; i++) {
						const key = allKeys[i];
						const input = model.input.find((s) => s.name === key);

						if (!values[key] && input.required && !input.isHidden) {
							errors[key] = "This field is required";
						}
					}

					return errors;
				}}
				onSubmit={(values, helpers) => {
					predictFN(values);
				}}
			>
				{({
					setFieldValue,
					setFieldTouched,
					values,
					handleSubmit,
					errors,
					touched,
				}) => {
					return (
						<>
							<ScrollView
								style={[generalStyles.f1]}
								showsVerticalScrollIndicator={false}
								onLayout={(e) => {
									setLayout(e.nativeEvent.layout);
								}}
							>
								{React.Children.toArray(
									allImageInputs.map((input) => {
										const hasError = errors[input.name] && touched[input.name];
										const value = values[input.name] as string | null;
										return (
											<Card
												key={input.name}
												style={[
													styles.inputItem,
													generalStyles.p0,
													styles.getInputSize(allImageInputs.length),
												]}
											>
												<View
													style={[
														styles.imageCard,
														value && styles.noBackground,
														hasError && styles.errorBorderColor,
													]}
												>
													<ImageSelect
														text={input.hint}
														selectedImage={value}
														onImageSelect={(image) => {
															setFieldValue(
																input.name,
																image?.uri ? image.uri : null
															);
															setFieldTouched(input.name, true);
														}}
													/>
												</View>
											</Card>
										);
									})
								)}
							</ScrollView>
							<View style={generalStyles.f0}>
								<TouchableOpacity
									style={styles.createButton}
									onPress={() => handleSubmit()}
								>
									<Text
										style={[generalStyles.subHead1, generalStyles.textWhite]}
									>
										Generate
									</Text>
								</TouchableOpacity>
							</View>
						</>
					);
				}}
			</Formik>

			<ProcessOperationResultModal />
			<FullPageLoading visible={processing} />
		</View>
	);
};

export { ProcessScreen };

const processScreenStyleSheet = createStyleSheet((theme) => ({
	inputItem: {
		marginBottom: 12,
	},
	getInputSize: (itemCount: number) =>
		itemCount > 1
			? {
					minHeight: SCREEN_WIDTH * 0.75,
			  }
			: {
					minHeight: SCREEN_WIDTH * 1.3,
			  },
	descriptionText: {
		color: theme.colors.text,
	},

	imageCard: {
		flex: 1,
		backgroundColor: theme.colors.cardBg,
		borderRadius: 16,
		overflow: "hidden",
	},
	inputTitle: {
		color: theme.colors.text,
		alignItems: "center",
	},
	createButton: {
		backgroundColor: theme.colors.button,
		borderRadius: 12,
		paddingVertical: 16,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 12,
	},
	errorBorderColor: {
		borderColor: theme.colors.red,
		borderWidth: 2,
		borderStyle: "dashed",
	},
	noBackground: {
		backgroundColor: "transparent",
	},
}));

{
	/* <View
													style={[
														generalStyles.f0,
														generalStyles.fdRow,
														generalStyles.algiCenter,
													]}
												>
													<Text
														style={[
															generalStyles.f1,
															generalStyles.subHeadXL,
															styles.inputTitle,
														]}
														numberOfLines={1}
													>
														{input.hint}
														<Text style={{ color: theme.colors.red }}>
															{input.required ? "*" : ""}
														</Text>
													</Text>

													<View style={generalStyles.ml6}>
														<CustomTooltip
															containerStyle={[
																generalStyles.f0,
																generalStyles.fdRow,
															]}
															withOverlay
															popover={
																<Text style={generalStyles.f1}>
																	{input.description}
																</Text>
															}
														>
															<Feather
																name="info"
																size={24}
																color={theme.colors.text}
															/>
														</CustomTooltip>
													</View>
												</View> */
}
