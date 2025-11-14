import Estilos from './styles/Estilos.js';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { initDB, adicionarPet, listarPets, deletarPet } from './database';
import PetItem from './components/PetItem';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [nomeTutor, setNomeTutor] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nomePet, setNomePet] = useState('');
  const [pet, setPet] = useState([]);

  async function carregarPet() {
    const lista = await listarPets();
    setPet(lista);
  };
  
  const prepararApp = async () => {
    await initDB();
    await carregarPet();
  };

  async function handleAdicionar() {
    //O trim tira os espaços vazios no inicio e fim do texto
    if (!nomeTutor.trim() || !telefone.trim() || !nomePet.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    await adicionarPet(nomeTutor, telefone, nomePet);
    setNomeTutor('');
    setTelefone('');
    setNomePet('')
    await carregarPet();
  };

  async function handleDeletar(id) {
    await deletarPet(id);
    await carregarPet();
  };

  //useEffect é um hook do react
  useEffect(() => {
    prepararApp();
  }, []);//Esta vazio pois não tem mais nada que faça ele ser alterado

  return (
    <SafeAreaProvider>
      <SafeAreaView style={Estilos.safeAreaViewContainer}>
        <Text style={Estilos.textoTitulo}>
          Cadastro de Pets (SQLite)
        </Text>

        <View style={Estilos.camposCadastroContainer}>
          <TextInput
            placeholder="Nome Tutor"
            value={nomeTutor}
            onChangeText={setNomeTutor}
            style={Estilos.campoTexto}
          />
          <TextInput
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            style={Estilos.campoTexto}
          />
          <TextInput
            placeholder="Nome Pet"
            value={nomePet}
            onChangeText={setNomePet}
            style={Estilos.campoTexto}
          />
          <Button title="Adicionar" onPress={handleAdicionar} />
        </View>

        <FlatList //criar lista de registros
          data={pet} //dados 
          keyExtractor={(item) => item.id.toString()}//chave para se referir a cada registro
          renderItem={({ item }) => ( //rederinzar itens para cada item mostra PessoaItem
            <PetItem id={item.id} nomeTutor={item.nomeTutor} telefone={item.nomeTelefone} nomePet={item.nomePet} onDelete={handleDeletar} />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
