import { useState } from 'react';
import './index.css';

/**
 * Компонент карточки книги.
 * 
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.book - Объект книги.
 * @param {string} props.book.title - Название книги.
 * @param {string} props.book.author - Автор книги.
 * @param {number} props.book.year - Год издания книги.
 * @param {string} props.book.genre - Жанр книги.
 * @param {string} props.book.imageUrl - URL изображения книги.
 * @param {Array<Object>} props.book.editions - Список изданий книги.
 * @param {string} props.book.editions[].edition - Название издания.
 * @param {number} props.book.editions[].price - Цена издания.
 * @param {string} props.book.editions[].currency - Валюта цены.
 * @param {boolean} props.book.editions[].inStock - Наличие издания.
 * @returns {JSX.Element} JSX-разметка компонента BookCard.
 */
const BookCard = (props) => {
    const { book } = props;

    /**
     * Состояние для хранения выбранного издания книги.
     * @type {[Object, Function]}
     */
    const [selectedEdition, setSelectedEdition] = useState(book.editions[0]);

    /**
     * Обработчик изменения выбранного издания.
     * 
     * @param {string} editionName - Название выбранного издания.
     */
    const handleEditionChange = (editionName) => {
        const edition = book.editions.find((edition) => edition.edition === editionName);

        setSelectedEdition(edition);
    };

    return (
        <div class='book-card'>
            <img src={book.imageUrl}></img>
            <h2>{book.title}</h2>
            <p>Автор: {book.author} - {book.year}</p>
            <p>Жанр: {book.genre}</p>
            <select onChange={(e) => handleEditionChange(e.target.value)}>
                {book.editions.map((edition) => (
                    <option
                        value={edition.edition}
                        key={edition.id}
                    >
                        {edition.edition}
                    </option>
                ))}
            </select>
            <p>{selectedEdition.inStock ? `${selectedEdition.price} ${selectedEdition.currency}` : 'Нет в наличии'}</p>
            <button disabled={!selectedEdition.inStock}>Купить</button>
        </div>
    );
};

export default BookCard;