Documentation для чайников)))

Frontend

Первая задача когда user нажимает на кнопки филтра потом нажимает кнопку фильтр 
отпровляетсья JSON object в "http://localhost:1000/filters"

For example:

{
    "user_id": "112367139919174836283",
    "taste": ["Сладкий", "Фруктовый"],
    "format": ["Шорт", "Лонг"],
    "difficult": ["Средняя сложность"],
    "strength": ["Безалкогольный", "Слабоалкогольный"]
}

User_id пока что "something" отправьте ато там backend register и login проблемы вышли у Afruza

Все даные должны быть в Array (user_id исключения)

Потом делаетсья get из "http://localhost:1000/filters"

Потом эти даные мы делаем filter из "http://localhost:1000/filters" и  map!!!

Конец? (**)
        \_/
        /()\ Congratulation)
        /|\