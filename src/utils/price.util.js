export const calculateTotalPrice = (products) => {
    const amount = products.reduce((acc, product) => {
        const productTotal = (product.price / 100) * product.cartCount; // Рассчитываем общую стоимость для товара
        return acc + productTotal; // Суммируем со следующим
      }, 0); // Начальное значение аккумулятора - 0
      return amount; // Возвращаем сумму
}