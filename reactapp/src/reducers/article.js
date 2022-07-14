export default function (wishList = [], action) {
    if (action.type == "addArticle") {
        var wishListCopy = [...wishList];

// PREVENT DOUBLES
        var findArticle = false;
        for (let i = 0; i < wishListCopy.length; i++) {
        if (wishListCopy[i].title == action.likedArticle.title) {
            findArticle = true;
        }
    }

// PUSH LIKED ARTICLE
    if (!findArticle) {
        wishListCopy.push(action.likedArticle);
    }
    return wishListCopy;
    } else if (action.type == "deleteArticle") {
    let filteredWishList = wishList.filter(
        (el) => el.title != action.articleToDelete
    );
    return filteredWishList;
    } else {
    return wishList;
    }
}
