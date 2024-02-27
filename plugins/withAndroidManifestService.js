const {
	AndroidConfig,
	withAndroidManifest,
	createRunOncePlugin,
} = require("expo/config-plugins");

/**
   * @type {import('./types').ManifestQueries}
   * what we are trying to add:
   * <queries>
      <package android:name="com.apple.android.music"/>
      <package android:name="com.spotify.music"/>
      <intent></intent>
        <action android:name="android.intent.action.VIEW"/>
        <category android:name="android.intent.category.BROWSABLE"/>
        <data android:scheme="https"/>
      </intent>
    </queries>
   */

const queries = {
	package: [
		{
			$: {
				"android:name": "com.instagram.android",
			},
		},
		{
			$: {
				"android:name": "com.whatsapp",
			},
		},
	],
	intent: [
		{
			action: {
				$: {
					"android:name": "com.instagram.share.ADD_TO_STORY",
				},
			},
			category: {
				$: {
					"android:name": "android.intent.category.DEFAULT",
				},
			},
			data: {
				$: {
					"android:data": "image/*",
				},
			},
		},
	],
};

/**
 * @param {import('@expo/config-plugins').ExportedConfig} config
 */
const withAndroidManifestService = (config) => {
	return withAndroidManifest(config, (config) => {
		config.modResults.manifest = {
			...config.modResults.manifest,
			//@ts-ignore
			queries,
		}; 
		return config;
	});
};

module.exports = createRunOncePlugin(
	withAndroidManifestService,
	"withAndroidManifestService",
	"1.0.0"
);
