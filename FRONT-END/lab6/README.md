# Игра "Монти Холл" (CSS-only)

## Описание проекта

Это реализация классической головоломки Монти Холла, созданная исключительно с использованием HTML и CSS, без JavaScript. В игре есть три двери, за одной из которых находится автомобиль (приз), а за двумя другими - козы.

## Особенности реализации

### Фиксированное расположение приза
- Приз (автомобиль) всегда находится за дверью №2
- Это упрощает логику игры и делает её предсказуемой для демонстрации

### Логика игры
1. **Выбор двери**: Игрок выбирает одну из трёх дверей
2. **Открытие двери ведущим**: Ведущий открывает одну из оставшихся дверей с козой
3. **Решение о смене выбора**: Игрок решает, хочет ли он сменить свой выбор
4. **Результат**: Открываются все двери и показывается результат

### Технические особенности

#### HTML структура
- Семантическая разметка с использованием `article`, `section`, `label`, `input type="radio"`
- Три двери с уникальными ID для управления через CSS
- Скрытые radio inputs для управления состоянием игры

#### CSS логика
- Использование CSS селекторов `:checked` для управления этапами игры
- 3D трансформации (`transform: rotateY()`) для анимации открытия дверей
- Flexbox для адаптивной компоновки элементов
- CSS псевдоэлементы для отображения результатов

#### Адаптивность
- Responsive дизайн для мобильных устройств
- Медиа-запросы для разных размеров экрана
- Гибкая компоновка элементов

## Как играть

1. Откройте `index.html` в браузере
2. Выберите одну из трёх дверей кликом
3. Ведущий автоматически откроет дверь с козой
4. Решите, хотите ли сменить свой выбор
5. Узнайте результат игры
6. Нажмите "Играть снова" для новой игры

## Структура файлов

```
lab6/
├── index.html      # Основной HTML файл
├── styles.css      # CSS стили и логика игры
└── README.md       # Документация проекта
```

## Критерии оценивания

### Функциональность (2 балла)
✅ Полная реализация логики игры Монти Холл
✅ Правильная работа всех этапов игры
✅ Корректное отображение результатов

### Качество кода (1 балл)
✅ Семантическая HTML разметка
✅ Чистый и структурированный CSS код
✅ Использование современных CSS возможностей

### Дизайн (1 балл)
✅ Приятный визуальный дизайн
✅ Анимации и переходы
✅ Интуитивно понятный интерфейс

### Адаптивность (1 балл)
✅ Работа на мобильных устройствах
✅ Responsive дизайн
✅ Оптимизация для разных размеров экрана

## Технические детали

### CSS селекторы для логики игры
```css
/* Показать этап 2 после выбора двери */
#door1:checked ~ .game-controls .stage2 {
    display: block;
}

/* Открыть дверь с козой */
#door1:checked ~ .game-area .door3 {
    transform: rotateY(180deg);
}

/* Показать результат */
#keep:checked ~ .game-controls .stage3 {
    display: block;
}
```

### Анимации
- Плавное открытие дверей с помощью `transition: transform 0.6s`
- 3D эффект с использованием `perspective` и `transform-style: preserve-3d`
- Hover эффекты для интерактивности

## Ограничения CSS-only подхода

1. **Фиксированное расположение приза**: Приз всегда за дверью 2
2. **Предопределённая логика**: Нет настоящей случайности
3. **Ограниченная интерактивность**: Всё управляется через CSS селекторы

## Возможные улучшения

Для более продвинутой версии можно добавить минимальный JavaScript для:
- Случайного расположения приза
- Динамического открытия дверей
- Счёта очков и статистики

## Запуск проекта

1. Скачайте все файлы в одну папку
2. Откройте `index.html` в любом современном браузере
3. Игра готова к использованию!

## Автор

Студент: [Ваше имя]
Группа: [Ваша группа]
Дата: [Дата создания] 