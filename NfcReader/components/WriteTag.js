import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';


export const Write = () => {

	const [text, setText] = useState(null);


	async function writeNdef() {
		let result = false;

		try {
			// STEP 1
			await NfcManager.requestTechnology(NfcTech.Ndef);

			const bytes = Ndef.encodeMessage([Ndef.textRecord(text)]);

			if (bytes) {
				await NfcManager.ndefHandler // STEP 2
					.writeNdefMessage(bytes); // STEP 3
				result = true;
			}
		} catch (ex) {
			console.warn(ex);
		} finally {
			// STEP 4
			NfcManager.cancelTechnologyRequest();
		}

		return result;
	}


	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Enter your id"
				style={styles.input}
				onChangeText={setText}
				value={text}
			/>
			<Button
				disabled={!text}
				onPress={writeNdef}
				title="Link id to NFC Tag"
				color="#4EC5F1"
			/>
			{!!text && (<Text>{`identifiant: ${text}`}</Text>)}
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
