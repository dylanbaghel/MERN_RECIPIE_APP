export const getFilteredRecipies = (recipies, { text }) => {
    return recipies.filter((recipie) => {
        const isNameMatch = recipie.name.toLowerCase().includes(text.toLowerCase());
        return isNameMatch;
    });
};