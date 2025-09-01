// Простая валидация регистрации
function validateRegistration() {
    const emailInput = document.getElementById('regEmail');
    const email = emailInput.value.trim();
    
    // Очищаем предыдущие сообщения
    clearMessages();
    
    // Проверяем email
    if (!email) {
        showMessage('Пожалуйста, введите email', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Некорректный email', 'error');
        return;
    }
    
    // Если все ок - успешная регистрация
    showMessage('Успешная регистрация!', 'success');
    emailInput.value = ''; // Очищаем поле
}

// Простая проверка email
function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}

// Показать сообщение
function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `reg-message reg-${type}`;
    messageDiv.textContent = text;
    
    document.body.appendChild(messageDiv);
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Очистить все сообщения
function clearMessages() {
    const messages = document.querySelectorAll('.reg-message');
    messages.forEach(msg => msg.remove());
}

// Отправка по Enter
document.getElementById('regEmail').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        validateRegistration();
    }
});