// Класс для управления To-Do List
class TodoList {
    constructor() {
        // Массив для хранения задач (только в памяти)
        this.todos = [];
        this.editingId = null;
        
        this.initializeElements();
        this.bindEvents();
        this.render();
    }

    // Получаем все нужные элементы из DOM
    initializeElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.editModal = document.getElementById('editModal');
        this.editInput = document.getElementById('editInput');
        this.saveEditBtn = document.getElementById('saveEdit');
        this.cancelEditBtn = document.getElementById('cancelEdit');
        this.closeModalBtn = document.getElementById('closeModal');
    }

    // Навешиваем обработчики событий
    bindEvents() {
        // Добавление задачи по кнопке
        this.addBtn.addEventListener('click', () => this.addTodo());
        // Добавление задачи по Enter
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        // Модальное окно редактирования
        this.saveEditBtn.addEventListener('click', () => this.saveEdit());
        this.cancelEditBtn.addEventListener('click', () => this.closeModal());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
        // Закрытие модального окна при клике вне его
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) this.closeModal();
        });
        // Закрытие модального окна по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    // Добавление новой задачи
    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;
        // Создаём объект задачи
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        // Добавляем задачу в начало массива
        this.todos.unshift(todo);
        this.render();
        // Очищаем поле ввода
        this.todoInput.value = '';
    }

    // Удаление задачи по id
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.render();
    }

    // Переключение статуса выполнения задачи
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.render();
        }
    }

    // Открытие модального окна для редактирования
    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            this.editingId = id;
            this.editInput.value = todo.text;
            this.editModal.classList.add('show');
            this.editInput.focus();
            this.editInput.select();
        }
    }

    // Сохранение изменений после редактирования
    saveEdit() {
        const text = this.editInput.value.trim();
        if (!text) return;
        const todo = this.todos.find(t => t.id === this.editingId);
        if (todo) {
            todo.text = text;
            this.render();
            this.closeModal();
        }
    }

    // Закрытие модального окна
    closeModal() {
        this.editModal.classList.remove('show');
        this.editingId = null;
        this.editInput.value = '';
    }

    // Рендерим список задач
    render() {
        // Если задач нет — показываем пустое состояние
        if (this.todos.length === 0) {
            this.todoList.style.display = 'none';
            this.emptyState.style.display = 'block';
        } else {
            this.todoList.style.display = 'flex';
            this.emptyState.style.display = 'none';
            // Формируем HTML для каждой задачи
            this.todoList.innerHTML = this.todos.map(todo => this.createTodoElement(todo)).join('');
            // Навешиваем обработчики на кнопки задач
            this.bindTodoEvents();
        }
    }

    // Создаём HTML для одной задачи
    createTodoElement(todo) {
        // Если задача выполнена — добавляем класс completed
        const completedClass = todo.completed ? 'completed' : '';
        // Возвращаем разметку задачи
        return `
            <div class="todo-item ${completedClass}" data-id="${todo.id}">
                <div class="todo-content">
                    <!-- Клик по этому div отмечает задачу как выполненную -->
                    <div class="todo-checkbox" data-id="${todo.id}"></div>
                    <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                    <div class="todo-actions">
                        <button class="action-btn edit-btn" data-id="${todo.id}" title="Редактировать">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${todo.id}" title="Удалить">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Навешиваем обработчики на чекбокс, редактирование и удаление
    bindTodoEvents() {
        // Клик по чекбоксу — отметить как выполненную
        document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.toggleTodo(id);
            });
        });
        // Кнопка редактирования
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.edit-btn').dataset.id);
                this.editTodo(id);
            });
        });
        // Кнопка удаления
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.delete-btn').dataset.id);
                this.deleteTodo(id);
            });
        });
    }

    // Экранирование HTML для безопасности
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Запускаем приложение после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    new TodoList();
});

// Дополнительные функции для улучшения UX

// Добавление эффекта печатания в заголовок
function typeWriterEffect() {
    const title = document.querySelector('.title');
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Добавление параллакс эффекта
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.header');
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    });
}

// Добавление эффекта частиц (опционально)
function addParticleEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Инициализация дополнительных эффектов
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем эффект частиц для красоты
    addParticleEffect();
    
    // Добавляем параллакс эффект
    addParallaxEffect();
}); 