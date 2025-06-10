import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from './components/themes'; // ajuste conforme sua estrutura
import MemberList from './components/MemberList';
import CategoryListComponent from './components/CategoryList';
import styled from "styled-components";

// Sidebar Styles
const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
`;

const Sidebar = styled.div`
  width: 220px;
  background: ${({ theme }) => theme.cardBackground};
  border-right: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  padding-top: 40px;
`;

const SidebarButton = styled.button`
  background: none;
  border: none;
  color: ${({ active, theme }) => active ? theme.primary : theme.text};
  font-weight: ${({ active }) => active ? 700 : 500};
  font-size: 18px;
  cursor: pointer;
  padding: 18px 0 18px 36px;
  text-align: left;
  border-left: ${({ active, theme }) => active ? `4px solid ${theme.primary}` : '4px solid transparent'};
  transition: background 0.15s, color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.itemHover};
    color: ${({ theme }) => theme.primary};
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 40px 24px;
`;

const ToggleThemeBtn = styled.button`
  background: none;
  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  margin: 24px;
  border-radius: 6px;
  padding: 8px 20px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-end;
`;

const App = () => {
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("members");

  const themeToggle = () => setTheme(t => (t === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Layout>
        <Sidebar>
          <SidebarButton
            active={page === "members"}
            onClick={() => setPage("members")}
          >
            👤 Membros
          </SidebarButton>
          <SidebarButton
            active={page === "categories"}
            onClick={() => setPage("categories")}
          >
            🗂 Categorias
          </SidebarButton>
          <ToggleThemeBtn onClick={themeToggle}>
            {theme === "light" ? "🌙 Escuro" : "☀️ Claro"}
          </ToggleThemeBtn>
        </Sidebar>
        <Content>
          {page === "members" ? <MemberList /> : <CategoryListComponent />}
        </Content>
      </Layout>
    </ThemeProvider>
  );
};

export default App;