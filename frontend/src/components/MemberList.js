import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './themes';

// Styled components
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  min-height: 100vh;
`;

const Title = styled.h2`
  color: ${props => props.theme.primary};
  text-align: center;
  margin-bottom: 30px;
`;

const MemberCard = styled.div`
  background: ${props => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 15px;
  transition: transform 0.2s;
  position: relative;
  color: ${props => props.theme.text};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.h3`
  color: ${props => props.theme.primary};
  margin: 0 0 5px 0;
`;

const MemberDetail = styled.p`
  color: ${props => props.theme.secondaryText};
  margin: 5px 0;
  font-size: 0.9em;
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
`;

const EditButton = styled(Button)`
  background-color: ${props => props.theme.warning};
  color: white;

  &:hover {
    background-color: ${props => props.theme.warningHover};
  }
`;

const DeleteButton = styled(Button)`
  background-color: ${props => props.theme.danger};
  color: white;

  &:hover {
    background-color: ${props => props.theme.dangerHover};
  }
`;

const SaveButton = styled(Button)`
  background-color: ${props => props.theme.success};
  color: white;

  &:hover {
    background-color: ${props => props.theme.successHover};
  }
`;

const CancelButton = styled(Button)`
  background-color: ${props => props.theme.secondary};
  color: white;

  &:hover {
    background-color: ${props => props.theme.secondaryHover};
  }
`;

const FormContainer = styled.div`
  background: ${props => props.theme.formBackground};
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
`;

const FormTitle = styled.h3`
  color: ${props => props.theme.primary};
  margin-top: 0;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid ${props => props.theme.inputBorder};
  border-radius: 4px;
  font-size: 16px;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.focusShadow};
  }
`;

const SubmitButton = styled.button`
  grid-column: span 2;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: ${props => props.theme.toggleBackground};
  color: ${props => props.theme.toggleText};
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: ''
  });
  const [editingMember, setEditingMember] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: ''
  });
  const [theme, setTheme] = useState('light');

  // Load member list on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/members/');
      setMembers(response.data);
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/members/', newMember);
      fetchMembers();
      setNewMember({ nome: '', email: '', telefone: '', endereco: '' });
    } catch (error) {
      console.error('Erro ao criar membro:', error);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member.id);
    setEditFormData({
      nome: member.nome,
      email: member.email,
      telefone: member.telefone,
      endereco: member.endereco
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/members/${id}/`, editFormData);
      fetchMembers();
      setEditingMember(null);
    } catch (error) {
      console.error('Erro ao atualizar membro:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/members/${id}/`);
      fetchMembers();
    } catch (error) {
      console.error('Erro ao deletar membro:', error);
    }
  };

  const cancelEdit = () => {
    setEditingMember(null);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Container>
        <ToggleButton onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Modo Noturno' : '☀️ Modo Claro'}
        </ToggleButton>
        
        <Title>Lista de Membros</Title>
        
        {members.map(member => (
          <MemberCard key={member.id}>
            {editingMember === member.id ? (
              <>
                <Form>
                  <Input
                    type="text"
                    name="nome"
                    value={editFormData.nome}
                    onChange={handleEditInputChange}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditInputChange}
                    required
                  />
                  <Input
                    type="text"
                    name="telefone"
                    value={editFormData.telefone}
                    onChange={handleEditInputChange}
                  />
                  <Input
                    type="text"
                    name="endereco"
                    value={editFormData.endereco}
                    onChange={handleEditInputChange}
                  />
                </Form>
                <ButtonGroup>
                  <SaveButton onClick={() => handleUpdate(member.id)}>Salvar</SaveButton>
                  <CancelButton onClick={cancelEdit}>Cancelar</CancelButton>
                </ButtonGroup>
              </>
            ) : (
              <>
                <MemberInfo>
                  <MemberName>{member.nome}</MemberName>
                  <MemberDetail>Email: {member.email}</MemberDetail>
                  {member.telefone && <MemberDetail>Telefone: {member.telefone}</MemberDetail>}
                  {member.endereco && <MemberDetail>Endereço: {member.endereco}</MemberDetail>}
                </MemberInfo>
                <ButtonGroup>
                  <EditButton onClick={() => handleEdit(member)}>Editar</EditButton>
                  <DeleteButton onClick={() => handleDelete(member.id)}>Excluir</DeleteButton>
                </ButtonGroup>
              </>
            )}
          </MemberCard>
        ))}

        <FormContainer>
          <FormTitle>Adicionar Novo Membro</FormTitle>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={newMember.nome}
              onChange={handleInputChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={newMember.email}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="telefone"
              placeholder="Telefone (opcional)"
              value={newMember.telefone}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="endereco"
              placeholder="Endereço (opcional)"
              value={newMember.endereco}
              onChange={handleInputChange}
            />
            <SubmitButton type="submit">Adicionar Membro</SubmitButton>
          </Form>
        </FormContainer>
      </Container>
    </ThemeProvider>
  );
};

export default MemberList;