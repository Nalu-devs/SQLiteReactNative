import Estilos from '../styles/Estilos.js';
import { View, Text, TouchableOpacity } from 'react-native';

export default function PetItem({ id, nomeTutor, telefone, nomePet, onDelete }) {
  return (
    <View style={Estilos.petItemContainer}>
      <View>
        <Text style={Estilos.pessoaItemNome}>{nomeTutor}</Text>
        <Text style={Estilos.pessoaItemEmail}>{telefone}</Text>
        <Text style={Estilos.pessoaItemEmail}>{nomePet}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(id)}>
        <Text style={Estilos.pessoaItemBtnExcluirText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}
