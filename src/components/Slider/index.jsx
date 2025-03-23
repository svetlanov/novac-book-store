import { useState, useEffect } from 'react';
import './index.css';
import books from '../../data/books.json';

/**
 * Компонент слайдера для отображения книг.
 * 
 * @component
 * @returns {JSX.Element} JSX-разметка компонента Slider.
 */
const Slider = () => {
    /**
     * Состояние для хранения текущего слайда.
     * @type {[Object, Function]}
     */
    const [currentSlide, setCurrentSlide] = useState(books[0]);

    /**
     * Проверяет, является ли индекс нечетным.
     * 
     * @param {number} index - Индекс элемента.
     * @returns {boolean} Возвращает true, если индекс нечетный.
     */
    const isOdd = (index) => index % 2 !== 0;

    /**
     * Эффект для автоматического переключения слайдов каждые 3 секунды.
     */
    useEffect(() => {
        const interval = setInterval(() => {
            const currentSlideIndex = books.findIndex((book) => book.id === currentSlide.id);
            const nextSlideIndex = currentSlideIndex + 1;
            if (nextSlideIndex > (books.length - 1)) {
                setCurrentSlide(books[0]);
            } else {
                setCurrentSlide(books[nextSlideIndex]);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [currentSlide]);

    /**
     * Обработчик для переключения на следующий слайд.
     */
    const handleNextSlide = () => {
        const currentSlideIndex = books.findIndex((book) => book.id === currentSlide.id);
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex > (books.length - 1)) {
            setCurrentSlide(books[0]);
        } else {
            setCurrentSlide(books[nextSlideIndex]);
        }
    };

    /**
     * Обработчик для переключения на предыдущий слайд.
     */
    const handlePrevSlide = () => {
        const currentSlideIndex = books.findIndex((book) => book.id === currentSlide.id);
        const prevSlideIndex = currentSlideIndex - 1;
        if (prevSlideIndex < 0) {
            setCurrentSlide(books[(books.length - 1)]);
        } else {
            setCurrentSlide(books[prevSlideIndex]);
        }
    };

    return (
        <div class='slider'>
            <button class="prev-slide-btn" onClick={handlePrevSlide}>←</button>
            {
                books.map((book, index) => (
                    <div
                        key={book.id}
                        class={(book.id === currentSlide.id ? 'active-slide' : 'inactive-slide') + ' book-slide' + (isOdd(index) ? ' left-side' : ' right-side')}
                    >
                        <img class={(isOdd(index)) ? 'left-side-image' : 'right-side-image'} src={book.imageUrl}></img>
                        <div class={isOdd(index) ? 'right-side-info' : 'left-side-info'}>
                            <h2>{book.title}</h2>
                            <p>Автор: {book.author} - {book.year}</p>
                            <p>Жанр: {book.genre}</p>
                            <div class="editions">
                                {book.editions.map((edition) => (
                                    <span class="book-edition">{edition.edition}</span>
                                ))}
                            </div>
                        </div>
                    </div>))
            }
            <button class="next-slide-btn" onClick={handleNextSlide}>→</button>
        </div>
    );
};

export default Slider;