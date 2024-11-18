# API Endpoints

## 1. **Get Cars**
- **Опис**: Повертає список всіх автомобілів.
- **Запит**: `GET http://localhost:3000/cars`

## 2. **Get Car by ID**
- **Опис**: Повертає інформацію про автомобіль за його ID.
- **Запит**: `GET http://localhost:3000/cars/{id}`

## 3. **Create Car**
- **Опис**: Створює нове оголошення про автомобіль.
- **Запит**: `POST http://localhost:3000/cars`
- **Приклад**: З body `{ make, model, price, description, ... }`

## 4. **Update Car**
- **Опис**: Оновлює інформацію про автомобіль за його ID.
- **Запит**: `PUT http://localhost:3000/cars/{id}`
- **Приклад**: З body `{ price, description, ... }`

## 5. **Delete Car**
- **Опис**: Видаляє автомобіль за його ID.
- **Запит**: `DELETE http://localhost:3000/cars/{id}`

## 6. **Create Car Listing**
- **Опис**: Створює нове оголошення про автомобіль для продажу.
- **Запит**: `POST http://localhost:3000/cars/create`
- **Приклад**: З body `{ userId, price, currency, region, description }`

## 7. **Edit Car Listing**
- **Опис**: Оновлює оголошення про автомобіль.
- **Запит**: `PUT http://localhost:3000/cars/edit`
- **Приклад**: З body `{ carId, newPrice, newCurrency, newDescription }`

## 8. **Get Users**
- **Опис**: Повертає всіх користувачів.
- **Запит**: `GET http://localhost:3000/users`

## 9. **Get User by ID**
- **Опис**: Повертає інформацію про користувача за його ID.
- **Запит**: `GET http://localhost:3000/users/{id}`

## 10. **Create User**
- **Опис**: Створює нового користувача.
- **Запит**: `POST http://localhost:3000/users`
- **Приклад**: З body `{ name, email, password, ... }`

## 11. **Update User**
- **Опис**: Оновлює інформацію про користувача.
- **Запит**: `PUT http://localhost:3000/users/{id}`
- **Приклад**: З body `{ name, email, password, ... }`

## 12. **Delete User**
- **Опис**: Видаляє користувача за його ID.
- **Запит**: `DELETE http://localhost:3000/users/{id}`

## 13. **Ban User**
- **Опис**: Забороняє користувача за його ID.
- **Запит**: `POST http://localhost:3000/manager/ban/{userId}`

## 14. **Delete Invalid Ad**
- **Опис**: Видаляє недійсне оголошення за його ID.
- **Запит**: `DELETE http://localhost:3000/manager/delete-ad/{carId}`

## 15. **Increment View Count**
- **Опис**: Інкрементує кількість переглядів для оголошення.
- **Запит**: `GET http://localhost:3000/advertising-view/{id}/view`

## 16. **Get Car Statistics**
- **Опис**: Повертає статистику переглядів для оголошення.
- **Запит**: `GET http://localhost:3000/advertising-view/{id}/statistics`
