// -----------------------------
// Данные изображений (начальный массив)
// -----------------------------
let images = [
    // Пример карточки природы
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
        title: 'Горный пейзаж',
        description: 'Величественные горы, покрытые снегом, создают захватывающий вид на закате.',
        tags: ['nature', 'landscape', 'mountains']
    },
    // Пример карточки архитектуры
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop',
        title: 'Городской закат',
        description: 'Современный городской пейзаж в золотых лучах заходящего солнца.',
        tags: ['architecture', 'city', 'sunset']
    },
    // Технологии будущего
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop',
        title: 'Технологии будущего',
        description: 'Инновационные технологии и цифровые решения для современного мира.',
        tags: ['technology', 'digital', 'innovation']
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
        title: 'Лесная тропа',
        description: 'Умиротворяющая лесная тропа, ведущая через густую зелень деревьев.',
        tags: ['nature', 'forest', 'path']
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=300&fit=crop',
        title: 'Путешествие по миру',
        description: 'Захватывающие дух виды из разных уголков нашей прекрасной планеты.',
        tags: ['travel', 'world', 'adventure']
    },
    // Кулинарное искусство
    {
        id: 6,
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=300&fit=crop',
        title: 'Кулинарное искусство',
        description: 'Вкусные блюда, приготовленные с любовью и мастерством.',
        tags: ['food', 'cooking', 'delicious']
    },
    {
        id: 7,
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop',
        title: 'Зеленый лес',
        description: 'Богатая экосистема леса с разнообразной флорой и фауной.',
        tags: ['nature', 'forest', 'green']
    },
    {
        id: 8,
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop',
        title: 'Современная архитектура',
        description: 'Инновационные архитектурные решения и современный дизайн зданий.',
        tags: ['architecture', 'modern', 'design']
    },
    // Цифровые технологии
    {
        id: 9,
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
        title: 'Цифровые технологии',
        description: 'Передовые технологии, формирующие будущее человечества.',
        tags: ['technology', 'digital', 'future']
    },
    {
        id: 10,
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
        title: 'Морское путешествие',
        description: 'Романтичное путешествие по морским просторам.',
        tags: ['travel', 'sea', 'ocean']
    },
    // Ресторанная кухня
    {
        id: 11,
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
        title: 'Ресторанная кухня',
        description: 'Профессиональная кухня с современным оборудованием.',
        tags: ['food', 'restaurant', 'kitchen']
    },
    {
        id: 12,
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop',
        title: 'Горный ручей',
        description: 'Кристально чистый горный ручей в окружении дикой природы.',
        tags: ['nature', 'water', 'mountains']
    }
];

// -----------------------------
// Переменные состояния и DOM-элементы
// -----------------------------
let currentFilter = 'all'; // Текущий выбранный фильтр

const galleryContainer = document.getElementById('galleryContainer'); // Контейнер для карточек
const filterButtons = document.querySelectorAll('.filter-btn'); // Кнопки фильтрации
const addImageForm = document.getElementById('addImageForm'); // Форма добавления изображений

// -----------------------------
// Инициализация приложения
// -----------------------------
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery(); // Рендерим галерею при загрузке
    setupEventListeners(); // Навешиваем обработчики событий
});

// -----------------------------
// Рендеринг галереи
// -----------------------------
function initializeGallery() {
    renderGallery(images);
}

// -----------------------------
// Обработчики событий
// -----------------------------
function setupEventListeners() {
    // Клик по фильтрам
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
    // Отправка формы добавления изображения
    addImageForm.addEventListener('submit', handleAddImage);
}

// -----------------------------
// Фильтрация изображений
// -----------------------------
function handleFilterClick(event) {
    const filter = event.currentTarget.dataset.filter;
    // Обновляем активную кнопку
    filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
    event.currentTarget.classList.add('filter-btn--active');
    // Применяем фильтр
    applyFilter(filter);
}

function applyFilter(filter) {
    currentFilter = filter;
    // Фильтруем изображения по тегу
    const filteredImages = filter === 'all' 
        ? images 
        : images.filter(image => image.tags.includes(filter));
    // Анимированное обновление галереи
    animateGalleryUpdate(filteredImages);
}

