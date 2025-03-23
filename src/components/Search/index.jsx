import './index.css';

/**
 * Компонент для поиска книг.
 * 
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.onSearch - Функция-обработчик для обработки изменений строки поиска.
 * @returns {JSX.Element} JSX-разметка компонента Search.
 */
const Search = (props) => {
    const { onSearch } = props;

    /**
     * Обработчик изменения значения в поле поиска.
     * 
     * @param {Object} e - Событие изменения.
     */
    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    }

    return (
        <div class='search'>
            <input placeholder='Искать книгу...' onChange={handleSearchChange}></input>
        </div>
    );
}

export default Search;