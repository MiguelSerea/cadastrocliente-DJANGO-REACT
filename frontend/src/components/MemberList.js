import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: ${({ theme }) => theme.cardBackground || '#ffffff'};
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.primary || '#4361ee'};
  margin-bottom: 30px;
  text-align: center;
  font-weight: 700;
  font-size: 28px;
  position: relative;
  padding-bottom: 15px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #4361ee, #3a0ca3);
    border-radius: 2px;
  }
`;

const MemberCard = styled.div`
  background-color: ${({ theme }) => theme.background || '#f8f9fa'};
  border: 1px solid ${({ theme }) => theme.border || '#e0e0e0'};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const MemberDetail = styled.p`
  margin: 8px 0;
  color: ${({ theme }) => theme.text || '#333333'};
  font-size: 16px;
  line-height: 1.6;
  
  strong {
    color: ${({ theme }) => theme.primary || '#4361ee'};
    font-weight: 600;
    min-width: 100px;
    display: inline-block;
  }
`;

const Form = styled.form`
  margin-bottom: 40px;
  background-color: ${({ theme }) => theme.background || '#f8f9fa'};
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Input = styled.input`
  padding: 12px 15px;
  margin-bottom: 15px;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.inputBorder || '#e0e0e0'};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary || '#4361ee'};
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
  }
`;

const Select = styled.select`
  padding: 12px 15px;
  margin-bottom: 15px;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.inputBorder || '#e0e0e0'};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 15px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary || '#4361ee'};
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
  }
`;

const Button = styled.button`
  background: ${({ primary, danger }) => 
    danger ? 'linear-gradient(135deg, #ff4d4d, #cc3333)' : 
    primary ? 'linear-gradient(135deg, #4cc9f0, #4361ee)' : 
    'linear-gradient(135deg, #f0f0f0, #e0e0e0)'};
  color: ${({ primary, danger }) => (primary || danger) ? 'white' : '#333'};
  padding: 12px 20px;
  margin-right: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    opacity: 0.9;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.secondaryText || '#6c757d'};
  font-style: italic;
  padding: 20px;
`;

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMember, setNewMember] = useState({ nome: '', email: '', telefone: '', endereco: '', categoria: '' });
  const [editMemberId, setEditMemberId] = useState(null);
  const [editFormData, setEditFormData] = useState({ nome: '', email: '', telefone: '', endereco: '', categoria: '' });

  useEffect(() => { fetchMembers(); fetchCategories(); }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/members/');
      setMembers(res.data);
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/categories/');
      setCategories(res.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/members/', newMember);
      setNewMember({ nome: '', email: '', telefone: '', endereco: '', categoria: '' });
      fetchMembers();
    } catch (error) {
      console.error('Erro ao adicionar membro:', error);
    }
  };

  const handleEditClick = (member) => {
    setEditMemberId(member.id);
    setEditFormData({
      nome: member.nome || '',
      email: member.email || '',
      telefone: member.telefone || '',
      endereco: member.endereco || '',
      categoria: member.categoria || '',
    });
  };

  const handleCancelClick = () => { setEditMemberId(null); };

  const handleSaveClick = async (memberId) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/members/${memberId}/`, editFormData);
      setEditMemberId(null);
      fetchMembers();
    } catch (error) {
      console.error('Erro ao salvar membro:', error);
    }
  };

  const handleDeleteClick = async (memberId) => {
    if (window.confirm('Tem certeza que deseja excluir este membro?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/members/${memberId}/`);
        fetchMembers();
      } catch (error) {
        console.error('Erro ao deletar membro:', error);
      }
    }
  };

  return (
    <Container>
      <Title>Lista de Membros</Title>
      <Form onSubmit={handleAddMember}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#4361ee' }}>Adicionar Novo Membro</h3>
        <Input type="text" name="nome" placeholder="Nome completo" value={newMember.nome} onChange={handleInputChange} required />
        <Input type="email" name="email" placeholder="Email (exemplo@dominio.com)" value={newMember.email} onChange={handleInputChange} required />
        <Input type="text" name="telefone" placeholder="Telefone (opcional)" value={newMember.telefone} onChange={handleInputChange} />
        <Input type="text" name="endereco" placeholder="Endereço" value={newMember.endereco} onChange={handleInputChange} />
        <Select name="categoria" value={newMember.categoria} onChange={handleInputChange} required>
          <option value="">Selecione uma Categoria</option>
          {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.nome}</option>))}
        </Select>
        <Button type="submit" primary>Adicionar</Button>
      </Form>

      {isLoading ? (
        <EmptyMessage>Carregando membros...</EmptyMessage>
      ) : members.length === 0 ? (
        <EmptyMessage>Nenhum membro encontrado.</EmptyMessage>
      ) : (
        members.map((member) => (
          <MemberCard key={member.id}>
            {editMemberId === member.id ? (
              <div>
                <Input type="text" name="nome" value={editFormData.nome} onChange={handleEditInputChange} />
                <Input type="email" name="email" value={editFormData.email} onChange={handleEditInputChange} />
                <Input type="text" name="telefone" value={editFormData.telefone} onChange={handleEditInputChange} />
                <Input type="text" name="endereco" value={editFormData.endereco} onChange={handleEditInputChange} />
                <Select name="categoria" value={editFormData.categoria} onChange={handleEditInputChange}>
                  <option value="">Selecione uma Categoria</option>
                  {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.nome}</option>))}
                </Select>
                <ButtonGroup>
                  <Button primary onClick={() => handleSaveClick(member.id)}>Salvar</Button>
                  <Button onClick={handleCancelClick}>Cancelar</Button>
                </ButtonGroup>
              </div>
            ) : (
              <div>
                <MemberDetail><strong>Nome:</strong> {member.nome}</MemberDetail>
                <MemberDetail><strong>Email:</strong> {member.email}</MemberDetail>
                <MemberDetail><strong>Telefone:</strong> {member.telefone}</MemberDetail>
                <MemberDetail><strong>Endereço:</strong> {member.endereco}</MemberDetail>
                <MemberDetail><strong>Categoria:</strong> {member.categoria_nome}</MemberDetail>
                <ButtonGroup>
                  <Button primary onClick={() => handleEditClick(member)}>Editar</Button>
                  <Button danger onClick={() => handleDeleteClick(member.id)}>Excluir</Button>
                </ButtonGroup>
              </div>
            )}
          </MemberCard>
        ))
      )}
    </Container>
  );
};

export default MemberList;
