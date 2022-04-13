import React from 'react';
import { http } from '../../http';
import { useDebounce } from '../../utils';
import {
  Container,
  EmptyResults,
  InputContainer,
  Results,
  SearchInput,
  SearchInputLabel,
  Tag,
  TagContainer,
} from './SearchSelect.styles';

interface SearchSelectProps<T> {
  debounceTime?: number;
  inputKey: string;
  inputLabel?: string;
  onChange?: (event: Event) => void;
  remoteSearch?: () => Promise<Array<T>>;
  renderOption: (option: T) => string;
  valueKey?: string | null;
}

function SearchSelect<T>(props: SearchSelectProps<T>) {
  const {
    debounceTime,
    inputLabel,
    inputKey,
    renderOption,
    valueKey,
    onChange,
  } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [searchValue, setSearchValue] = React.useState<string>();
  const [selected, setSelected] = React.useState<any>();
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [searching, setSearching] = React.useState<boolean>(false);
  const [showResults, setShowResults] = React.useState<boolean>(false);
  const [touched, setTouched] = React.useState(false);

  const debouncedSearch = useDebounce(searchValue, debounceTime || 500);

  const doSearch = async (value: string) => {
    if (value === undefined) {
      return;
    }

    setSearching(true);
    setShowResults(true);

    try {
      const response = await http({
        url: 'https://swapi.dev/api/people/',
        query: {
          search: value,
        },
      }).get();

      if (Array.isArray(response.results) && response.results.length) {
        setSearchResults(response.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSearching(false);
    }
  };

  const handleSelect = (result: any) => {
    setSearchValue(undefined);

    if (valueKey) {
      if (typeof result === 'object') {
        setSelected(result[valueKey]);
      } else {
        setSelected(result);
      }
    } else {
      setSelected(result);
    }

    setShowResults(false);
    setSearchResults([]);
  };

  const handleFocus = () => {
    setShowResults(true);

    if (!touched) {
      doSearch('');
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const keyboardListener = React.useCallback(
    (event: KeyboardEvent) => {
      // Checking if ESC key was pressed
      if (event.code === 'Escape' && showResults) {
        event.stopPropagation();
        event.preventDefault();
        setShowResults(false);
        setSearchValue(undefined);
        setSearchResults([]);
        setTouched(false);
      } else {
        return;
      }
    },
    [showResults]
  );

  const clickListener = React.useCallback(
    (event: MouseEvent) => {
      // Checking if click was outside component boundaries
      if (showResults) {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setShowResults(false);
          setSearchValue(undefined);
          setSearchResults([]);
          setTouched(false);
        }
      } else {
        return;
      }
    },
    [showResults]
  );

  React.useEffect(() => {
    doSearch(debouncedSearch);
  }, [debouncedSearch]);

  React.useEffect(() => {
    if (onChange) {
      const event = new CustomEvent('change', {});

      Object.defineProperty(event, 'target', {
        enumerable: true,
        writable: false,
        value: {
          type: 'select',
          value: selected,
        },
      });

      onChange(event);
    }
  }, [onChange, selected]);

  React.useEffect(() => {
    window.addEventListener('keydown', keyboardListener);
    window.addEventListener('click', clickListener);

    return () => {
      window.removeEventListener('keydown', keyboardListener);
      window.removeEventListener('click', clickListener);
    };
  }, [clickListener, keyboardListener]);

  return (
    <Container ref={containerRef}>
      {inputLabel && (
        <SearchInputLabel htmlFor={inputKey}>{inputLabel}</SearchInputLabel>
      )}

      <InputContainer>
        <SearchInput
          autoComplete="off"
          id={inputKey}
          name={inputKey}
          onBlur={() => handleBlur()}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => handleFocus()}
          placeholder="Search..."
          ref={inputRef}
          showResults={showResults}
          type="text"
          value={searchValue || ''}
        />

        {showResults && (
          <Results>
            {searching && <span>Loading...</span>}

            {!searching && !searchResults.length && (
              <EmptyResults>No items match your search.</EmptyResults>
            )}

            {!searching && !!searchResults.length && (
              <ul>
                {searchResults.map((result, index) => (
                  <li onClick={() => handleSelect(result)} key={index}>
                    {renderOption(result)}
                  </li>
                ))}
              </ul>
            )}
          </Results>
        )}
      </InputContainer>

      {selected && (
        <TagContainer>
          <Tag>
            {valueKey ? selected : renderOption(selected)}
            <button onClick={() => setSelected(undefined)}>x</button>
          </Tag>
        </TagContainer>
      )}
    </Container>
  );
}

export default SearchSelect;
