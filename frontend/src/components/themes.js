import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  background: '#ffffff',
  text: '#333333',
  primary: '#3498db',
  primaryHover: '#2980b9',
  secondary: '#95a5a6',
  secondaryHover: '#7f8c8d',
  success: '#2ecc71',
  successHover: '#27ae60',
  warning: '#f39c12',
  warningHover: '#e67e22',
  danger: '#e74c3c',
  dangerHover: '#c0392b',
  cardBackground: '#ffffff',
  formBackground: '#f8f9fa',
  inputBackground: '#ffffff',
  inputBorder: '#dddddd',
  secondaryText: '#7f8c8d',
  focusShadow: 'rgba(52, 152, 219, 0.2)',
  toggleBackground: '#3498db',
  toggleText: '#ffffff'
};

export const darkTheme = {
  background: '#121212',
  text: '#e0e0e0',
  primary: '#64b5f6',
  primaryHover: '#42a5f5',
  secondary: '#757575',
  secondaryHover: '#616161',
  success: '#81c784',
  successHover: '#66bb6a',
  warning: '#ffb74d',
  warningHover: '#ffa726',
  danger: '#e57373',
  dangerHover: '#ef5350',
  cardBackground: '#1e1e1e',
  formBackground: '#2d2d2d',
  inputBackground: '#2d2d2d',
  inputBorder: '#444',
  secondaryText: '#a0a0a0',
  focusShadow: 'rgba(100, 181, 246, 0.2)',
  toggleBackground: '#64b5f6',
  toggleText: '#121212'
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    margin: 0;
    padding: 0;
    transition: all 0.3s ease;
  }
`;