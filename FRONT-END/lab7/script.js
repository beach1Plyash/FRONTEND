class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.cells = document.querySelectorAll('.cell');
        this.statusElement = document.getElementById('status');
        this.restartButton = document.getElementById('restart');
        
        this.initializeGame();
    }
    
    initializeGame() {
        // Добавляем обработчики событий для клеток
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
        
        // Добавляем обработчик для кнопки перезапуска
        this.restartButton.addEventListener('click', () => this.restartGame());
    }
    
    handleCellClick(cell) {
        const index = parseInt(cell.getAttribute('data-index'));
        
        // Проверяем, можно ли сделать ход
        if (this.board[index] === '' && this.gameActive && this.currentPlayer === 'X') {
            this.makeMove(index, 'X');
            
            // Проверяем, не закончилась ли игра
            if (this.gameActive) {
                this.currentPlayer = 'O';
                this.updateStatus('Ход компьютера (O)');
                
                // Ход компьютера с небольшой задержкой
                setTimeout(() => {
                    this.computerMove();
                }, 500);
            }
        }
    }
    
    makeMove(index, player) {
        this.board[index] = player;
        this.cells[index].textContent = player;
        this.cells[index].classList.add(player.toLowerCase());
        
        // Проверяем условия победы
        if (this.checkWinner(player)) {
            this.gameActive = false;
            const winner = player === 'X' ? 'Игрок' : 'Компьютер';
            this.updateStatus(`${winner} победил!`);
            return;
        }
        
        // Проверяем ничью
        if (this.checkDraw()) {
            this.gameActive = false;
            this.updateStatus('Ничья!');
            return;
        }
    }
    
    computerMove() {
        if (!this.gameActive) return;
        
        // Находим все свободные клетки
        const emptyCells = this.board
            .map((cell, index) => cell === '' ? index : null)
            .filter(index => index !== null);
        
        if (emptyCells.length > 0) {
            // Выбираем случайную свободную клетку
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.makeMove(randomIndex, 'O');
            
            if (this.gameActive) {
                this.currentPlayer = 'X';
                this.updateStatus('Ваш ход (X)');
            }
        }
    }
    
    checkWinner(player) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные линии
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные линии
            [0, 4, 8], [2, 4, 6] // Диагональные линии
        ];
        
        return winConditions.some(condition => {
            return condition.every(index => this.board[index] === player);
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    updateStatus(message) {
        this.statusElement.textContent = message;
    }
    
    restartGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        // Очищаем клетки
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
        
        this.updateStatus('Ваш ход (X)');
    }
}

// Запускаем игру при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
}); 