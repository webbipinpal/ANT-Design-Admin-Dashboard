import { Space } from 'antd';
import './App.css';
import AppHeader from './components/Header';
import SideMenu from './components/SideMenu';
import PageContent from './components/PageContent';
import AppFooter from './components/Footer'
const App = () => {
  return (
    <div className="App">
      <AppHeader/>
        <Space size={20} className='MainContainer'>
          <SideMenu className="menuRow" />
          <PageContent className="contentRow" />
        </Space>
      <AppFooter />
    </div>
  );
}

export default App;
