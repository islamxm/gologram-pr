const translateType = (item) => {
    switch (item) {
        case 'simple_user':
            return 'Пользователь'
        case 'blogger':
            return 'Блогер'
        case 'self_employed':
            return 'Самозанятый'
        case 'individual_entrepreneurship':
            return 'ИП'
        case 'startapp':
            return 'Стартап'
        case 'small_business':
            return 'Малый бизнес'
        case 'medium_business':
            return 'Средний бизнес'
        case 'large_business':
            return 'Крупный бизнес'
        default:
            return 'нет перевода'
    }
}

export default translateType;