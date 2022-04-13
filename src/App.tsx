import SearchSelect from './components/SearchSelect';
import { Container } from './styles/App';
import GlobalStyle from './styles/global';

function App() {
  const onChange = (event: any) => {
    console.log('event :>> ', event);
  };

  return (
    <>
      <Container>
        <SearchSelect
          inputKey="name"
          renderOption={(item: any) => item.name}
          valueKey="name"
          onChange={onChange}
        />
      </Container>
      <GlobalStyle />
    </>
  );
}

export default App;
