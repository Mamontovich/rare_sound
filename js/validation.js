// Функции валидации формы
function validateForm() {
    // Сбрасываем предыдущие ошибки
    clearErrors();
    
    // Получаем значения полей
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Валидация имени
    if (!validateName(firstName)) {
        showError('firstNameError', 'Имя должно содержать только буквы (2-50 символов)');
        isValid = false;
    }
    
    // Валидация фамилии
    if (!validateName(lastName)) {
        showError('lastNameError', 'Фамилия должна содержать только буквы (2-50 символов)');
        isValid = false;
    }
    
    // Валидация email
    if (!validateEmail(email)) {
        showError('emailError', 'Введите корректный email адрес');
        isValid = false;
    }
    
    // Валидация сообщения (необязательное поле)
    if (message && !validateMessage(message)) {
        showError('messageError', 'Сообщение не должно превышать 500 символов');
        isValid = false;
    }
    
    if (isValid) {
        submitForm(firstName, lastName, email, message);
    } else {
        showGlobalError('Пожалуйста, исправьте ошибки в форме');
    }
    
    return isValid;
}

// Валидация имени и фамилии
function validateName(name) {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,50}$/;
    return nameRegex.test(name);
}

// Валидация email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Валидация сообщения
function validateMessage(message) {
    return message.length <= 500;
}

// Показать ошибку
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
    
    // Подсвечиваем поле с ошибкой
    const fieldId = elementId.replace('Error', '');
    const field = document.getElementById(fieldId);
    if (field) {
        field.style.borderColor = '#ff4444';
    }
}

// Очистить все ошибки
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    // Сбрасываем подсветку полей
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// Показать глобальное сообщение об ошибке
function showGlobalError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message-global';
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Показать сообщение об успехе
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Отправка формы
function submitForm(firstName, lastName, email, message) {
    // Показываем индикатор загрузки
    const form = document.getElementById('registrationForm');
    const submitButton = form.querySelector('button');
    
    form.classList.add('loading');
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    
    // Имитация отправки на сервер
    setTimeout(() => {
        // Сохраняем данные в localStorage
        const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message,
            registrationDate: new Date().toISOString()
        };
        
        // Сохраняем данные пользователя
        localStorage.setItem('userData', JSON.stringify(formData));
        
        // Показываем сообщение об успехе
        showSuccessMessage('Успешная регистрация!');
        
        // Очищаем форму
        form.reset();
        
        // Восстанавливаем кнопку
        form.classList.remove('loading');
        submitButton.textContent = 'Продолжить';
        submitButton.disabled = false;       
    },);
}

// Валидация в реальном времени
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('#registrationForm input, #registrationForm textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
});

// Валидация отдельного поля
function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    
    switch (fieldId) {
        case 'firstName':
        case 'lastName':
            if (value && !validateName(value)) {
                showError(fieldId + 'Error', 'Только буквы (2-50 символов)');
            } else {
                clearFieldError(field);
            }
            break;
            
        case 'email':
            if (value && !validateEmail(value)) {
                showError(fieldId + 'Error', 'Введите корректный email');
            } else {
                clearFieldError(field);
            }
            break;
            
        case 'message':
            if (value && !validateMessage(value)) {
                showError(fieldId + 'Error', 'Не более 500 символов');
            } else {
                clearFieldError(field);
            }
            break;
    }
}

// Очистка ошибки поля
function clearFieldError(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    field.style.borderColor = '';
}

// Отправка формы по Enter
document.getElementById('registrationForm').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        validateForm();
    }
});