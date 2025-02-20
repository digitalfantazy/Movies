/*
1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

///////////////////////////////////////////////////////////////////////////////////////

/* 

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => { // Загрузка всех файлов (улучшенная)


    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');

    

    addForm.addEventListener('submit', (event) => { // Событие "Ввести название фильма"
        event.preventDefault();

        let newFilm = addInput.value; // Сохраняется то что ввел пользователь 
        const favorite = checkbox.checked; //  Галочка ( отмечена или не отмечена ) .checked получаем булиновое значение 

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm); // Добавили фильм в БД
            sortArr(movieDB.movies); // Сортируем 
            createMovieList(movieDB.movies, movieList); // Выводим на странице 

        }


        event.target.reset(); // Очищаем форму ввода
        
    });
     

    // console.log(adv);
    
    const deleteAdv = (arr) => {
        arr.forEach(item => {  // Удалили все рекламные блоки
            item.remove();
        
        });
    };

    
    
    // movieList.forEach(item => {
    //     item.remove();
    
    // });

    const makeChanges = () => {
        genre.textContent = 'Драма'; // Изменили жанр 
        poster.style.backgroundImage = 'url("img/bg.jpg")'; // Изменили задний фон
    };
    
    makeChanges();
    
    const sortArr = (arr) => {
        arr.sort(); // Сортировка фильмов в ДБ 
    };

    
   
    
    // console.log(poster.innerHTML);
    
    movieDB.movies.forEach((film, i) => { // Сформировали новый, динамический список фильмов 
        movieList.innerHTML += `
    
        <li class="promo__interactive-item">${i + 1} ${film} 
            <div class="delete"></div>
        </li>
    
        `;
    
    });

    function createMovieList (films, parent) {
        parent.innerHTML = ""; // Удалили список фильмов в HTML коде
        sortArr(films);

        films.forEach((film, i) => { // Сформировали новый, динамический список фильмов 
            parent.innerHTML += `
        
            <li class="promo__interactive-item">${i + 1} ${film} 
                <div class="delete"></div>
            </li>
        
            `;
        
        });

        document.querySelectorAll('.delete').forEach((btn, i) => { // Удаление фильма из списка 
            btn.addEventListener('click', () => {
                btn.parentElement.remove(); // Удаляем родительский элемент, потому что у нас массив с delete дивом
                movieDB.movies.splice(i, 1);  // Вырезаем элемент с массива (какой элемент, сколько)

                createMovieList(films, movieList); // Формируем новый список
            });
        });
    }
    
    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);



});

