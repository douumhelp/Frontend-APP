import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const Requisicao = () => {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = () => {
		console.log('Nome:', nome);
		console.log('Email:', email);
	};

	return (
		<View>
			<Text>Cadastro</Text>
			<TextInput
				placeholder="Nome"
				value={nome}
				onChangeText={setNome}
			/>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
			/>
			<Button title="Enviar" onPress={handleSubmit} />
		</View>
	);
};

export default Requisicao;
