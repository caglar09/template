import { createStyleSheet, useStyles } from "react-native-unistyles";
import { FontNames } from "../fonts";

const styleSheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		height: "100%",
		width: "100%",
		backgroundColor: theme.colors.background,
	},
	// #region Flex
	f0: {
		flex: 0,
	},
	f1: {
		flex: 1,
	},
	f2: {
		flex: 2,
	},
	f3: {
		flex: 3,
	},
	f4: {
		flex: 4,
	},
	f5: {
		flex: 5,
	},
	f6: {
		flex: 6,
	},
	f7: {
		flex: 7,
	},
	f8: {
		flex: 8,
	},
	f9: {
		flex: 9,
	},
	f10: {
		flex: 10,
	},
	f11: {
		flex: 11,
	},
	f12: {
		flex: 12,
	},
	fdRow: {
		flexDirection: "row",
	},
	fdRowReverse: {
		flexDirection: "row-reverse",
	},
	fdCol: {
		flexDirection: "column",
	},
	fdColReverse: {
		flexDirection: "column-reverse",
	},
	fWrap: {
		flexWrap: "wrap",
	},
	jcStart: {
		justifyContent: "flex-start",
	},
	jcCenter: {
		justifyContent: "center",
	},
	jcBtw: {
		justifyContent: "space-between",
	},
	jcEnd: {
		justifyContent: "flex-end",
	},
	jcSArround: {
		justifyContent: "space-around",
	},
	jcSEvenly: {
		justifyContent: "space-evenly",
	},
	algiCenter: {
		alignItems: "center",
	},
	algiStrech: {
		alignItems: "stretch",
	},
	algiStart: {
		alignItems: "flex-start",
	},
	algiEnd: {
		alignItems: "flex-end",
	},
	algsCenter: {
		alignSelf: "center",
	},
	algsEnd: {
		alignSelf: "flex-end",
	},
	algsStart: {
		alignSelf: "flex-start",
	},
	algsStretch: {
		alignSelf: "stretch",
	},
	algcCenter: {
		alignContent: "center",
	},
	// #endregion
	hAuto: {
		height: "auto",
	},
	textCenter: {
		textAlign: "center",
	},
	textVerticalCenter: {
		textAlignVertical: "center",
	},
	textRight: {
		textAlign: "right",
	},
	textLeft: {
		textAlign: "left",
	},

	positionAbsolute: {
		position: "absolute",
	},
	positionRelative: {
		position: "relative",
	},
	br3: {
		borderRadius: 3,
	},
	br6: {
		borderRadius: 6,
	},
	br14: {
		borderRadius: 14,
	},

	fajCenterItem: {
		alignItems: "center",
		justifyContent: "center",
	},
	// #region margins
	m0: {
		margin: 0,
	},
	p0: {
		padding: 0,
	},
	mb0: {
		marginBottom: 0,
	},
	mt0: {
		marginTop: 0,
	},
	mtn10: { marginTop: -10 },
	mr0: {
		marginRight: 0,
	},
	ml0: {
		marginLeft: 0,
	},
	pb0: {
		paddingBottom: 0,
	},
	pb5: { paddingBottom: 5 },
	pt0: {
		paddingTop: 0,
	},

	pr0: {
		paddingRight: 0,
	},
	pr5: {
		paddingRight: 5,
	},
	pl0: {
		paddingLeft: 0,
	},
	mt3: {
		marginTop: 3,
	},
	mt5: {
		marginTop: 5,
	},
	mt6: {
		marginTop: 6,
	},
	mt8: {
		marginTop: 8,
	},
	mt10: {
		marginTop: 10,
	},
	mt12: {
		marginTop: 12,
	},
	mt14: {
		marginTop: 14,
	},
	mt16: {
		marginTop: 16,
	},
	mtn16: {
		marginTop: -16,
	},
	mt20: {
		marginTop: 20,
	},
	mt22: {
		marginTop: 22,
	},
	mb1: {
		marginBottom: 1,
	},
	mb8: {
		marginBottom: 8,
	},
	mb10: {
		marginBottom: 10,
	},
	mb12: {
		marginBottom: 12,
	},
	mb14: {
		marginBottom: 14,
	},
	mb15: {
		marginBottom: 15,
	},
	mb16: {
		marginBottom: 16,
	},
	mb20: {
		marginBottom: 20,
	},
	mb5: {
		marginBottom: 5,
	},
	mr5: {
		marginRight: 5,
	},
	mr6: {
		marginRight: 6,
	},
	mr7half5: {
		marginRight: 7.5,
	},
	mr8: {
		marginRight: 8,
	},
	mr10: {
		marginRight: 10,
	},
	mr12: {
		marginRight: 12,
	},
	mr15: {
		marginRight: 15,
	},
	mr16: {
		marginRight: 16,
	},
	mr20: { marginRight: 20 },
	ml8: {
		marginLeft: 8,
	},
	ml10: {
		marginLeft: 10,
	},
	ml12: {
		marginLeft: 12,
	},
	ml15: {
		marginLeft: 15,
	},
	ml16: {
		marginLeft: 16,
	},
	ml3: { marginLeft: 3 },
	ml5: {
		marginLeft: 5,
	},
	ml6: {
		marginLeft: 6,
	},
	ml7: {
		marginLeft: 7,
	},
	ml7half5: {
		marginLeft: 7.5,
	},
	mln5: {
		marginLeft: -5,
	},
	mh0: {
		marginHorizontal: 0,
	},
	mh5: {
		marginHorizontal: 5,
	},
	mh6: {
		marginHorizontal: 6,
	},
	mh10: {
		marginHorizontal: 10,
	},
	mh12: {
		marginHorizontal: 12,
	},
	mh16: {
		marginHorizontal: 16,
	},
	mh50: {
		marginHorizontal: 50,
	},
	mhn15: {
		marginHorizontal: -15,
	},
	mv0: {
		marginVertical: 0,
	},
	mv10: {
		marginVertical: 10,
	},
	mv16: {
		marginVertical: 16,
	},

	mt30: {
		marginTop: 30,
	},
	mt40: {
		marginTop: 40,
	},
	mb30: {
		marginBottom: 30,
	},
	mb40: {
		marginBottom: 40,
	},
	mb100: {
		marginBottom: 100,
	},
	mr30: {
		marginRight: 30,
	},
	ml30: {
		marginLeft: 30,
	},
	ml20: {
		marginLeft: 20,
	},
	ml25: {
		marginLeft: 25,
	},
	mh30: {
		marginHorizontal: 30,
	},
	mv30: {
		marginVertical: 30,
	},
	pt6: {
		paddingTop: 6,
	},
	p12: { padding: 12 },
	pt10: {
		paddingTop: 10,
	},
	pt15: {
		paddingTop: 15,
	},
	pt16: {
		paddingTop: 16,
	},
	pt20: {
		paddingTop: 20,
	},
	pb10: {
		paddingBottom: 10,
	},
	pb12: {
		paddingBottom: 12,
	},
	pb16: {
		paddingBottom: 16,
	},
	pb14: {
		paddingBottom: 14,
	},
	pr7half5: {
		paddingRight: 7.5,
	},
	pr10: {
		paddingRight: 10,
	},
	pr12: {
		paddingRight: 12,
	},
	pr16: {
		paddingRight: 16,
	},
	pr20: {
		paddingRight: 20,
	},
	plUnset: {
		paddingLeft: undefined,
	},
	pl6: {
		paddingLeft: 6,
	},
	pl7: {
		paddingLeft: 7,
	},
	pl7half5: {
		paddingLeft: 7.5,
	},
	pl9: {
		paddingLeft: 9,
	},
	pl10: {
		paddingLeft: 10,
	},
	pl12: {
		paddingLeft: 12,
	},
	pl16: {
		paddingLeft: 16,
	},
	pl20: {
		paddingLeft: 20,
	},
	ph0: {
		paddingHorizontal: 0,
	},
	ph5: {
		paddingHorizontal: 5,
	},
	ph6: {
		paddingHorizontal: 6,
	},
	ph7: {
		paddingHorizontal: 7,
	},
	ph10: {
		paddingHorizontal: 10,
	},
	ph12: {
		paddingHorizontal: 12,
	},
	ph15: {
		paddingHorizontal: 15,
	},
	ph16: {
		paddingHorizontal: 16,
	},
	ph20: {
		paddingHorizontal: 20,
	},
	pv0: {
		paddingVertical: 0,
	},
	pv10: {
		paddingVertical: 10,
	},
	pv12: {
		paddingVertical: 12,
	},
	pv14: {
		paddingVertical: 14,
	},
	pv15: {
		paddingVertical: 15,
	},
	pv16: {
		paddingVertical: 16,
	},
	pv20: {
		paddingVertical: 20,
	},
	pv2: {
		paddingVertical: 2,
	},
	pv5: {
		paddingVertical: 5,
	},
	pv7: {
		paddingVertical: 7,
	},
	pt30: {
		paddingTop: 30,
	},
	pb20: {
		paddingBottom: 20,
	},
	pb30: {
		paddingBottom: 30,
	},
	pb37: {
		paddingBottom: 37,
	},
	pb40: {
		paddingBottom: 40,
	},
	pb50: {
		paddingBottom: 50,
	},
	pb70: {
		paddingBottom: 70,
	},
	pb120: {
		paddingBottom: 120,
	},
	pb150: {
		paddingBottom: 150,
	},
	pb180: {
		paddingBottom: 180,
	},
	pb210: { paddingBottom: 210 },
	pr30: {
		paddingRight: 30,
	},
	pl30: {
		paddingLeft: 30,
	},
	ph30: {
		paddingHorizontal: 30,
	},
	pv30: {
		paddingVertical: 30,
	},
	pvNull: {
		paddingVertical: undefined,
	},
	phNull: {
		paddingHorizontal: undefined,
	},
	gap10: {
		gap: 10,
	},
	gap20: {
		gap: 20,
	},
	// #endregion
	zIndex0: {
		zIndex: 0,
	},
	zIndex1: {
		zIndex: 1,
	},
	opacityHalf: {
		opacity: 0.5,
	},
	opacityFull: {
		opacity: 1,
	},
	hitSlop10: {
		top: 10,
		bottom: 10,
		right: 10,
		left: 10,
	},
	hitSlop32: {
		top: 32,
		bottom: 32,
		right: 32,
		left: 32,
	},
	mb3: { marginBottom: 3 },
	dNone: { display: "none" },
	dFlex: { display: "flex" },
	aspectRatio1: {
		aspectRatio: 1,
	},
	flexGrow1: { flexGrow: 1 },
	borderTop0: {
		borderTopWidth: 0,
	},
	borderBottom0: {
		borderBottomWidth: 0,
	},
	mxWidth120: {
		maxWidth: 120,
	},
	bRadius4: {
		borderRadius: 4,
	},
	overflowHidden: {
		overflow: "hidden",
	},
	lineHeightNull: {
		lineHeight: undefined,
	},
	lineHeight24: {
		lineHeight: 24,
	},
	wNull: {
		width: undefined,
	},
	mxHNull: {
		maxHeight: undefined,
	},
	mnHNull: {
		minHeight: undefined,
	},

	borderRadius0: { borderRadius: 0 },
	borderRadius6: { borderRadius: 6 },
	borderRadiusTopLeft0: { borderTopLeftRadius: 0 },
	borderRadiusTopRight0: { borderTopRightRadius: 0 },
	borderRadiusTopLeft6: { borderTopLeftRadius: 6 },
	borderRadiusTopRight6: { borderTopRightRadius: 6 },
	borderRadiusBottomLeft0: { borderBottomLeftRadius: 0 },
	borderRadiusBottomRight0: { borderBottomRightRadius: 0 },
	borderRadiusBottomLeft6: { borderBottomLeftRadius: 6 },
	borderRadiusBottomRight6: { borderBottomRightRadius: 6 },
	borderRadiusBottomLeft15: { borderBottomLeftRadius: 15 },
	borderRadiusBottomRight15: { borderBottomRightRadius: 15 },
	borderRadiusTopLeft15: { borderTopLeftRadius: 15 },
	borderRadiusTopRight15: { borderTopRightRadius: 15 },

	fs12: {
		fontSize: 12,
	},
	fs13: {
		fontSize: 13,
	},
	fs14: {
		fontSize: 14,
	},
	fs15: {
		fontSize: 15,
	},
	fs16: {
		fontSize: 16,
	},
	fs17: {
		fontSize: 17,
	},
	fs18: {
		fontSize: 18,
	},
	fs20: {
		fontSize: 20,
	},
	fs24: {
		fontSize: 24,
	},

	textWhite: {
		color: theme.colors.white,
	},
	// #region Fonts

	headXL: {
		fontSize: 32,
		fontWeight: "700",
		fontFamily: FontNames.bold,
	},
	head1: {
		fontSize: 28,
		fontWeight: "700",
		fontFamily: FontNames.bold,
	},
	head2: {
		fontSize: 24,
		fontWeight: "700",
		fontFamily: FontNames.bold,
	},
	head3: {
		fontSize: 22,
		fontWeight: "700",
		fontFamily: FontNames.bold,
	},
	head4: {
		fontSize: 20,
		fontWeight: "700",
		fontFamily: FontNames.bold,
	},
	head5: {
		fontSize: 18,
		fontWeight: "700",
		fontFamily: FontNames.bold,
	},

	subHeadXXL: {
		fontSize: 20,
		fontWeight: "500",
		fontFamily: FontNames.medium,
	},
	subHeadXL: {
		fontSize: 18,
		fontWeight: "500",
		fontFamily: FontNames.medium,
	},
	subHead1: {
		fontSize: 16,
		fontWeight: "500",
		fontFamily: FontNames.medium,
	},
	subHead15: {
		fontSize: 15,
		fontWeight: "500",
		fontFamily: FontNames.medium,
	},
	subHead2: {
		fontSize: 14,
		fontWeight: "500",
		fontFamily: FontNames.medium,
	},
	subHead3: {
		fontSize: 12,
		fontWeight: "500",
		fontFamily: FontNames.medium,
	},

	bodyXL: {
		fontSize: 18,
		fontWeight: "400",
		fontFamily: FontNames.regular,
	},
	body1: {
		fontSize: 16,
		fontWeight: "400",
		fontFamily: FontNames.regular,
	},
	body2: {
		fontSize: 14,
		fontWeight: "400",
		fontFamily: FontNames.regular,
	},
	body3: {
		fontSize: 12,
		fontWeight: "400",
		fontFamily: FontNames.regular,
	},

	lightBodyXL: {
		fontSize: 18,
		fontWeight: "300",
		fontFamily: FontNames.light,
	},
	lightBody1: {
		fontSize: 16,
		fontWeight: "300",
		fontFamily: FontNames.light,
	},
	lightBody2: {
		fontSize: 14,
		fontWeight: "300",
		fontFamily: FontNames.light,
	},
	lightBody3: {
		fontSize: 12,
		fontWeight: "300",
		fontFamily: FontNames.light,
	},

	iconFont: {
		fontSize: 72,
		fontWeight: "400",
		fontFamily: FontNames.regular,
	},
	w100Pe: {
		width: "100%",
	},
	h100Pe: {
		height: "100%",
	},
	// #endregion
}));

export const useGeneralStyles = () => {
	const { styles: generalStyles, ...rest } = useStyles(styleSheet);
	return { generalStyles, ...rest };
};
