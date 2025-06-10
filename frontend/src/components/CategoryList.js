import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: ${({ theme }) => theme.cardBackground || '#ffffff'};
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.text || '#333333'};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.primary || '#4361ee'};
  margin-bottom: 25px;
  text-align: center;
  font-weight: 700;
  font-size: 28px;
  position: relative;
  padding-bottom: 10px;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #4361ee, #3a0ca3);
    border-radius: 2px;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 18px;
  border: 2px solid ${({ theme }) => theme.inputBorder || '#e0e0e0'};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary || '#4361ee'};
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
  }
`;

const Button = styled.button`
  background: ${({ primary, danger, theme }) =>
    danger
      ? 'linear-gradient(135deg, #ff4d4d, #cc3333)'
      : primary
      ? 'linear-gradient(135deg, #4cc9f0, #4361ee)'
      : 'linear-gradient(135deg, #f0f0f0, #e0e0e0)'};
  color: ${({ primary, danger }) => (primary || danger) ? 'white' : '#333'};
  padding: 10px 18px;
  margin-left: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.10);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    opacity: 0.92;
  }
  &:active {
    transform: translateY(0);
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 15px;
`;

const CategoryItem = styled.li`
  background-color: ${({ theme }) => theme.itemBackground || '#f8f9fa'};
  padding: 16px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text || '#333333'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  &:hover {
    background-color: ${({ theme }) => theme.itemHover || '#e9ecef'};
    transform: translateY(-2px);
    box-shadow: 0 5px 16px rgba(0,0,0,0.09);
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.secondaryText || '#6c757d'};
  font-style: italic;
  padding: 20px;
  grid-column: 1 / -1;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: 2px solid ${({ theme }) => theme.inputBorder || '#e0e0e0'};
  border-radius: 8px;
  font-size: 15px;
  margin-right: 12px;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary || '#4361ee'};
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.12);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const CategoryListComponent = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/categories/');
      setCategories(res.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await axios.post('http://127.0.0.1:8000/api/categories/', { nome: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    }
  };

  const handleEditClick = (cat) => {
    setEditId(cat.id);
    setEditValue(cat.nome);
  };

  const handleEditChange = (e) => setEditValue(e.target.value);

  const handleEditSave = async (catId) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/categories/${catId}/`, { nome: editValue });
      setEditId(null);
      setEditValue('');
      fetchCategories();
    } catch (error) {
      console.error('Erro ao editar categoria:', error);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditValue('');
  };

  const handleDelete = async (catId) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/categories/${catId}/`);
        fetchCategories();
      } catch (error) {
        console.error('Erro ao deletar categoria:', error);
      }
    }
  };

  return (
    <Container>
      <Title>Categorias</Title>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Digite o nome da nova categoria"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <Button type="submit" primary>Adicionar</Button>
      </Form>

      {isLoading ? (
        <EmptyMessage>Carregando categorias...</EmptyMessage>
      ) : (
        <CategoryList>
          {categories.length > 0 ? (
            categories.map(cat => (
              <CategoryItem key={cat.id}>
                {editId === cat.id ? (
                  <>
                    <EditInput
                      type="text"
                      value={editValue}
                      onChange={handleEditChange}
                      autoFocus
                    />
                    <ButtonGroup>
                      <Button primary onClick={() => handleEditSave(cat.id)}>Salvar</Button>
                      <Button onClick={handleEditCancel}>Cancelar</Button>
                    </ButtonGroup>
                  </>
                ) : (
                  <>
                    <span>{cat.nome}</span>
                    <ButtonGroup>
                      <Button primary onClick={() => handleEditClick(cat)}>Editar</Button>
                      <Button danger onClick={() => handleDelete(cat.id)}>Excluir</Button>
                    </ButtonGroup>
                  </>
                )}
              </CategoryItem>
            ))
          ) : (
            <EmptyMessage>Nenhuma categoria encontrada. Adicione uma nova!</EmptyMessage>
          )}
        </CategoryList>
      )}
    </Container>
  );
};

export default CategoryListComponent;