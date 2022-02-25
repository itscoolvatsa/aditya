const express = require("express");
const fetch = require("node-fetch");
const timeout = require("connect-timeout");

const app = express();

const removeDuplicates = (arr) => {
    const n = arr.length;

    if (n == 0 || n == 1) return n;

    let j = 0;

    for (i = 0; i < n - 1; i++) if (arr[i] != arr[i + 1]) arr[j++] = arr[i];

    arr[j++] = arr[n - 1];

    return j;
};

const mergeSort = (arr, start, end) => {
    if (start < end) {
        mid = start + (end - start) / 2;
        mergeSort(arr, start, mid);
        mergeSort(arr, mid + 1, end);
        merge(arr, start, mid, end);
    }
};

const merge = (arr, start, mid, end) => {
    n1 = mid - start + 1;
    n2 = end - mid;

    arr1[n1], arr2[n2];

    for (i = 0; i < n1; i++) {
        arr1[i] = arr[i + start];
    }

    for (i = 0; i < n2; i++) {
        arr2[i] = arr[i + mid + 1];
    }

    (i = 0), (j = 0), (k = start);

    while (i < n1 && j < n2) {
        if (arr1[i] <= arr2[j]) {
            arr[k] = arr1[i];
            i++;
            k++;
        } else {
            arr[k] = arr2[j];
            j++;
            k++;
        }
    }
    while (i < n1) {
        arr[k] = arr1[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = arr2[j];
        j++;
        k++;
    }
};

const get_request = async (url) => {
    const res = await fetch(url);
    const { numbers } = await res.json(); //assuming data is json
    return numbers;
};

app.get("/numbers", timeout("5s"), async (req, res) => {
    const { url } = req.query;
    let data = [];

    for (link of url) {
        const num = await get_request(link);
        data = await [...data, ...num];
    }

    data = data.filter((item, pos) => {
        return data.indexOf(item) == pos;
    });
    data.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
    console.log(data);

    res.status(200).send({ numbers: data });
});

app.listen(5000, () => {
    console.log("server is running");
});
