// finding prefix

const findPrefix = (str, list) => {
    for (i; i < list.length; i++) {
        word = list[i];

        (j1 = 0), (j2 = word.length - 1);
        while (j1 < j2) {
            if (str[j1] != str[j2]) return false;
            j1++;
            j2--;
        }
        return true;
    }
};