// -----------------------------
// Анимация при фильтрации
// -----------------------------
function animateGalleryUpdate(filteredImages) {
    const cards = galleryContainer.querySelectorAll('.image-card');
    // Сначала плавно скрываем все карточки
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('image-card--hidden');
        }, index * 50); // Волновой эффект
    });
    // После завершения анимации скрытия обновляем галерею
    setTimeout(() => {
        renderGallery(filteredImages);
    }, cards.length * 50 + 300);
}

// -----------------------------
// Рендеринг карточек изображений
// -----------------------------
function renderGallery(imagesToRender) {
    galleryContainer.innerHTML = '';
    // Если нет изображений по фильтру
    if (imagesToRender.length === 0) {
        galleryContainer.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: white;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>Изображения не найдены</h3>
                <p>Попробуйте выбрать другой фильтр или добавьте новые изображения.</p>
            </div>
        `;
        return;
    }
    // Рендерим каждую карточку с задержкой для анимации
    imagesToRender.forEach((image, index) => {
        const card = createImageCard(image);
        setTimeout(() => {
            galleryContainer.appendChild(card);
        }, index * 100);
    });
}

// Создание DOM-элемента карточки изображения
function createImageCard(image) {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.dataset.id = image.id;
    card.innerHTML = `
        <img src="${image.url}" alt="${image.title}" class="image-card__image" loading="lazy">
        <div class="image-card__content">
            <h3 class="image-card__title">${image.title}</h3>
            <p class="image-card__description">${image.description}</p>
            <div class="image-card__tags">
                ${image.tags.map(tag => `<span class="image-card__tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    return card;
}

// -----------------------------
// Добавление нового изображения через форму
// -----------------------------
function handleAddImage(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newImage = {
        id: Date.now(), // Уникальный ID
        url: formData.get('imageUrl'),
        title: formData.get('imageTitle'),
        description: formData.get('imageDescription'),
        tags: formData.get('imageTags').split(',').map(tag => tag.trim().toLowerCase())
    };
    // Валидация URL изображения
    if (!isValidImageUrl(newImage.url)) {
        showMessage('Пожалуйста, введите корректный URL изображения', 'error');
        return;
    }
    // Валидация тегов
    if (newImage.tags.length === 0 || newImage.tags[0] === '') {
        showMessage('Пожалуйста, укажите хотя бы один тег', 'error');
        return;
    }
    // Добавляем изображение в массив
    images.push(newImage);
    // Обновляем галерею с учетом текущего фильтра
    const filteredImages = currentFilter === 'all' 
        ? images 
        : images.filter(image => image.tags.includes(currentFilter));
    renderGallery(filteredImages);
    // Показываем сообщение об успехе
    showMessage('Изображение успешно добавлено!', 'success');
    // Очищаем форму
    event.target.reset();
    // Прокручиваем к галерее для показа нового изображения
    setTimeout(() => {
        galleryContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}

// Проверка корректности URL изображения
function isValidImageUrl(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
        return false;
    }
}

// -----------------------------
// Вспомогательные функции
// -----------------------------
// Показать сообщение (успех/ошибка)
function showMessage(text, type) {
    // Удаляем существующие сообщения
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    // Создаем новое сообщение
    const message = document.createElement('div');
    message.className = `message message--${type}`;
    message.textContent = text;
    // Добавляем сообщение в начало main
    const main = document.querySelector('.main');
    main.insertBefore(message, main.firstChild);
    // Удаляем сообщение через 5 секунд
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Экспортировать текущие изображения в JSON (вызывается из консоли)
function exportToJSON() {
    const dataStr = JSON.stringify(images, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'gallery-data.json';
    link.click();
}
console.log('Для экспорта данных галереи в JSON используйте: exportToJSON()');

// -----------------------------
// Дополнительные UX-функции
// -----------------------------
// Ленивая загрузка изображений (IntersectionObserver)
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Поиск по изображениям (не используется в интерфейсе, но можно доработать)
function searchImages(query) {
    const searchTerm = query.toLowerCase();
    const searchResults = images.filter(image => 
        image.title.toLowerCase().includes(searchTerm) ||
        image.description.toLowerCase().includes(searchTerm) ||
        image.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    renderGallery(searchResults);
}

// Анимация появления карточек при скролле
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    document.querySelectorAll('.image-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Инициализация дополнительных функций при загрузке страницы
// (ленивая загрузка и анимация при скролле)
document.addEventListener('DOMContentLoaded', function() {
    setupLazyLoading();
    setupScrollAnimations();
}); 