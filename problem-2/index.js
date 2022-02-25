const express = require("express");

const app = express();

const list = ["bonf", "cardio", "case", "character", "bonsai"];

// finding prefix
const findPrefix = (str) => {
    let ans = [];
    for (let i = 0; i < list.length; i++) {
        word = list[i];
        console.log(word);
        (j1 = 0), (j2 = word.length - 1);
        while (j1 < j2) {
            if (str[j1] !== word[j1] && str[j2] !== word[j2]) {
                ans = [false, -1];
                return ans;
            }
            j1++;
            j2--;
        }
        ans = [true, i];
        return ans;
    }
};

app.get("/prefixes", async (req, res) => {
    let { keywords } = req.query;
    let data = [];

    keywords = keywords.split(",");

    for (key of keywords) {
        let [bool, idx] = findPrefix(key);

        if (bool) {
            const obj = {
                keyword: key,
                status: "found",
                prefix: list[idx],
            };
            data.push(obj);
        } else {
            const obj = {
                keyword: key,
                status: "not_found",
                prefix: "not_applicable",
            };
            data.push(obj);
        }
    }

    res.status(200).send({ numbers: data });
});

app.listen(5000, () => {
    console.log("server is running");
});
