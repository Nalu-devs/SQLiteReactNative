import Estilos from './styles/Estilos.js';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { initDB, adicionarPessoa, listarPessoas, deletarPessoa } from './database';
import PessoaItem from './components/PessoaItem';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pessoas, setPessoas] = useState([]);

  async function carregarPessoas() {
    const lista = await listarPessoas();
    setPessoas(lista);
  };
  
  const prepararApp = async () => {
    await initDB();
    await carregarPessoas();
  };

  async function handleAdicionar() {
    //O trim tira os espaços vazios no inicio e fim do texto
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    await adicionarPessoa(nome, email);
    setNome('');
    setEmail('');
    await carregarPessoas();
  };

  async function handleDeletar(id) {
    await deletarPessoa(id);
    await carregarPessoas();
  };

  //useEffect é um hook do react
  useEffect(() => {
    prepararApp();
  }, []);//Esta vazio pois não tem mais nada que faça ele ser alterado

  return (
    <SafeAreaProvider>
      <SafeAreaView style={Estilos.safeAreaViewContainer}>
        <Text style={Estilos.textoTitulo}>
          Cadastro de Pessoas (SQLite)
        </Text>

        <View style={Estilos.camposCadastroContainer}>
          <TextInput
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            style={Estilos.campoTexto}
          />
          <TextInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={Estilos.campoTexto}
          />
          <Button title="Adicionar" onPress={handleAdicionar} />
        </View>

        <FlatList //criar lista de registros
          data={pessoas} //dados 
          keyExtractor={(item) => item.id.toString()}//chave para se referir a cada registro
          renderItem={({ item }) => ( //rederinzar itens para cada item mostra PessoaItem
            <PessoaItem id={item.id} nome={item.nome} email={item.email} onDelete={handleDeletar} />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}