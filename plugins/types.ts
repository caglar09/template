// types.ts
export type ManifestQueries = {
	package: {
		$: {
			"android:name": string;
		};
	}[];
	intent: {
		action: {
			$: {
				"android:name": string;
			};
		};
		category: {
			$: {
				"android:name": string;
			};
		};
		data: {
			$:
				| {
						"android:scheme": string;
				  }
				| {
						"android:data": string;
				  };
		};
	}[];
};
