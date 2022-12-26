export const dateFormatter = new Intl.DateTimeFormat('pt-BR');

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export const revertPriceFormatter = (price) => {
    var priceFloat = 0;
    if (typeof price === "number" || price === null) {
        priceFloat = parseFloat(price);
    } else {
        priceFloat = parseFloat(price.replace('.', '').replace('R$', '').replace(",", ".").replace(' ', ''));
    }
    return priceFloat;
}